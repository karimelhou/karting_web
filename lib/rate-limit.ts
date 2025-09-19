const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

const store = new Map<string, { count: number; start: number }>();

export function rateLimit(identifier: string) {
  const now = Date.now();
  const entry = store.get(identifier);
  if (!entry) {
    store.set(identifier, { count: 1, start: now });
    return { success: true };
  }

  if (now - entry.start > WINDOW_MS) {
    store.set(identifier, { count: 1, start: now });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false };
  }

  entry.count += 1;
  store.set(identifier, entry);
  return { success: true };
}
