import type { PersonInfo, PersonSuggestResult } from "@equinor/fusion-wc-person";

export const mapToPersonInfo = (person: PersonSuggestResult): PersonInfo => {
  return {
    azureId: person.azureUniqueId,
    name: person.name,
    jobTitle: person.person?.jobTitle,
    department: person.person?.department,
    managerAzureUniqueId: person.person?.managerAzureUniqueId,
    upn: person.person?.upn,
    mobilePhone: person.person?.mobilePhone,
    accountType: person.person?.accountType,
    isExpired: person.isExpired,
    avatarUrl: person.avatarUrl,
    avatarColor: person.avatarColor,
    applicationId: person.application?.applicationId,
    applicationName: person.application?.applicationName,
    servicePrincipalType: person.application?.servicePrincipalType,
  };
};
