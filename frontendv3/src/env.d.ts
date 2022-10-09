/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

declare module "*.vue" {
  import type { ComponentOptions, ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "*.md" {
  const Component: ComponentOptions;
  export default Component;
}
