import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Deletes images older than maxAgeMs, except those a stored story still points to. Age alone isn't enough: when the
// daily run fails for a week, the active story keeps an old image, and deleting it would break the page.
export async function cleanupImages(dir: string, imageUrls: string[], now = Date.now(), maxAgeMs = WEEK_MS) {
  const inUse = new Set(imageUrls.map((url) => path.posix.basename(new URL(url, 'https://x/').pathname)));
  const deleted: string[] = [];
  for (const name of await readdir(dir)) {
    if (inUse.has(name)) continue;
    const file = path.join(dir, name);
    const info = await stat(file);
    if (!info.isFile() || now - info.mtimeMs < maxAgeMs) continue;
    await unlink(file);
    deleted.push(name);
  }
  return deleted;
}
