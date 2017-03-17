//import React, { PropTypes } from 'react'
import React from 'react'
import ReactDataGrid from 'react-data-grid'
import _ from 'lodash'

class DataView extends React.Component {
  constructor() {
    super()
  }

  rowGetter = (index) => {
    if (index < 0 || index > this.rowsCount()) {
      return undefined
    }
    return this.props.data.rows[index]
  }

  rowsCount = () => {
    return this.props.data.rows.length;
  }

  rowSelection = (selection) => {
    console.log(selection)
    let newIndices = _.map(selection, (o)=>{return o.rowIdx})
    let newRows = _.map(selection, (o)=>{return o.row})
    let newSelection = {
      indices: [...this.props.selection.indices, ...newIndices],
      rows: [...this.props.selection.rows, ...newRows]
    }
    this.props.updateSelectionIndices(newSelection)
  }

  rowDeselection = (selection) => {
    let removeIndices = _.map(selection, (o)=>{return o.rowIdx})
    let removeRow = _.map(selection, (o)=>{return o.row})
    let newSelection = {
      indices: _.pull(this.props.selection.indices, ...removeIndices),
      rows: _.pull(this.props.selection.rows, ...removeRow)

    }
    this.props.updateSelectionIndices(newSelection)
  }

  render() {
    const { data, selection } = this.props

    return (
      <div>
        <ReactDataGrid
        ref='grid'
        rowGetter={this.rowGetter}
        rowsCount={this.rowsCount()}
        enableRowSelect={true}
        enableCellSelect={false}
        columns={data.columns}
        rowSelection={{
          showCheckbox: true,
          enableShiftSelect: false,
          onRowsSelected: this.rowSelection,
          onRowsDeselected: this.rowDeselection,
          selectBy: {
            indexes: selection.indices
          }
        }}/>
      </div>
    )
  }
}

export default DataView