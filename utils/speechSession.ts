// src/speechSession.ts
let hasSpoken = false;

export function getHasSpoken() {
  return hasSpoken;
}

export function setHasSpoken(val: boolean) {
  hasSpoken = val;
}
