//import React, { PropTypes } from 'react'
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import _ from 'lodash'

class DataView extends React.Component {
  constructor() {
    super()
  }

  mapColumns = (firstRow) => {
    let keys = Object.keys(firstRow)
    let columns = keys.map(function(obj) {
      let column = {
        key: obj,
        name: obj
      }
      return column
    })
    return columns
  }

  rowGetter = (index) => {
    if (index < 0 || index > this.rowsCount()) {
      return undefined
    }
    return this.props.data[index]
  }

  rowsCount = () => {
    return this.props.data.length;
  }

  rowSelection = (selection) => {
    let newIndex = _.map(selection, (o)=>{return o.rowIdx})
    let indices = [...this.props.selectionIndices, ...newIndex]
    this.props.updateSelectionIndices(indices)
  }

  rowDeselection = (selection) => {
    let removeIndex = _.map(selection, (o)=>{return o.rowIdx})
    console.log('selectionIndices', this.props.selectionIndices)
    console.log('removeIndex', removeIndex)
    let indices = _.pull(this.props.selectionIndices, ...removeIndex)
    this.props.updateSelectionIndices(indices)
  }

  render() {
    const { data, selectionIndices } = this.props

    return (
      <div>
        <ReactDataGrid
        ref='grid'
        rowGetter={this.rowGetter}
        rowsCount={this.rowsCount()}
        enableRowSelect={true}
        enableCellSelect={false}
        columns={this.mapColumns(data[0])}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: false,
          onRowsSelected: this.rowSelection,
          onRowsDeselected: this.rowDeselection,
          selectBy: {
            indexes: selectionIndices
          }
        }}/>
      </div>
    )
  }
}

export default DataView