import { connect } from 'react-redux'

import { fetchAndParseFile, updateSelectionIndices } from '../actions'
import DataView from '../components/DataView'

function mapRows(data) {
  if (data) {
    let keys = Object.keys(data)
    let rows = keys.map(function(key) {
      let row = data[key]
      row.id = key
      return row
    })
    return rows
  } else {
    return []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    importFile: (files, headerRow) => {
      dispatch(fetchAndParseFile(files, headerRow))
    },
    updateSelectionIndices: (indices) => {
      dispatch(updateSelectionIndices(indices))
    }
  }
}

const mapStateToProps = (state) => ({
  data: mapRows(state.Files.data),
  selectionIndices: state.Files.selectionIndices
})

const DataViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataView)

export default DataViewContainer
