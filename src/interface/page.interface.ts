import { Block } from './block.interface'

export interface IPage {
  id: string
  title: string
  blocks: Block[]
}
