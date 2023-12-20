import {
  EditorChangeActionType,
  EditorChangeOp,
  EditorChangeOpTarget,
  EditorChangeOpType,
  EditorChangeOpWithReverse,
  IEditorChangeOpConsumer,
  IEditorChangeOpResult,
} from '../interface/op.interface'
import { computed, makeObservable, observable, runInAction } from 'mobx'
import { PageStore } from './page.store'

export class EditorStore implements IEditorChangeOpConsumer {
  pageStore: PageStore

  // 최초 로드이후 쌓인 변경점들
  private opStack: EditorChangeOpWithReverse[] = []
  private redoOpStack: EditorChangeOpWithReverse[] = []

  // 한 번에 하나의 변경점만 적용할 수 있도록 하기 위하여 현재 적용 중인 op 를 갖고 있는다.
  onApplying: EditorChangeOp | null = null

  constructor() {
    this.pageStore = new PageStore(this)

    makeObservable(this, {
      onApplying: observable,

      isApplyingChange: computed,
    })
  }

  get isApplyingChange() {
    return !!this.onApplying
  }

  applyChangeOnEditor(
    op: EditorChangeOp,
    type: EditorChangeActionType = EditorChangeActionType.Normal
  ) {
    if (this.isApplyingChange) {
      console.log('변경중입니다. 기다려주세요!')
      return
    }

    runInAction(() => {
      this.onApplying = op
    })

    const reverseOp = this.applyChaneOpInternal(op, type)

    if (reverseOp) {
      switch (type) {
        case EditorChangeActionType.Normal: {
          this.opStack.push({ ...op, reverseOp })

          runInAction(() => {
            this.redoOpStack = []
          })
          break
        }
        case EditorChangeActionType.Undo: {
          this.redoOpStack.push({ ...op, reverseOp })
          break
        }
        case EditorChangeActionType.Redo: {
          this.opStack.push({ ...op, reverseOp })
          break
        }
      }
    }

    runInAction(() => {
      this.onApplying = null
    })
  }

  applyChangeOp(op: EditorChangeOp): IEditorChangeOpResult | null {
    if (op.target !== EditorChangeOpTarget.Root) {
      return null
    }

    switch (op.opType) {
      case EditorChangeOpType.AddPage: {
        this.pageStore.merge(op.pageToAdd)
        return {
          reverse: {
            opType: EditorChangeOpType.RemovePage,
            target: EditorChangeOpTarget.Root,
            pageToRemove: op.pageToAdd,
          },
        }
      }
      case EditorChangeOpType.RemovePage: {
        this.pageStore.removeById(op.pageToRemove.id)
        return {
          reverse: {
            opType: EditorChangeOpType.AddPage,
            target: EditorChangeOpTarget.Root,
            pageToAdd: op.pageToRemove,
          },
        }
      }
      default: {
        return null
      }
    }
  }

  undo() {
    const op = this.opStack.pop()

    if (!op) {
      return
    }

    this.applyChangeOnEditor(op.reverseOp.reverse, EditorChangeActionType.Undo)
  }

  redo() {
    const op = this.redoOpStack.pop()

    if (!op) {
      return
    }

    this.applyChangeOnEditor(op.reverseOp.reverse, EditorChangeActionType.Redo)
  }

  private applyChaneOpInternal(
    op: EditorChangeOp,
    type: EditorChangeActionType
  ) {
    switch (op.target) {
      case EditorChangeOpTarget.Root: {
        return this.applyChangeOp(op)
      }
      case EditorChangeOpTarget.Page:
      case EditorChangeOpTarget.Block: {
        return {} as IEditorChangeOpResult
      }
      default: {
        return null
      }
    }
  }
}
