interface BaseBlock {
  id: string
}

interface TextBlock extends BaseBlock {
  text: string
}

interface ImageBlock extends BaseBlock {
  url: string
}

interface LinkBlock extends BaseBlock {
  url: string
}

export type Block = TextBlock | ImageBlock | LinkBlock
