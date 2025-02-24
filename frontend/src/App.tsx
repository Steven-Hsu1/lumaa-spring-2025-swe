import React from 'react';
import Auth from './components/Auth';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="App">
          <Auth/>
          <TaskList/>
        </div>
    );
};

export default App;
