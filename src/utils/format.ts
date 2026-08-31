/**
 * Formatting helpers used across the hub.
 */

/** 125 -> "2:05", 45 -> "0:45", 754 -> "12:34" */
export function formatDuration(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

/** Human "edited X ago" style stamps. */
export function formatRelativeTime(
  timestamp: number,
  now: number = Date.now(),
): string {
  const diff = Math.max(0, now - timestamp);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return 'just now';
  }
  if (diff < hour) {
    const m = Math.floor(diff / minute);
    return `${m}m ago`;
  }
  if (diff < day) {
    const h = Math.floor(diff / hour);
    return `${h}h ago`;
  }
  if (diff < 7 * day) {
    const d = Math.floor(diff / day);
    return `${d}d ago`;
  }
  const d = new Date(timestamp);
  const month = d.toLocaleString('en-US', {month: 'short'});
  const dayOfMonth = d.getDate();
  return `${month} ${dayOfMonth}`;
}

/** "Untitled video", "Untitled video 2", ... — first name not colliding. */
export function untitledName(base: string, existingNames: Set<string>): string {
  if (!existingNames.has(base)) {
    return base;
  }
  let n = 2;
  while (existingNames.has(`${base} ${n}`)) {
    n++;
  }
  return `${base} ${n}`;
}
