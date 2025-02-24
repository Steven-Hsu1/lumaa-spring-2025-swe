import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token'); // Remove token from local storage
    };

    return (
        <div className="App">
            {token ? (
                <>
                    <TaskList token={token} />
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    );
};

export default App;
