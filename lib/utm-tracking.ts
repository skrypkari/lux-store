export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    return {
      utm_source: localStorage.getItem('utm_source') || undefined,
      utm_medium: localStorage.getItem('utm_medium') || undefined,
      utm_campaign: localStorage.getItem('utm_campaign') || undefined,
      utm_term: localStorage.getItem('utm_term') || undefined,
      utm_content: localStorage.getItem('utm_content') || undefined,
    };
  } catch (e) {
    console.error('Failed to get UTM params:', e);
    return {};
  }
}

