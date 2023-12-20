import { observer } from 'mobx-react-lite'
import { useEditorStore } from '../../store/configureEditorStore'
import { DetailSidePageEditor } from './DetailSidePageEditor'

export const DetailSideEditorRenderer = observer(() => {
  const editor = useEditorStore()

  switch (editor.editingPage?.editingBlock?.blockType) {
    default: {
      return <DetailSidePageEditor />
    }
  }
})
