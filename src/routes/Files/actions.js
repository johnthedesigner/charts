import CSV from 'babyparse'
// import fetch from 'whatwg-fetch'

import { consoleGroup } from '../../utils/utils'
import {
  FETCHING_FILE,
  STORE_FILE_DATA,
  UPDATE_SELECTION_INDICES,
} from './constants'

export function fetchingFile() {
  return {
    type: FETCHING_FILE
  }
}

export function storeFileData(data) {
  return {
    type: STORE_FILE_DATA,
    data
  }
}

export function fetchAndParseFile(unparsedData, headerRow) {
  return dispatch => {
    dispatch(fetchingFile())
    let parsed = CSV.parse(unparsedData, { header: headerRow })
    let results = {}
    if (parsed.errors.length > 0) results = parsed.errors
    if (parsed.data.length > 0) results = parsed.data
    dispatch(storeFileData(results))
  }
}

export function updateSelectionIndices(selectionIndices) {
  return {
    type: UPDATE_SELECTION_INDICES,
    selectionIndices
  }
}
