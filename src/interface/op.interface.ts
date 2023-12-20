import { Block } from './block.interface'
import { IPage } from './page.interface'

export enum EditorChangeActionType {
  Normal = 'Normal',
  Undo = 'Undo',
  Redo = 'Redo',
}

export enum EditorChangeOpType {
  // Root
  AddPage = 'AddPage',
  RemovePage = 'RemovePage',

  // Page
  AddBlock = 'AddBlock',
  RemoveBlock = 'RemoveBlock',
  ChangePageTitle = 'ChangePageTitle',

  // Block
  ChangeTextBlockText = 'ChangeTextBlockText',
}

export enum EditorChangeOpTarget {
  Root = 'Root',
  Page = 'Page',
  Block = 'Block',
}

interface IBaseEditorChangeOp {
  opType: EditorChangeOpType
  target: EditorChangeOpTarget
}

interface IBaseEditorRootChangeOp extends IBaseEditorChangeOp {
  target: EditorChangeOpTarget.Root
}

interface IBaseEditorPageChangeOp extends IBaseEditorChangeOp {
  target: EditorChangeOpTarget.Page
  pageUniqueId: string
}

interface IBaseEditorBlockChangeOp extends IBaseEditorChangeOp {
  target: EditorChangeOpTarget.Block
  pageUniqueId: string
  blockUniqueId: string
}

// Root
export interface IEditorAddPage extends IBaseEditorRootChangeOp {
  opType: EditorChangeOpType.AddPage
  pageToAdd: IPage
}

export interface IEditorRemovePage extends IBaseEditorRootChangeOp {
  opType: EditorChangeOpType.RemovePage
  pageToRemove: IPage
}

// Page
export interface IEditorAddBlock extends IBaseEditorPageChangeOp {
  opType: EditorChangeOpType.AddBlock
  indexToAdd: number
  blockToAdd: Block
}

export interface IEditorRemoveBlock extends IBaseEditorPageChangeOp {
  opType: EditorChangeOpType.RemoveBlock
  blockToRemove: Block
}

export interface IEditorChangePageTitle extends IBaseEditorPageChangeOp {
  opType: EditorChangeOpType.ChangePageTitle
  title: string
}

// Block

export interface IEditorChangeTextBlockText extends IBaseEditorBlockChangeOp {
  opType: EditorChangeOpType.ChangeTextBlockText
  text: string
}

export type EditorChangeOp =
  // Root
  | IEditorAddPage
  | IEditorRemovePage
  // Page
  | IEditorAddBlock
  | IEditorRemoveBlock
  | IEditorChangePageTitle
  // Block
  | IEditorChangeTextBlockText

export interface IEditorChangeOpResult {
  reverse: EditorChangeOp
}

export interface IEditorChangeOpConsumer {
  // 변경점을 적용하며, 성공적으로 적용하면 해당 Op 를 Undo 할 때의 op 를 반환
  applyChangeOp(
    op: EditorChangeOp,
    type: EditorChangeActionType
  ): IEditorChangeOpResult | null
}

/**
 * 액션을 수행하면 reverse(undo) 에 해당하는 액션을 추가적으로 저장하도록 한다.
 * 따라서 undo 를 통해 액션을 제거할 때는 이 액션을 수행하면서 스택에서 제거하면 된다.
 */
export type EditorChangeOpWithReverse = EditorChangeOp & {
  reverseOp: IEditorChangeOpResult
}
