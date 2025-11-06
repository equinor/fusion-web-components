import { PersonAccountType, PersonDetails, PersonSuggestResult } from '@equinor/fusion-wc-person';
import { PersonProviderElement, type PersonResolver } from '@equinor/fusion-wc-person';
import { cy, faker } from '@faker-js/faker';
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

const avatarSvg = async (avatarColor: string, name: string, accountType: string) => {
  const hasImage = faker.datatype.boolean({ probability: 0.8 });

  if (!hasImage || accountType === 'SystemAccount') {
    const nameArray = name.split(' ').map(x => x.substring(0, 1).toUpperCase());
    const initial = `${nameArray.shift()}${nameArray.pop()}`;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="32" fill="${avatarColor}"/>
        <circle cx="32" cy="32" r="28" fill="#fff"/>
        <text x="33" y="35" font-family="Equinor, sans-serif" font-size="26" font-weight="400" fill="#000" text-anchor="middle" dominant-baseline="central">${initial}</text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  const imageUrl = faker.image.personPortrait({ size: 64 });
  const image = await fetch(imageUrl);
  const imageBlob = await image.blob();

  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onloadend = () => {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
          <defs>
            <pattern id="avatarPattern" patternUnits="userSpaceOnUse" width="64" height="64" >
              <image href="${reader.result}" width="64" height="64" preserveAspectRatio = "xMidYMid slice" />
            </pattern>
          </defs>
          <circle cx="32" cy="32" r="32" fill="${avatarColor}"/>
          <circle cx="32" cy="32" r="28" fill="url(#avatarPattern)" />
        </svg>
      `;
      const finalDataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
      resolve(finalDataUrl);
    };
  });
};

export const generatePerson = async (args: { azureId?: string; upn?: string; accountType?: string }): Promise<PersonDetails> => {
  args.azureId && faker.seed(uuid2number(args.azureId));
  const azureId = args.azureId ?? faker.string.uuid();
  const fakeUpn = faker.internet.email({ provider: 'equinor.com' });
  const avatarColor = faker.helpers.arrayElement(['#bebebe', '#eb0037', '#ff92a8', '#000']);
  const name = faker.person.fullName();
    
  const application: PersonSuggestResult['application'] = {};
  if (args.accountType === 'SystemAccount') {
    application.applicationId = faker.string.uuid();
    application.applicationName = faker.company.name();
    application.servicePrincipalType = faker.helpers.arrayElement([
      'Application',
      'ManagedIdentity',
      'ServicePrincipal',
      'Unknown',
    ]);
  }

  const avatarUrl = await avatarSvg(avatarColor, args.accountType === 'SystemAccount' ? application.applicationName ?? name : name, args.accountType ?? '');
  
  return {
    azureId,
    upn: args.upn ?? fakeUpn,
    name,
    accountType: faker.helpers.arrayElement([
      PersonAccountType.Consultant,
      PersonAccountType.Employee,
      PersonAccountType.Enterprise,
      PersonAccountType.External,
      PersonAccountType.ExternalHire,
    ]),
    accountClassification: faker.helpers.arrayElement(['Internal', 'External']),
    jobTitle: faker.person.jobTitle(),
    department: faker.commerce.department().toUpperCase(),
    mail: fakeUpn,
    mobilePhone: faker.phone.number({ style: 'international' }),
    isExpired: faker.datatype.boolean({ probability: 0.1 }),
    officeLocation: faker.location.city(),
    employeeNumber: faker.string.numeric(6),
    avatarColor,
    avatarUrl,
    get positions() {
      return generatePositions(azureId);
    },
    get manager() {
      return generateManager(azureId);
    },
    ...application,
  };
};

const generateSuggestedPerson = async (args: { azureId: string }): Promise<PersonSuggestResult> => {
  const accountType = faker.helpers.arrayElement([
    'Person',
    'SystemAccount',
  ]);
  const generatedPerson = await generatePerson({ azureId: args.azureId, accountType });

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
      mail: generatedPerson.mail,
      mobilePhone: generatedPerson.mobilePhone,
      managerAzureUniqueId: generatedPerson.manager?.azureUniqueId,
      employeeNumber: generatedPerson.employeeNumber,
    }
  } else if (accountType === 'SystemAccount') {
    application = {
      applicationId: generatedPerson.applicationId,
      applicationName: generatedPerson.applicationName,
      servicePrincipalType: generatedPerson.servicePrincipalType,
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
  getDetails: async (args) => await generatePerson(args),
  getInfo: async (args) => await generatePerson(args),
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
  search: async (args) => {
    return await Promise.all(new Array(faker.number.int({ min: 3, max: 10 })).fill(undefined).map(async (_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i,
      );
      return await generatePerson({ azureId: faker.string.uuid() });
    }));
  },
  suggest: async (args) => {
    const generatedCount = faker.number.int({ min: 3, max: 25 });
    const value = await Promise.all(new Array(generatedCount).fill(undefined).map(async (_, i) => {
      faker.seed(
        args.search
          .split('')
          .map((x) => x.charCodeAt(0))
          .reduce((acc, item) => (acc += item), 0) + i,
      );
      return await generateSuggestedPerson({ azureId: faker.string.uuid() });
    }));
    return {
      totalCount: generatedCount * 3,
      count: generatedCount,
      value,
    };
  },
  resolve: async (args) => {
    return await Promise.all(args.resolveIds.map(async (azureId) => {
      const success = faker.datatype.boolean({ probability: 0.9 });
      const statusCode = success ? 200 : faker.helpers.arrayElement([400, 404]);
      return {
        success,
        statusCode,
        errorMessage: success ? null : `Could not resolve profile with identifier: ${azureId}`,
        identifier: azureId,
        account: success ? await generateSuggestedPerson({ azureId }) : null,
      };
    }));
  },
};

export const personProviderDecorator = (story: CallableFunction) => {
  return html`<fwc-person-provider .resolver=${resolver}>${story()}</fwc-person-provider>`;
};
