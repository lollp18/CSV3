import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "../app.vue"
import {
  type StateTree,
  type _GettersTree,
  type DefineStoreOptions,
  type StoreDefinition,
} from "pinia"

export function InitStore() {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
}
export function DefineGlobalStore<
  Id extends string,
  S extends StateTree = {},
  G extends _GettersTree<S> = {},
  A = {}
>(
  id: Id,
  options: Omit<DefineStoreOptions<Id, S, G, A>, "id">
): StoreDefinition<Id, S, G, A> {
  const store = defineStore(id, options)
  InitStore()
  const storecreate = store()

  return storecreate
}
