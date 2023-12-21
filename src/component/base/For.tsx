import { observer } from 'mobx-react-lite'

export const For = observer(
  <ItemType,>({
    each,
    children,
  }: {
    each: ItemType[]
    children: (item: ItemType, index: number) => React.ReactNode
  }) => {
    return each.map((item, index) => {
      return children(item, index)
    })
  }
)
