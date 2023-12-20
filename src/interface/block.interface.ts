export enum BlockType {
  Text = 'Text',
  Image = 'Image',
}

interface IBaseBlock {
  id: string
  type: BlockType
}

export interface ITextBlock extends IBaseBlock {
  type: BlockType.Text
  text: string
}

export interface IImageBlock extends IBaseBlock {
  type: BlockType.Image
  url: string
}

export type Block = ITextBlock | IImageBlock
