import type { PersonInfo, PersonSuggestResult } from "@equinor/fusion-wc-person";

export const mapToPersonInfo = (person: PersonSuggestResult): PersonInfo => {
  return {
    azureId: person.azureUniqueId,
    name: person.name,
    jobTitle: person.person?.jobTitle,
    department: person.person?.department,
    managerAzureUniqueId: person.person?.managerAzureUniqueId,
    upn: person.person?.upn,
    mail: person.person?.mail,
    mobilePhone: person.person?.mobilePhone,
    accountType: person.person?.accountType ? person.person.accountType : person.application?.applicationId ? 'Application' : 'Unknown',
    isExpired: person.isExpired,
    avatarUrl: person.avatarUrl,
    avatarColor: person.avatarColor,
    applicationId: person.application?.applicationId,
    applicationName: person.application?.applicationName,
    servicePrincipalType: person.application?.servicePrincipalType,
    employeeNumber: person.person?.employeeNumber,
  };
};

export const ucFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const resolveFailedAvatarUrl = (avatarColor: string = '#eb0037') => {
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <style>
        @font-face {
            font-family: Equinor;
            src: url(//cdn.eds.equinor.com/font/Equinor-Regular.woff2) format('woff2'),
                url(//cdn.eds.equinor.com/font/Equinor-Regular.woff) format('woff');
            font-style: normal;
            font-weight: 400;
        }

        text {
          font-family: "Equinor", sans-serif;
          font-size: 36px;
          font-weight: 700;
        }
      </style>
      <circle cx="32" cy="32" r="32" fill="${avatarColor}"/>
      <circle cx="32" cy="32" r="29" fill="#fff"/>
      <text x="32" y="33" fill="${avatarColor}" text-anchor="middle" dominant-baseline="central">!</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};
