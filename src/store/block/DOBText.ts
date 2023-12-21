import { DOBBase } from './DOBBase'
import { BlockType, ITextBlock } from '../../interface/block.interface'
import { DOPage } from '../DOPage'
import {
  EditorChangeOp,
  EditorChangeOpTarget,
  EditorChangeOpType,
  IEditorChangeOpResult,
} from '../../interface/op.interface'
import { computed, makeObservable, runInAction } from 'mobx'

export class DOBText extends DOBBase {
  blockType = BlockType.Text

  constructor(data: ITextBlock, page: DOPage) {
    super(data, page)

    makeObservable(this, {
      text: computed,
    })
  }

  get text() {
    return this.__data.text
  }

  changeText(text: string) {
    this.page.store.editorStore.applyChangeOnEditor({
      opType: EditorChangeOpType.ChangeTextBlockText,
      pageUniqueId: this.page.id,
      blockUniqueId: this.id,
      target: EditorChangeOpTarget.Block,
      text,
    })
  }

  applyChangeOp(op: EditorChangeOp): IEditorChangeOpResult | null {
    if (op.target !== EditorChangeOpTarget.Block) {
      return null
    }

    switch (op.opType) {
      case EditorChangeOpType.ChangeTextBlockText: {
        const textTemp = this.text

        runInAction(() => {
          this.__data.text = op.text
        })

        return {
          reverse: {
            opType: EditorChangeOpType.ChangeTextBlockText,
            target: EditorChangeOpTarget.Block,
            pageUniqueId: this.page.id,
            blockUniqueId: this.id,
            text: textTemp,
          },
        }
      }
    }

    return null
  }
}
