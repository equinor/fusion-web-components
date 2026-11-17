import type { PersonInfo, PersonResolveResult, PersonSuggestResult } from './types';

export const mapToPersonInfo = (account: PersonSuggestResult): PersonInfo => {
  return {
    azureId: account.azureUniqueId,
    name: account.name,
    jobTitle: account.person?.jobTitle || account.accountLabel,
    department: account.person?.department,
    managerAzureUniqueId: account.person?.managerAzureUniqueId,
    upn: account.person?.upn,
    mail: account.person?.mail,
    mobilePhone: account.person?.mobilePhone,
    accountType: account.application ? account.accountType : account.person?.accountType,
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

export const mapResolveToPersonInfo = (person: PersonResolveResult) => {
  if (person.success) {
    return mapToPersonInfo(person.account as PersonSuggestResult);
  }

  let name = person.errorMessage ?? 'Unknown error';

  if (person.statusCode === 404) {
    name = 'Person does not exist in Entra ID';
  } else if (person.statusCode === 400) {
    name = 'Not a valid guid';
  }

  return {
    azureId: person.identifier,
    name,
    jobTitle: person.identifier,
    accountLabel: person.identifier,
    isExpired: false, // set to not expired since we want to show the azureId for the failed person in the pill
    avatarUrl: resolveFailedAvatarUrl(),
    avatarColor: 'var(--eds-color-bg-danger-fill-muted-default)',
  };
};

/**
 * Resolves an EDS colour variable against the document, for contexts such as SVG data URLs
 * that can't read CSS custom properties.
 */
const resolveDocumentColor = (variable: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

export const resolveFailedAvatarUrl = (
  avatarColor = resolveDocumentColor('--eds-color-bg-danger-fill-emphasis-default'),
) => {
  const surfaceColor = resolveDocumentColor('--eds-color-bg-neutral-surface');
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
      <circle cx="32" cy="32" r="29" fill="${surfaceColor}"/>
      <text x="32" y="33" fill="${avatarColor}" text-anchor="middle" dominant-baseline="central">!</text>
    </svg>
  `;

  const url = `data:image/svg+xml;base64,${btoa(svgString)}`;
  failedAvatarUrls.add(url);
  return url;
};

/** URLs created by `resolveFailedAvatarUrl`, so avatars can render a theme-aware version instead. */
const failedAvatarUrls = new Set<string>();

/**
 * Whether the URL was created by `resolveFailedAvatarUrl`. `<fwc-person-avatar>` renders these inline
 * with EDS colour variables, so they follow colour scheme changes after the URL was generated.
 */
export const isFailedAvatarUrl = (url?: string): boolean => !!url && failedAvatarUrls.has(url);
