import { Route, Routes } from 'react-router-dom';
// import Auth from './features/auth';
import Home from './features/home';
import Dashboard from './features/dashboard';
import Auth from './features/auth';

function App() {
    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
        </Routes>
    );
}

export default App;
