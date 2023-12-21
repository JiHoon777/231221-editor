import { DOPage } from '../DOPage'
import { makeObservable, observable } from 'mobx'
import { Block, BlockType } from '../../interface/block.interface'
import {
  EditorChangeActionType,
  EditorChangeOp,
  IEditorChangeOpConsumer,
  IEditorChangeOpResult,
} from '../../interface/op.interface'

export abstract class DOBBase implements IEditorChangeOpConsumer {
  abstract blockType: BlockType
  page: DOPage

  __data: Block

  protected constructor(data: Block, page: DOPage) {
    this.page = page

    this.__data = data

    makeObservable(this, {
      page: observable,
      __data: observable,
    })
  }

  get id() {
    return this.__data.id
  }

  abstract applyChangeOp(
    op: EditorChangeOp,
    type: EditorChangeActionType
  ): IEditorChangeOpResult | null
}
