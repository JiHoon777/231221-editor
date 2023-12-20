export const LabelWithInput = ({
  label,
  input,
}: {
  label: React.ReactNode
  input: React.ReactNode
}) => {
  return (
    <div className="w-full p-2 flex gap-4">
      {label}
      {input}
    </div>
  )
}
