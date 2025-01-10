import React, { useState } from 'react';
import ShapeList from './ShapeList';

export type Shape = {
    id: string;
    type: 'Square' | 'Rectangle' | 'Circle';
};

const Home: React.FC = () => {
    const [shapes, setShapes] = useState<Shape[]>([
        { id: '1', type: 'Square' },
        { id: '2', type: 'Rectangle' },
        { id: '3', type: 'Circle' },
    ]);
    const [filter, setFilter] = useState<'All' | 'Square' | 'Rectangle' | 'Circle'>('All');

    const addShape = (type: 'Square' | 'Rectangle' | 'Circle') => {
        const newShape: Shape = { id: Math.random().toString(), type };
        setShapes([...shapes, newShape]);
    };

    const removeShape = (id: string) => {
        setShapes(shapes.filter((shape) => shape.id !== id));
    };

    const filteredShapes = filter === 'All' ? shapes : shapes.filter((shape) => shape.type === filter);

    return (
        <div className="container">
            <h1>Shape Manager</h1>
            <div className="controls">
                <button onClick={() => addShape('Square')}>Add Square</button>
                <button onClick={() => addShape('Rectangle')}>Add Rectangle</button>
                <button onClick={() => addShape('Circle')}>Add Circle</button>
                <select onChange={(e) => setFilter(e.target.value as any)} value={filter}>
                    <option value="All">All</option>
                    <option value="Square">Square</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Circle">Circle</option>
                </select>
            </div>
            <ShapeList shapes={filteredShapes} onRemove={removeShape} />
        </div>
    );
};

export default Home;