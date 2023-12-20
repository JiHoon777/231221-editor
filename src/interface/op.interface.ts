import { Block } from './block.interface'

export enum EditorChangeActionType {
  Normal = 'Normal',
  Undo = 'Undo',
  Redo = 'Redo',
}

enum EditorChangeOpType {
  AddBlock = 'AddBlock',
  RemoveBlock = 'RemoveBlock',
}

export enum EditorChangeOpTarget {
  Root = 'Root',
  Page = 'Page',
  Block = 'Block',
}

interface BaseEditorChangeOp {
  opType: EditorChangeOpType
  target: EditorChangeOpTarget
}

interface BaseEditorPageChangeOp extends BaseEditorChangeOp {
  target: EditorChangeOpTarget.Page
  pageUniqueId: string
}

interface BaseEditorBlockChangeOp extends BaseEditorChangeOp {
  target: EditorChangeOpTarget.Block
  pageUniqueId: string
  blockUniqueId: string
}

export interface EditorAddBlock extends BaseEditorPageChangeOp {
  opType: EditorChangeOpType.AddBlock
  indexToAdd: number
  blockToAdd: Block
}

export interface EditorRemoveBlock extends BaseEditorPageChangeOp {
  opType: EditorChangeOpType.RemoveBlock
  blockToRemove: Block
}

export type EditorChangeOp =
  | EditorAddBlock
  | EditorRemoveBlock
  | BaseEditorChangeOp
  | BaseEditorPageChangeOp
  | BaseEditorBlockChangeOp

export interface EditorChangeOpResult {
  reverse: EditorChangeOp
}

export interface EditorChangeOpConsumer {
  // 변경점을 적용하며, 성공적으로 적용하면 해당 Op 를 Undo 할 때의 op 를 반환
  applyChangeOp(
    op: EditorChangeOp,
    type: EditorChangeActionType
  ): EditorChangeOpResult | null
}

/**
 * 액션을 수행하면 reverse(undo) 에 해당하는 액션을 추가적으로 저장하도록 한다.
 * 따라서 undo 를 통해 액션을 제거할 때는 이 액션을 수행하면서 스택에서 제거하면 된다.
 */
export type EditorChangeOpWithReverse = EditorChangeOp & {
  reverseOp: EditorChangeOpResult
}