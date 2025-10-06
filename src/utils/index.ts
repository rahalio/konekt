export function wait(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function fmt(n: number): string {
  return new Intl.NumberFormat().format(n);
}
