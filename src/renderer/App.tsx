import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { TreasureHunt } from './treasureHunt/TreasureHunt';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TreasureHunt/>} />
            </Routes>
        </Router>
    );
}
