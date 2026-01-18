declare module "*.mp3" {
  const src: string;
  export default src;
}

declare module 'firebase/auth' {
  import type { Persistence } from 'firebase/auth';

  export function getReactNativePersistence(storage: any): Persistence;
}
