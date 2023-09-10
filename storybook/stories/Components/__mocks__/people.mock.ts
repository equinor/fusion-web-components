import { PersonAccountType, PersonResolver } from '@equinor/fusion-wc-person';

const fakeResponseTime = () => new Promise((res) => setTimeout(res, 1000));

export const mockPersonResolver: PersonResolver = {
  getDetails: ({ azureId, upn }) =>
    fakeResponseTime().then(() => ({
      azureId: azureId!,
      upn,
      name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
      pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
      accountType: PersonAccountType.Consultant,
      jobTitle: 'X-Bouvet ASA (PX)',
      department: 'FOIT CON PDP',
      mail: 'example@email.com',
      officeLocation: 'Stavanger',
      mobilePhone: '+47 999999999',
      manager: {
        azureUniqueId: '1234-1324-1235',
        name: 'Lagertha Kristensen',
        department: 'Leader Techn Mgmt',
        pictureSrc: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/814.jpg',
        accountType: PersonAccountType.Employee,
      },
      positions: [
        {
          id: '123-123',
          name: 'Developer Frontend',
          project: {
            id: '1234-1234',
            name: 'Fusion',
          },
        },
        {
          id: '234-234',
          name: 'Developer Frontend',
          project: {
            id: '2345-2345',
            name: 'Fusion org v2',
          },
        },
      ],
    })),
  getInfo: (args) =>
    fakeResponseTime().then(() => ({
      azureId: args.azureId!,
      name: 'Albert Einstein',
      accountType: PersonAccountType.Employee,
    })),
  getPhoto: () => fakeResponseTime().then(() => 'https://i.imgur.com/GcZeeXX.jpeg'),
  search: (args) => {
    // TODO @eikeland
    throw Error('not implemented');
  }
};
