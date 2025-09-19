type GtagArgs = [string, ...unknown[]];

export function loadAnalytics(gaId?: string) {
  if (typeof window === 'undefined' || !gaId) return;
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: GtagArgs) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', gaId, { anonymize_ip: true });
}

declare global {
  interface Window {
    dataLayer: GtagArgs[];
  }
}
