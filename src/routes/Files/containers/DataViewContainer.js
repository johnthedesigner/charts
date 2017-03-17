import { connect } from 'react-redux'

import { fetchAndParseFile, updateSelectionIndices } from '../actions'
import DataView from '../components/DataView'
import initialState from '../../../store/initialState'

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
  data: state.Files.data,
  selection: state.Files.selection
})

const DataViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataView)

export default DataViewContainer
