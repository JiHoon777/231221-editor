interface IBaseBlock {
  id: string
}

interface ITextBlock extends IBaseBlock {
  text: string
}

interface IImageBlock extends IBaseBlock {
  url: string
}

interface ILinkBlock extends IBaseBlock {
  url: string
}

export type Block = ITextBlock | IImageBlock | ILinkBlock
