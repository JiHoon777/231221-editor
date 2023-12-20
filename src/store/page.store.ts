import { IPage } from '../interface/page.interface'
import { EditorStore } from './editor.store'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { DOPage } from './DOPage'
import {
  EditorChangeOpTarget,
  EditorChangeOpType,
} from '../interface/op.interface'
import { generateUuid } from './store.utils'

export class PageStore {
  editorStore: EditorStore
  data: Map<string, DOPage>

  constructor(editorStore: EditorStore) {
    this.editorStore = editorStore
    this.data = new Map()

    makeObservable(this, {
      data: observable,

      merge: action,

      list: computed,
    })
  }

  get list() {
    return [...this.data.values()]
  }

  addEmptyPage() {
    this.editorStore.applyChangeOnEditor({
      opType: EditorChangeOpType.AddPage,
      target: EditorChangeOpTarget.Root,
      pageToAdd: {
        id: generateUuid(),
        title: 'Untitled',
        blocks: [],
      },
    })
  }

  getById(id: string) {
    return this.data.get(id)
  }

  removeById(id: string) {
    const pageRemoved = this.data.get(id)

    runInAction(() => {
      this.data.delete(id)
    })

    return pageRemoved
  }

  merge(data: Partial<IPage> & Pick<IPage, 'id'>) {
    const id = data.id

    if (this.getById(id)) {
      this.getById(id)!.merge(data)
    } else {
      this.data.set(id, new DOPage(this, data))
    }

    return this.getById(id)
  }
}
