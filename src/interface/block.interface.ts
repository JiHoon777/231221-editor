export enum BlockType {
  Text = 'Text',
}

interface IBaseBlock {
  id: string
  type: BlockType
}

export interface ITextBlock extends IBaseBlock {
  type: BlockType.Text
  text: string
}

export type Block = ITextBlock
