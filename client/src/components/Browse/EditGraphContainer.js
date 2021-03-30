import { isMobile } from 'react-device-detect'
import React from 'react'
import DeleteGraph from './DeleteGraph'
import UpdateGraphColor from './UpdateGraphColor'
import UpdateGraphName from './UpdateGraphName'

const EditGraphContainer = ({chartId, backgroundColor, label, rowId, rowType, }) => {

    return (
        <div className={`d-flex flex-row flex-nowrap justify-content-around mb-3 ${isMobile ? "edit-graph-container-mobile" : "edit-graph-container"}`}>
            <div className={isMobile ? "edit-graph-container-label-mobile" : "edit-graph-container-label"}>
                <span>{label}</span>
            </div>
            <div className="pl-4 edit-graph-container-update-name">
                <UpdateGraphName chartId={chartId} rowId={rowId} />
            </div>
            <div className="pl-4 edit-graph-container-update-color">
                <UpdateGraphColor
                    chartId={chartId}
                    color={backgroundColor}
                    rowType={rowType}
                    rowId={rowId}
                />
            </div>
            <div className="pl-4 edit-graph-container-delete-graph">
                <DeleteGraph chartId={chartId} rowId={rowId} />
            </div>
        </div>
    );
}

export default EditGraphContainer
