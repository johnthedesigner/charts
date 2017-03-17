import CSV from 'babyparse'
// import fetch from 'whatwg-fetch'

import { consoleGroup } from '../../utils/utils'
import {
  FETCHING_FILE,
  FILE_PARSE_ERROR,
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

export function fileParseError() {
  return {
    type: FILE_PARSE_ERROR
  }
}

export function fetchAndParseFile(unparsedData, headerRow) {
  function buildDataset(data) {
    let columnKeys = Object.keys(data[0])
    let columns = columnKeys.map(function(obj) {
      let column = {
        key: obj,
        name: obj
      }
      return column
    })
    let rowKeys = Object.keys(data)
    let rows = rowKeys.map(function(key) {
      let row = data[key]
      row.id = key
      return row
    })
    return {
      columns,
      rows
    }
  }
  return dispatch => {
    dispatch(fetchingFile())
    let json = CSV.parse(unparsedData, { header: headerRow })
    if (json.errors.length > 0) dispatch(fileParseError(json.errors))
    let dataset = buildDataset(json.data)
    dispatch(storeFileData(dataset))
  }
}

export function updateSelectionIndices(selection) {
  return {
    type: UPDATE_SELECTION_INDICES,
    selection
  }
}
