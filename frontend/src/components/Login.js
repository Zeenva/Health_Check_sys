import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 添加错误消息状态
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // 清空之前的错误消息

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === '登录成功') { // 确保这里的字符串与后端一致
        console.log('Login successful');
        // 成功登录后重定向到健康检查系统页面
        navigate('/health-check-system');
      } else {
        console.log('Login failed:', data.message);
        setErrorMessage(data.message); // 设置错误消息
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage('发生错误，请稍后再试。'); // 设置通用错误消息
    });
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>健康体检管理系统</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>用户名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* 显示错误消息 */}
        <div className="button-group">
          <button type="submit" className="login-button">登录</button>
          <button type="button" className="register-button" onClick={handleRegister}>
            注册
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
