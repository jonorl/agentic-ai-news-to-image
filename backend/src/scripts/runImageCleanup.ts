import { db } from '../db/queries.js';
import { IMAGES_DIR } from '../routes/images.js';
import { cleanupImages } from './cleanupImages.js';

// Run weekly by cron on the VPS: docker exec <container> node dist/scripts/runImageCleanup.js
try {
  const deleted = await cleanupImages(IMAGES_DIR, await db.getImageUrls());
  console.log(`${new Date().toISOString()} deleted ${deleted.length} image(s)${deleted.length ? ': ' + deleted.join(', ') : ''}`);
} catch (error) {
  console.error(`${new Date().toISOString()} image cleanup failed:`, error);
  process.exitCode = 1;
} finally {
  await db.disconnect();
}
