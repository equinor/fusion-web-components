import type { PersonInfo, PersonSuggestResult } from '@equinor/fusion-wc-person';

export const mapToPersonInfo = (account: PersonSuggestResult): PersonInfo => {
  return {
    azureId: account.azureUniqueId,
    name: account.name,
    jobTitle: account.person?.jobTitle ?? account.accountLabel,
    department: account.person?.department,
    managerAzureUniqueId: account.person?.managerAzureUniqueId,
    upn: account.person?.upn,
    mail: account.person?.mail,
    mobilePhone: account.person?.mobilePhone,
    accountType: account.person?.accountType ?? account.application?.servicePrincipalType ?? account.accountType,
    accountLabel: account.accountLabel,
    isExpired: account.isExpired,
    avatarUrl: account.avatarUrl,
    avatarColor: account.avatarColor,
    applicationId: account.application?.applicationId,
    applicationName: account.application?.applicationName,
    servicePrincipalType: account.application?.servicePrincipalType,
    employeeNumber: account.person?.employeeNumber,
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
