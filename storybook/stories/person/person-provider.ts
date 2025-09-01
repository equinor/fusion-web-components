import { PersonAccountType, PersonDetails } from '@equinor/fusion-wc-person';
import PersonProvider, { PersonResolver } from '@equinor/fusion-wc-person/provider';
import { faker } from '@faker-js/faker';
import { html } from 'lit';

PersonProvider;

faker.seed(123);

const uuid2number = (x: string) => {
  return Number(x.replace(/[-]|[a-z]/g, '').substring(0, 15));
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

const generatePerson = (args: { azureId?: string; upn?: string }): PersonDetails => {
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
    department: faker.commerce.department(),
    mail: fakeUpn,
    mobilePhone: faker.phone.number(),
    officeLocation: faker.location.city(),
    get positions() {
      return generatePositions(this.azureId);
    },
    get manager() {
      return generateManager(this.azureId);
    },
  };
};

const resolver: PersonResolver = {
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
      return generatePerson({ azureId: String(faker.string.uuid()) });
    });
  },
};

export const personProviderDecorator = (story) => {
  return html`<fwc-person-provider .resolver=${resolver}>${story()}</fwc-person-provider>`;
};
