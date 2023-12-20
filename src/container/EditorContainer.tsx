import { EditorNavBar } from '../component/EditorNavBar'
import { Editor } from '../component/Editor'

export function EditorContainer() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <EditorNavBar />
      <Editor />
    </div>
  )
}
