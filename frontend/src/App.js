import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HealthCheckSystem from './components/HealthCheckSystem';
import Welcome from './components/Welcome'; // 导入新的 Welcome 组件


function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/health-check-system/" element={<HealthCheckSystem />} />
      </Routes>
    </Router>
  );
}

export default App;