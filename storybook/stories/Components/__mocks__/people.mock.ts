import {
  PersonAccountType,
  PersonDetails,
  PersonInfo,
  PersonResolver,
  PersonSearchResult,
} from '@equinor/fusion-wc-person';

const fakeResponseTime = (delay = 3000) => new Promise((res) => setTimeout(res, delay));

const users = [
  {
    azureId: '1234',
    upn: 'example@email.com',
    name: 'Anders Emil Sommerfeldt (Bouvet ASA)',
    pictureSrc: 'https://i.imgur.com/GcZeeXX.jpeg',
    accountType: PersonAccountType.Consultant,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'example@email.com',
    officeLocation: 'Stavanger',
    mobilePhone: '+47 555 55 555',
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
  },
  {
    azureId: '49132c24-6ea4-41fe-8221-112f314573f0',
    name: 'Albert Einstein (Bouvet ASA)',
    pictureSrc: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025',
    accountType: PersonAccountType.Employee,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'abby@sience.com',
    officeLocation: 'Stavanger',
    mobilePhone: '+47 555 55 555',
    managerAzureUniqueId: '1234-1324-1235',
    manager: {
      azureUniqueId: '1234-1324-1235',
      name: 'Lagertha Lothbrok',
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
  },
  {
    azureId: '49132c24-6ea4-41fe-8221-112f314573fe',
    name: 'Tux Pingvin (Bouvet ASA)',
    pictureSrc: 'https://149366088.v2.pressablecdn.com/wp-content/uploads/2016/10/other-linux-logo.png',
    accountType: PersonAccountType.Employee,
    jobTitle: 'X-Bouvet ASA (PX)',
    department: 'FOIT CON PDP',
    mail: 'tux@linux.dev',
    officeLocation: 'Cloud',
    mobilePhone: '+47 555 55 555',
    managerAzureUniqueId: '1234-1324-1235',
    manager: {
      azureUniqueId: '1234-1324-1235',
      name: 'Lagertha Lothbrok',
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
  },
];

const getUsers = (args: {
  azureId?: string;
  upn?: string;
  search?: string;
  random?: boolean;
}): PersonDetails | PersonInfo | PersonSearchResult | void => {
  if (args.azureId) {
    return users.find((u) => u.azureId === args.azureId) as PersonDetails;
  } else if (args.upn) {
    return users.find((u) => u.upn === args.upn) as PersonDetails;
  } else if (args.search !== undefined) {
    const { search } = args;
    return users.filter(
      (u) =>
        u.name.toLocaleLowerCase().indexOf(search) > -1 ||
        u.mail.toLocaleLowerCase().indexOf(search) > -1 ||
        u.mobilePhone.toLocaleLowerCase().indexOf(search) > -1,
    ) as PersonSearchResult;
  } else if (args.random) {
    return users[Math.floor(Math.random() * users.length)];
  }
};

// PS: just for test in this mockresolver, not for use in prod
type PersonPicture = PersonDetails & { pictureSrc: string };

export const mockPersonResolver: PersonResolver = {
  getDetails: (args) => fakeResponseTime().then(() => getUsers(args) as PersonDetails),
  getInfo: (args) => fakeResponseTime().then(() => getUsers(args) as PersonInfo),
  getPhoto: (args) =>
    fakeResponseTime().then(() => {
      return (getUsers(args) as unknown as PersonPicture).pictureSrc;
    }),
  search: (args) => fakeResponseTime(1000).then(() => getUsers(args) as PersonSearchResult),
};
