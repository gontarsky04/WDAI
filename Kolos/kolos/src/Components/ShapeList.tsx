import React from 'react';
import { Shape } from './Home';
import { Link } from 'react-router-dom';

type Props = {
    shapes: Shape[];
    onRemove: (id: string) => void;
};

const ShapeList: React.FC<Props> = ({ shapes, onRemove }) => {
    return (
        <div className="shape-list">
            {shapes.map((shape) => (
                <div key={shape.id} className={`shape ${shape.type.toLowerCase()}`}>
                    <p>{shape.type}</p>
                    <button onClick={() => onRemove(shape.id)}>Remove</button>
                    <Link to={`/shape/${shape.id}`}>Details</Link>
                </div>
            ))}
        </div>
    );
};

export default ShapeList;
