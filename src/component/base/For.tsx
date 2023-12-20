export function For<ItemType>({
  each,
  children,
}: {
  each: ItemType[];
  children: (item: ItemType, index: number) => React.ReactNode;
}) {
  return each.map((item, index) => {
    return children(item, index);
  });
}
