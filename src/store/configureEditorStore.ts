import { EditorStore } from './editor.store'
import React from 'react'

const store = new EditorStore()
const storeContext = React.createContext(store)

export const useEditorStore = (): EditorStore => React.useContext(storeContext)
