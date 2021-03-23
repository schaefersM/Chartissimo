import PropTypes from 'prop-types'
import React from 'react'
import TableRow from './TableRow'

const Table = ({chartId, datasets, toggleTable}) => {

    const rows = datasets[0] ? datasets.map(({backgroundColor, yAxisID, label}, i) => {
        return (
            <TableRow
                key={i}
                backgroundColor={backgroundColor}
                yAxisID={yAxisID}
                label={label}
                rowId={i}
                chartId={chartId}
                toggleTable={toggleTable}
            />
        );
    }) : null;


    return (
        <div className="table-responsive rounded-bottom p-3 bg-success" >
            <table className="table table-borderless mb-0 graph-table">
                <thead>
                    <tr>
                        <th colSpan='100%' className="rounded-top">Table of Graphs</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
};

Table.propTypes = {
    chartId: PropTypes.number.isRequired,
    datasets: PropTypes.array.isRequired,
    toggleTable: PropTypes.func.isRequired,
}

export default Table;
