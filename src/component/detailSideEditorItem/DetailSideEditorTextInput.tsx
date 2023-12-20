import { TextInput, TextInputProps } from '../base/TextInput'
import { useEffect, useState } from 'react'

export const DetailSideEditorTextInput = ({
  realValue,
  onSubmit,
  ...props
}: Omit<
  TextInputProps,
  'value' | 'onBlur' | 'onChange' | 'onKeyDown' | 'onSubmit'
> & {
  realValue: string
  onSubmit: (text: string) => void
}) => {
  const [value, setValue] = useState(realValue)

  useEffect(() => {
    setValue(realValue)
  }, [realValue])

  return (
    <TextInput
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => e.key === 'Enter' && onSubmit(value)}
      onBlur={() => onSubmit(value)}
    />
  )
}
