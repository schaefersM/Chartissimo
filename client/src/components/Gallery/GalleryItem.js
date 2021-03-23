import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { useState } from 'react';



const GalleryItem = ({data}) => {

    const { 
        createdAt, 
        id, 
        image, 
        lastModified, 
        name, 
    } = data

    const [triggerAnimation, setTriggerAnimation] = useState(false);

    return (
        <div className="border border-success mb-4">
            <div>
                <h6 className="d-inline gallery-item-header">{name}</h6>
                <FontAwesomeIcon
                    className="cursor-pointer d-inline ml-2"
                    icon={faInfoCircle}
                    onMouseEnter={() =>
                        setTriggerAnimation((prevState) => !prevState)
                    }
                    onMouseLeave={() =>
                        setTriggerAnimation((prevState) => !prevState)
                    }
                    size="1x"
                />
            </div>
                {triggerAnimation &&
                    <div>
                        <p>{`Created at ${createdAt}`}</p>
                        <p>{`Last modified at ${lastModified}`}</p>
                    </div>
                }
                <Link to={`/chart/${id}`}>
                    <p className="text-center">
                        <img
                            alt={`${name}-alt`}
                            className="gallery-graph-image"
                            src={image}
                        /> 
                    </p>
                </Link>
        </div>
    );
};

GalleryItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default GalleryItem
