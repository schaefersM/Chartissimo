import React from 'react'
import TableUpdateName from './TableUpdateName'
import TableUpdateColor from './TableUpdateColor'
import TableDeleteGraph from './TableDeleteGraph'
import PropTypes from 'prop-types';

const TableRow = ({
    backgroundColor, 
    chartId, 
    label, 
    rowId, 
    toggleTable,
    yAxisID, 
}) => {

    return (
        <tr>
            <td className="align-middle">
                <p className="mb-0">{label}</p>
            </td>
            <td className="align-middle">
                <TableUpdateName chartId={chartId} rowId={rowId} />
            </td>
            <td className="align-middle">
                <TableUpdateColor
                    color={backgroundColor}
                    chartId={chartId}
                    rowId={rowId}
                    rowType={yAxisID}
                />
            </td>
            <td className="align-middle">
                <TableDeleteGraph
                    chartId={chartId}
                    rowId={rowId}
                    toggleTable={toggleTable}
                />
            </td>
        </tr>
    );
}

TableRow.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    chartId: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    rowId: PropTypes.number.isRequired,
    toggleTable: PropTypes.func.isRequired,
    yAxisID: PropTypes.string.isRequired,
}

export default TableRow;