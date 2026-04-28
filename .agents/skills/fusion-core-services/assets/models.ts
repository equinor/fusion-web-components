/**
 * Fusion Core Services model asset index.
 *
 * Read the service-specific model files in this directory for concrete TypeScript shapes.
 * This file exists to give the consolidated skill a single stable model entry point.
 */

export const fusionCoreServicesModelAssets = {
  apps: "assets/fusion-apps-models.ts",
  bookmarks: "assets/fusion-bookmarks-models.ts",
  context: "assets/fusion-context-models.ts",
  contractPersonnel: "assets/fusion-contract-personnel-models.ts",
  mail: "assets/fusion-mail-models.ts",
  notification: "assets/fusion-notification-models.ts",
  people: "assets/fusion-people-models.ts",
  portalConfig: "assets/fusion-portal-config-models.ts",
  reports: "assets/fusion-reports-models.ts",
  rolesV2: "assets/fusion-roles-v2-models.ts",
  serviceMessages: "assets/fusion-service-messages-models.ts",
  tasks: "assets/fusion-tasks-models.ts",
} as const;

export type FusionCoreServiceName = keyof typeof fusionCoreServicesModelAssets;