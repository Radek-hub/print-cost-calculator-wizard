const MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID ?? "G-2ZW6QNFZMC";
const ANALYTICS_DEBUG = import.meta.env.VITE_ANALYTICS_DEBUG === "true";

function debugLog(message: string, details?: unknown): void {
  if (!ANALYTICS_DEBUG) return;
  if (details !== undefined) {
    console.info(`[analytics-debug] ${message}`, details);
    return;
  }
  console.info(`[analytics-debug] ${message}`);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initAnalytics(): void {
  if (typeof window === "undefined") return;

  debugLog("init start", { measurementId: MEASUREMENT_ID });

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    debugLog("gtag call", args);
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());

  const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${scriptSrc}"]`,
  );

  if (!existingScript) {
    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    script.addEventListener("load", () => {
      debugLog("gtag script loaded");
    });
    script.addEventListener("error", () => {
      debugLog("gtag script failed to load", { scriptSrc });
    });
    document.head.appendChild(script);
    debugLog("gtag script injected", { scriptSrc });
  } else {
    debugLog("gtag script already present");
  }

  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: true,
  });
  debugLog("config sent", { send_page_view: true });
}
