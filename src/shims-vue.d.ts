declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  import './plugins/contentful'

  const component: DefineComponent<{}, {}>
  export default component
}
