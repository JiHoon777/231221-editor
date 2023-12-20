export type TextInputProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
>

export const TextInput = (props: TextInputProps) => {
  return (
    <input
      {...props}
      className="grow border border-gray-300 px-2"
      type="text"
    />
  )
}
