import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../store/configureEditorStore'
import {
  EditorChangeOpTarget,
  EditorChangeOpType,
} from '../interface/op.interface'
import { generateUuid } from '../store/store.utils'
import { For } from './base/For'

export const EditorNavBar = observer(() => {
  const editor = useEditorStore()

  const handleAddPage = () => {
    editor.applyChangeOnEditor({
      opType: EditorChangeOpType.AddPage,
      target: EditorChangeOpTarget.Root,
      pageToAdd: {
        id: generateUuid(),
        title: 'Untitled',
        blocks: [],
      },
    })
  }

  return (
    <nav className="inline-flex flex-col w-[240px] h-full border-r border-gray-400 p-4">
      <div className="flex ">
        <button onClick={handleAddPage}>Add Page</button>

        <button className="ml-auto" onClick={() => editor.undo()}>
          Undo
        </button>
        <button className="ml-1" onClick={() => editor.redo()}>
          Redo
        </button>
      </div>
      <For each={editor.pageStore.list}>
        {page => <div key={page.id}>{page.title}</div>}
      </For>
    </nav>
  )
})
