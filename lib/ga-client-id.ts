export function getGAClientId(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");

    if (name === "_ga") {
      const parts = value.split(".");
      if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
      }
    }
  }

  return null;
}
