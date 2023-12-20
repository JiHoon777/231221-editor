import { DOBBase } from './DOBBase'
import { IImageBlock } from '../../interface/block.interface'
import { DOPage } from '../DOPage'

export class DOBImage extends DOBBase {
  url: string = ''

  constructor(data: IImageBlock, page: DOPage) {
    super(data, page)

    this.url = data.url
  }
}
