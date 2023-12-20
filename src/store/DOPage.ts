import { PageStore } from './page.store'
import { IPage } from '../interface/page.interface'
import { action, makeObservable } from 'mobx'
import { assignIf } from './store.utils'

export class DOPage {
  store: PageStore

  title: string = 'Empty Page'

  constructor(store: PageStore, data: Partial<IPage>) {
    this.store = store

    this.merge(data)

    makeObservable(this, {
      merge: action,
    })
  }

  merge(data: Partial<IPage>) {
    assignIf(data, 'title', v => (this.title = v))

    return this
  }
}
