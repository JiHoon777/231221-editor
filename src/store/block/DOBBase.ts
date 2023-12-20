import { DOPage } from '../DOPage'
import { makeObservable, observable } from 'mobx'
import { Block, BlockType } from '../../interface/block.interface'

export abstract class DOBBase {
  blockType: BlockType
  page: DOPage

  __data: Block

  protected constructor(data: Block, page: DOPage) {
    this.page = page

    this.__data = data
    this.blockType = data.type

    makeObservable(this, {
      page: observable,
      blockType: observable,
      __data: observable,
    })
  }

  get id() {
    return this.__data.id
  }
}
