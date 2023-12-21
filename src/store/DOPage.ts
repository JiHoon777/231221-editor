import { PageStore } from './page.store'
import { IPage } from '../interface/page.interface'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { assignIf, generateUuid } from './store.utils'
import { DOBlockType } from './block/DOB.interface'
import { BlockType, ITextBlock } from '../interface/block.interface'
import { DOBText } from './block/DOBText'
import {
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

  constructor(store: PageStore, data: Partial<IPage> & Pick<IPage, 'id'>) {
    this.store = store

    this.id = data.id
    this.merge(data)

    makeObservable(this, {
      title: observable,
      blocks: observable,

      merge: action,
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

  addTextBlock(text: string) {
    this.store.editorStore.applyChangeOnEditor({
      opType: EditorChangeOpType.AddBlock,
      target: EditorChangeOpTarget.Page,
      pageUniqueId: this.id,
      blockToAdd: {
        id: generateUuid(),
        type: BlockType.Text,
        text,
      },
      indexToAdd: this.blocks.length,
    })
  }

  removeTextBlock(blockToRemove: ITextBlock) {
    this.store.editorStore.applyChangeOnEditor({
      opType: EditorChangeOpType.RemoveBlock,
      target: EditorChangeOpTarget.Page,
      pageUniqueId: this.id,
      blockToRemove,
    })
  }

  applyChangeOp(op: EditorChangeOp): IEditorChangeOpResult | null {
    if (op.target === EditorChangeOpTarget.Block) {
      const blockFound = this.blocks.find(
        block => block.id === op.blockUniqueId
      )

      if (!blockFound) {
        return null
      }

      return blockFound.applyChangeOp(op)
    }

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
        case EditorChangeOpType.AddBlock: {
          runInAction(() => {
            this.blocks.splice(
              op.indexToAdd,
              0,
              new DOBText(op.blockToAdd, this)
            )
          })

          return {
            reverse: {
              opType: EditorChangeOpType.RemoveBlock,
              target: EditorChangeOpTarget.Page,
              blockToRemove: op.blockToAdd,
              pageUniqueId: this.id,
            },
          }
        }
        case EditorChangeOpType.RemoveBlock: {
          const blockIndexFound = this.blocks.findIndex(
            block => block.id === op.blockToRemove.id
          )

          if (blockIndexFound < 0) {
            return null
          }

          runInAction(() => {
            this.blocks.splice(blockIndexFound, 1)
          })

          return {
            reverse: {
              opType: EditorChangeOpType.AddBlock,
              target: EditorChangeOpTarget.Page,
              blockToAdd: op.blockToRemove,
              indexToAdd: blockIndexFound,
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
