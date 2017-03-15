import { consoleGroup } from '../../utils/utils'
import {
  FETCHING_FILE,
  STORE_FILE_DATA,
  UPDATE_SELECTION_INDICES,
} from './constants'

// Files Reducer
export default function reviews(state = {}, action) {
  switch (action.type) {
    case FETCHING_FILE:
      consoleGroup('FETCHING_FILE',[action])
      return Object.assign({},state,{ // Merge new review into state tree
        data: {},
        selectionIndices: state.selectionIndices,
        isLoading: true
      })

    case STORE_FILE_DATA:
      consoleGroup('STORE_FILE_DATA',[action])
      return Object.assign({},state,{ // Merge new review into state tree
        data: action.data,
        selectionIndices: [],
        isLoading: false
      })

    case UPDATE_SELECTION_INDICES:
      consoleGroup('UPDATE_SELECTION_INDICES',[action])
      return Object.assign({},state,{ // Merge new review into state tree
        data: state.data,
        selectionIndices: action.selectionIndices,
        isLoading: false
      })

    default:
      // consoleGroup('File Reducer Default',[action])
      return state
  }
}
