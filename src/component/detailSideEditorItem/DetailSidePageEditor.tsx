import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../../store/configureEditorStore'
import { LabelWithInput } from '../base/LabelWithInput'
import { Label } from '../base/Label'
import { EditorTextInput } from '../EditorTextInput'

export const DetailSidePageEditor = observer(() => {
  const editor = useEditorStore()

  return (
    <div className="w-full">
      <LabelWithInput
        label={<Label>Title</Label>}
        input={
          <EditorTextInput
            realValue={editor.editingPage?.title ?? ''}
            onSubmit={text => editor.editingPage?.changeTitle(text)}
          />
        }
      />
    </div>
  )
})
