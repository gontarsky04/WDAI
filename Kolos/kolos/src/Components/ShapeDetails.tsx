import React from 'react';
import { useParams } from 'react-router-dom';

const ShapeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <p>No shape selected.</p>;
    }

    return (
        <div className="details">
            <h1>Shape Details</h1>
            <p>Shape ID: {id}</p>
        </div>
    );
};

export default ShapeDetails;
