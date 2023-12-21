import { observer } from 'mobx-react-lite'
import { DOBText } from '../../store/block/DOBText'
import { EditorTextInput } from '../EditorTextInput'

export const TextBlock = observer(({ block }: { block: DOBText }) => {
  return (
    <div className="flex w-full h-12">
      <EditorTextInput realValue={block.text} onSubmit={() => {}} />
    </div>
  )
})
