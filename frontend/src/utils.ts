export function pickRandomAndReplenish<T>(arr: T[]) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
