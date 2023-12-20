import { DOBBase } from './DOBBase'
import { ITextBlock } from '../../interface/block.interface'
import { DOPage } from '../DOPage'

export class DOBText extends DOBBase {
  text: string = ''

  constructor(data: ITextBlock, page: DOPage) {
    super(data, page)

    this.text = data.text
  }
}
