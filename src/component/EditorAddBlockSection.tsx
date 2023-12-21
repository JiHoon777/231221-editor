import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../store/configureEditorStore'

export const EditorAddBlockSection = observer(() => {
  const editor = useEditorStore()

  return (
    <div
      className="w-full flex justify-center items-center py-10 border-dotted border-4 border-gray-400 hover:border-blue-700 cursor-pointer"
      onClick={() => editor.editingPage?.addTextBlock('')}
    >
      + Add block
    </div>
  )
})
