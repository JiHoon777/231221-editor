import { PageStore } from './page.store'
import { IPage } from '../interface/page.interface'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { assignIf } from './store.utils'
import { DOBlockType } from './block/DOB.interface'
import { BlockType } from '../interface/block.interface'
import { DOBText } from './block/DOBText'
import {
  EditorChangeActionType,
  EditorChangeOp,
  EditorChangeOpTarget,
  EditorChangeOpType,
  IEditorChangeOpConsumer,
  IEditorChangeOpResult,
} from '../interface/op.interface'

export class DOPage implements IEditorChangeOpConsumer {
  store: PageStore

  id: string
  title: string = 'Empty Page'
  blocks: DOBlockType[] = []

  // 현재 선택된 블록, 없다면 null
  editingBlock: DOBlockType | null = null

  constructor(store: PageStore, data: Partial<IPage> & Pick<IPage, 'id'>) {
    this.store = store

    this.id = data.id
    this.merge(data)

    makeObservable(this, {
      editingBlock: observable,
      title: observable,

      merge: action,
    })
  }

  startEditBlock(block: DOBlockType | null) {
    runInAction(() => {
      this.editingBlock = block
    })
  }

  changeTitle(title: string) {
    this.store.editorStore.applyChangeOnEditor({
      opType: EditorChangeOpType.ChangePageTitle,
      target: EditorChangeOpTarget.Page,
      pageUniqueId: this.id,
      title,
    })
  }

  applyChangeOp(
    op: EditorChangeOp,
    type: EditorChangeActionType
  ): IEditorChangeOpResult | null {
    if (op.target === EditorChangeOpTarget.Page) {
      switch (op.opType) {
        case EditorChangeOpType.ChangePageTitle: {
          const titleTemp = this.title
          runInAction(() => {
            this.title = op.title
          })
          return {
            reverse: {
              opType: EditorChangeOpType.ChangePageTitle,
              target: EditorChangeOpTarget.Page,
              title: titleTemp,
              pageUniqueId: this.id,
            },
          }
        }
      }
    }

    return null
  }

  merge(data: Partial<IPage>) {
    assignIf(data, 'title', v => (this.title = v))
    assignIf(data, 'blocks', v => {
      this.blocks = v.map(block => {
        switch (block.type) {
          case BlockType.Text: {
            return new DOBText(block, this)
          }
        }
      })
    })

    return this
  }
}
