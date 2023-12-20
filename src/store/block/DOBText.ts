import { DOBBase } from './DOBBase'
import { BlockType, ITextBlock } from '../../interface/block.interface'
import { DOPage } from '../DOPage'

export class DOBText extends DOBBase {
  blockType = BlockType.Text
  text: string = ''

  constructor(data: ITextBlock, page: DOPage) {
    super(data, page)

    this.text = data.text
  }
}
