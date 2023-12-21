import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../../store/configureEditorStore'
import { BlockType } from '../../interface/block.interface'
import { TextBlock } from './TextBlock'

export const BlockRenderer = observer(() => {
  const editor = useEditorStore()

  return (
    editor.editingPage?.blocks?.map(block => {
      switch (block.blockType) {
        case BlockType.Text: {
          return <TextBlock key={block.id} block={block} />
        }
        default: {
          return `${block.blockType} 구현해주세요. 개발자님!`
        }
      }
    }) ?? null
  )
})
