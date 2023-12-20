import { EditorNavBar } from '../component/EditorNavBar'
import { Editor } from '../component/Editor'
import { DetailSideEditor } from '../component/DetailSideEditor'

export function EditorContainer() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <EditorNavBar />
      <Editor />
      <DetailSideEditor />
    </div>
  )
}
