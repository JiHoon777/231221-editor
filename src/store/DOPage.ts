import { PageStore } from './page.store'
import { IPage } from '../interface/page.interface'
import { action, makeObservable } from 'mobx'
import { assignIf } from './store.utils'
import { DOBlockType } from './block/DOB.interface'
import { BlockType } from '../interface/block.interface'
import { DOBText } from './block/DOBText'
import { DOBImage } from './block/DOBImage'

export class DOPage {
  store: PageStore

  title: string = 'Empty Page'
  blocks: DOBlockType[] = []

  constructor(store: PageStore, data: Partial<IPage>) {
    this.store = store

    this.merge(data)

    makeObservable(this, {
      merge: action,
    })
  }

  merge(data: Partial<IPage>) {
    assignIf(data, 'title', v => (this.title = v))
    assignIf(data, 'blocks', v => {
      this.blocks = v.map(block => {
        switch (block.type) {
          case BlockType.Text: {
            return new DOBText(block, this)
          }
          case BlockType.Image: {
            return new DOBImage(block, this)
          }
        }
      })
    })

    return this
  }
}
