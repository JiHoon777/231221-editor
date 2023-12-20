import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../store/configureEditorStore'

export const Editor = observer(() => {
  const editor = useEditorStore()

  if (!editor.editingPage) {
    return (
      <div className="w-full h-full inline-flex flex-col p-10">
        Page 를 선택해주세요.
      </div>
    )
  }

  return (
    <div className="flex flex-col p-10 w-[70%]">
      <h1 className="text-lg border-b border-gray-400 pb-2 mb-2">
        page id: {editor.editingPage.id}
      </h1>
      <h1 className="text-4xl mb-4">page title: {editor.editingPage.title}</h1>
    </div>
  )
})
