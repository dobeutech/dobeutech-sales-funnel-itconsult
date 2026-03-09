import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

let initialized = false;

export function initDatadog() {
  if (initialized || typeof window === "undefined") return;

  const clientToken = process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN;
  const applicationId = process.env.NEXT_PUBLIC_DD_APPLICATION_ID;
  const site = process.env.NEXT_PUBLIC_DD_SITE || "datadoghq.com";
  const service =
    process.env.NEXT_PUBLIC_DD_SERVICE || "dobeutech-sales-funnel";
  const env = process.env.NEXT_PUBLIC_DD_ENV || "development";
  const version = process.env.NEXT_PUBLIC_DD_VERSION || "0.1.0";

  if (!clientToken) return;

  if (applicationId) {
    datadogRum.init({
      applicationId,
      clientToken,
      site,
      service,
      env,
      version,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    });
  }

  datadogLogs.init({
    clientToken,
    site,
    service,
    env,
    forwardErrorsToLogs: true,
    forwardConsoleLogs: ["error", "warn"],
    sessionSampleRate: 100,
  });

  initialized = true;
}
