export function formatNumber(value, maxFractionDigits = 0) {
  const numeric = Number(value || 0);
  if (!Number.isFinite(numeric)) return '0';
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: maxFractionDigits }).format(
    numeric
  );
}

export function formatCompact(value, maxFractionDigits = 0) {
  const numeric = Number(value || 0);
  const abs = Math.abs(numeric);
  if (!Number.isFinite(numeric)) return '0';
  if (abs >= 1e12) return `${formatNumber(numeric / 1e12, maxFractionDigits)} Bn`;
  if (abs >= 1e9) return `${formatNumber(numeric / 1e9, maxFractionDigits)} Md`;
  if (abs >= 1e6) return `${formatNumber(numeric / 1e6, maxFractionDigits)} M`;
  if (abs >= 1e3) return `${formatNumber(numeric / 1e3, maxFractionDigits)} K`;
  return formatNumber(numeric, maxFractionDigits);
}

export function formatDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}

export function formatDurationHms(seconds) {
  const total = Number(seconds);
  if (!Number.isFinite(total) || total < 0) return 'N/A';
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = Math.floor(total % 60);
  const parts = [];
  if (days > 0) parts.push(`${days}j`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  return parts.join(' ');
}

export function formatDurationHoursMinutes(totalSeconds) {
  const total = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return `${minutes}m`;
}
