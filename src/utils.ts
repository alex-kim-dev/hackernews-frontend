const relTimeUnits = new Map<Intl.RelativeTimeFormatUnitSingular, number>([
  ['month', 60 * 60 * 24 * 7 * 30],
  ['week', 60 * 60 * 24 * 7],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
]);

/**
 * @arg time unix time, seconds
 * @return relative time with appropriate units
 */
export const relTimeFormat = (time: number): string => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = Math.floor((time * 1000 - Date.now()) / 1000);

  for (const [unit, div] of relTimeUnits) {
    const int = Math.trunc(diff / div);
    if (int >= 1 || int <= -1)
      return rtf.format(int, unit).replaceAll(' ', '\xa0');
  }

  return 'less\xa0than a\xa0minute\xa0ago';
};
