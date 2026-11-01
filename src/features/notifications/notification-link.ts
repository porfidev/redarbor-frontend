function jobLink(id: string): string {
  return `occ://vacante/${encodeURIComponent(id)}`;
}

function jobIdFromLink(link: string): string | undefined {
  try {
    const url = new URL(link);
    if (url.protocol !== 'occ:' || url.hostname !== 'vacante') return;
    const segments = url.pathname.split('/').filter(Boolean);
    if (segments.length !== 1) return;
    const id = decodeURIComponent(segments[0]);
    return id.trim() ? id : undefined;
  } catch {
    return undefined;
  }
}

export { jobLink, jobIdFromLink };
