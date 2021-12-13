/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_SPACE: string;
  readonly VITE_CONTENTFUL_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}