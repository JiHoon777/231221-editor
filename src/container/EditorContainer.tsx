import { EditorNavBar } from '../component/EditorNavBar'
import { Editor } from '../component/Editor'
import { DetailEditSidebar } from '../component/DetailEditSidebar'

export function EditorContainer() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <EditorNavBar />
      <Editor />
      <DetailEditSidebar />
    </div>
  )
}
