import { observer } from 'mobx-react-lite'
import { DOBText } from '../../store/block/DOBText'
import { EditorTextInput } from '../EditorTextInput'

export const TextBlock = observer(({ block }: { block: DOBText }) => {
  return <EditorTextInput realValue={block.text} onSubmit={() => {}} />
})
