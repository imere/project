// https://web.dev/vitals/
export const vitalsScoreMap: Record<string, number[]> = {
  fp: [1000, 2500],
  fcp: [1000, 2500],
  lcp: [2500, 4000],
  fid: [100, 300],
  cls: [0.1, 0.25],
  tbt: [300, 600],
  tbt5s: [300, 600],
  tbt10s: [300, 600],
};

export function getVitalScore(vital: string, val: number): string {
  const threshold = vitalsScoreMap[vital];

  if (!threshold) return 'unknown';

  return (
    val < threshold[0]
      ? 'good'
      : (
        val > threshold[1]
          ? 'poor'
          : 'needs improvement'
      )
  );
}

export const vitalsScore: Record<string, string> = Object.create(null);
