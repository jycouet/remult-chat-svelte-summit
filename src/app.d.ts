// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

declare module "remult" {
  export interface UserInfo {
    id: string;
    name: string;
    avatar_url?: string;
  }
}

export {};
