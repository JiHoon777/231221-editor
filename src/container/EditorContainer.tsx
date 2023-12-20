import { EditorNavBar } from '../component/EditorNavBar'
import { Editor } from '../component/Editor'

export function EditorContainer() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <EditorNavBar />
      <Editor />
    </div>
  )
}
