import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../store/configureEditorStore'
import { For } from './base/For'

export const EditorNavBar = observer(() => {
  const editor = useEditorStore()

  const pageList = editor.pageStore.list
  return (
    <nav className="flex flex-col w-[240px] h-full border-r border-gray-400 p-4">
      <div className="flex mb-10">
        <button onClick={() => editor.pageStore.addEmptyPage()}>
          Add Page
        </button>
        <button className="ml-auto" onClick={() => editor.undo()}>
          Undo
        </button>
        <button className="ml-1" onClick={() => editor.redo()}>
          Redo
        </button>
      </div>
      <For each={pageList}>
        {page => (
          <div key={page.id} onClick={() => editor.startEditPage(page)}>
            {page.title}
          </div>
        )}
      </For>
    </nav>
  )
})
