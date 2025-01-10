import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShapeDetails from './ShapeDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shape/:id" element={<ShapeDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
