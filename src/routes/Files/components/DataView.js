//import React, { PropTypes } from 'react'
import React from 'react'
import Dropzone from 'react-dropzone'
import DataGrid from './DataGrid'

class DataView extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {
      importFile,
      updateSelectionIndices,
      data,
      selection
    } = this.props

    function dropFile(files) {
      let reader = new FileReader()
      reader.onload = (event) => {
        importFile(event.target.result, true)
      }
      reader.readAsText(files[0])
    }

    let DataViewer = null
    if (data && data.rows) {
      DataViewer = <DataGrid
        data={data}
        selection={selection}
        updateSelectionIndices={updateSelectionIndices}/>
    } else {
      DataViewer = <p>No data to display</p>
    }

    return (
      <div>
        <Dropzone onDrop={dropFile}>
          <div>
            <p>Drop files here to upload</p>
            <p>or</p>
            <button>Upload Here</button>
          </div>
        </Dropzone>
        {DataViewer}
      </div>
    )
  }
}

export default DataView