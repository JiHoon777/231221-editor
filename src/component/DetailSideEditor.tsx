import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../store/configureEditorStore'
import { DetailSideEditorRenderer } from './detailSideEditorItem/DetailSideEditorRenderer'

export const DetailSideEditor = observer(() => {
  const editor = useEditorStore()

  if (!editor.editingPage) {
    return null
  }

  return (
    <div className="w-[390px] h-full flex flex-col border-l border-gray-600 gap-4 p-6">
      <DetailSideEditorRenderer />
    </div>
  )
})
