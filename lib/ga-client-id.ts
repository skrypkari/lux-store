/**
 * Extract Google Analytics client_id from _ga cookie
 * Cookie format: GA1.2.1234567890.1234567890
 * We need: 1234567890.1234567890 (the last two parts)
 */
export function getGAClientId(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    
    if (name === '_ga') {
      // Format: GA1.2.1234567890.1234567890
      // Split by dots and take last two parts
      const parts = value.split('.');
      if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
      }
    }
  }
  
  return null;
}
