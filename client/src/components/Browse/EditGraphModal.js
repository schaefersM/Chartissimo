import { isMobile } from 'react-device-detect'
import Modal from "react-bootstrap/Modal";
import React from "react";
import EditGraphContainer from './EditGraphContainer'
import { useChartDispatch, useChartStore } from "../../stores/chartStore";


const EditGraphModal = ({datasets, chartId}) => {

    const { showEditGraphModal } = useChartStore();
    const chartDispatch = useChartDispatch();

    const Container = datasets[0]
        ? datasets.map(({ backgroundColor, yAxisID, label }, i) => {
                return (
                    <>
                        <EditGraphContainer
                            key={label}
                            backgroundColor={backgroundColor}
                            rowType={yAxisID}
                            label={label}
                            rowId={i}
                            chartId={chartId}
                        />
                        <hr 
                            className="edit-graph-container-hr"
                        />
                    </>
                );
            })
        : null;

    return (
            <Modal
                show={showEditGraphModal}
                aria-labelledby="example-custom-modal-styling-title"
                onHide={() =>
                    chartDispatch({
                        type: "toggleEditGraphModal",
                    })
                }
                centered={true}
                dialogClassName={
                    isMobile
                        ? "edit-graph-modal-dialog-mobile"
                        : "edit-graph-modal-dialog"
                }
            >
                <Modal.Header
                    closeButton
                    className={
                        isMobile
                            ? "edit-graph-modal-header-mobile"
                            : "edit-graph-modal-header"
                    }
                >
                    <Modal.Title>
                        <span className="text-white">.</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="edit-graph-modal-body">
                    <div className="d-flex flex-column flex-nowrap justify-content-around edit-graph-modal-container">
                        {Container}
                    </div>
                </Modal.Body>
            </Modal>
    );
};

export default EditGraphModal;
