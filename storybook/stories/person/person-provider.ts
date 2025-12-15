import { PersonAccountType, PersonDetails, PersonSuggestResult } from '@equinor/fusion-wc-person';
import { PersonProviderElement, type PersonResolver } from '@equinor/fusion-wc-person';
import { faker } from '@faker-js/faker';
import { html } from 'lit';

PersonProviderElement;

faker.seed(123);

const uuid2number = (x: string) => {
  return Number(x.replace(/[-]|[a-z]/g, '').substring(0, 15));
};

export const generateIds = (min: number, max: number): string[] => {
  const count = faker.number.int({ min, max });
  return new Array(count).fill(undefined).map(() => faker.string.uuid());
};

const generateManager = (azureId?: string): PersonDetails['manager'] => {
  faker.seed(uuid2number(azureId ?? '0') + 1);
  return {
    azureUniqueId: faker.string.uuid(),
    name: faker.person.fullName(),
    department: faker.commerce.department(),
  };
};

const generatePositions = (azureId?: string): PersonDetails['positions'] => {
  return new Array(faker.number.int({ min: 1, max: 10 })).fill(undefined).map((_, i) => {
    faker.seed(Number(azureId) + 1 + i);
    return {
      id: faker.string.uuid(),
      name: faker.company.name(),
      project: {
        id: faker.string.uuid(),
        name: faker.company.name(),
      },
    };
  });
};

export const generatePerson = (args: { azureId?: string; upn?: string }): PersonDetails => {
  args.azureId && faker.seed(uuid2number(args.azureId));
  const fakeUpn = faker.internet.email({ provider: 'equinor.com' });
  return {
    azureId: args.azureId ?? faker.string.uuid(),
    upn: args.upn ?? fakeUpn,
    name: faker.person.fullName(),
    accountType: faker.helpers.arrayElement([
      PersonAccountType.Consultant,
      PersonAccountType.Employee,
      PersonAccountType.Enterprise,
      PersonAccountType.External,
    ]),
    accountClassification: faker.helpers.arrayElement(['Internal', 'External']),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department().toUpperCase(),
    mail: fakeUpn,
    mobilePhone: faker.phone.number(),
    isExpired: faker.datatype.boolean({ probability: 0.1 }),
    officeLocation: faker.location.city(),
    avatarColor: faker.color.rgb(),
    avatarUrl: faker.image.urlPicsumPhotos({ height: 64, width: 120, blur: 0, grayscale: false }),
    get positions() {
      return generatePositions(this.azureId);
    },
    get manager() {
      return generateManager(this.azureId);
    },
  };
};

const generateSuggestedPerson = (args: { azureId: string }): PersonSuggestResult => {
  const generatedPerson = generatePerson({ azureId: args.azureId });
  const accountType = faker.helpers.arrayElement([
    'Person',
    'SystemAccount',
  ]);

  let person: PersonSuggestResult['person'] | undefined;
  let application: PersonSuggestResult['application'] | undefined;
  if (accountType === 'Person') {
    person = {
      accountType: faker.helpers.arrayElement([
        'Employee',
        'Consultant',
        'Enterprise',
        'EnterpriseExternal',
        'External',
        'Local',
        'TemporaryEmployee',
      ]),
      jobTitle: generatedPerson.jobTitle,
      department: generatedPerson.department,
      upn: generatedPerson.upn,
      mobilePhone: generatedPerson.mobilePhone,
    }
  } else if (accountType === 'SystemAccount') {
    application = {
      applicationId: faker.string.uuid(),
      applicationName: faker.company.name(),
      servicePrincipalType: faker.helpers.arrayElement([
        'Application',
        'ManagedIdentity',
        'ServicePrincipal',
        'Unknown',
      ]),
    }
  }

  return {
    azureUniqueId: generatedPerson.azureId,
    name: generatedPerson.name,
    accountType,
    person,
    application,
    isExpired: generatedPerson.isExpired ?? false,
    avatarColor: generatedPerson.avatarColor ?? '',
    avatarUrl: generatedPerson.avatarUrl ?? '',
  };
};

export const resolver: PersonResolver = {
  getDetails: generatePerson,
  getInfo: generatePerson,
  getPhoto: (args: { azureId?: string; upn?: string }) => {
    args.azureId && faker.seed(uuid2number(args.azureId));
    const src = faker.image.urlPicsumPhotos({ height: 64, width: 120, blur: 0, grayscale: false });
    const failed = args.azureId === '30dd35ef-7196-4c58-974f-3c1abd732ce1';
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (failed) {
            reject(Error('person does not exists'));
          }
          return resolve(src);
        },
        faker.number.int({ min: 20, max: 1000 }),
      );
    });
  },
  search: (args) => {
    return new Array(faker.number.int({ min: 3, max: 10 })).fill(undefined).map((_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i,
      );
      return generatePerson({ azureId: faker.string.uuid() });
    });
  },
  suggest: (args) => {
    const generatedCount = faker.number.int({ min: 3, max: 25 });
    const value = new Array(generatedCount).fill(undefined).map((_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i,
      );
      return generateSuggestedPerson({ azureId: faker.string.uuid() });
    });
    return {
      totalCount: generatedCount * 3,
      count: generatedCount,
      value,
    };
  },
  resolve: (args) => {
    return args.azureIds.map((azureId) => {
      return {
        success: true,
        statusCode: 200,
        errorMessage: null,
        indentifier: azureId,
        account: generateSuggestedPerson({ azureId }),
      };
    });
  },
};

export const personProviderDecorator = (story: CallableFunction) => {
  return html`<fwc-person-provider .resolver=${resolver}>${story()}</fwc-person-provider>`;
};
