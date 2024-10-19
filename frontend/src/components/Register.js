import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    profile: {
      name: '',
      age: '',
      phone: '',
      gender: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

     // 调试输出，确保 handleChange 被调用
     console.log(`Changing field: ${name}, New value: ${value}`);

    // 检查字段是否属于 profile
    if (['name', 'age', 'phone', 'gender'].includes(name)) {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [name]:  value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    const { username, password, profile } = formData;
    const { age, phone, gender } = profile;
    const newErrors = {};
    
    if (username.trim() === '') {
      newErrors.username = '用户名不能为空';
    }
    if (password.length < 6) {
      newErrors.password = '密码必须至少6位数';
    }
    if (!/^\d+$/.test(age)) {
      newErrors.age = '年龄必须是数字';
    }
    if (!/^\d{11}$/.test(phone)) {
      newErrors.phone = '手机号必须是11位数字';
    }
    if (!gender) {
      newErrors.gender = '请选择性别';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const checkResponse = await axios.post('http://localhost:8000/api/check-username/', { username: formData.username });
    
    if (checkResponse.data.exists) {
      // 如果用户名已存在，更新错误信息并返回
      setErrors({ username: '该用户名已经被注册' });
      return;
    }


      const response = await axios.post('http://localhost:8000/api/register/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) { // 确保状态码与后端一致
        setMessage('注册成功！');
        setErrors({});
        setTimeout(() => navigate('/'), 2000); // 注册后跳转到登录页面
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          if (data.profile) {
            setErrors({ profile: data.profile[0] });
          } else if (data.username) {
            setErrors({ username: data.username[0] });
          } else {
            setErrors({ general: data.message || '注册失败' });
          }
          setMessage('');
        } else {
          setErrors({ general: '注册失败，请稍后再试' });
          setMessage('');
        }
      } else {
        console.error('Error:', error);
        setErrors({ general: '注册失败，请稍后再试' });
        setMessage('');
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>用户信息注册</h2>
        <form onSubmit={handleSubmit}>
          <label>
            用户名:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="error-message">{errors.username}</div>}
          </label>
          <label>
            密码:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </label>
          <label>
            姓名:
            <input
              type="text"
              name="name"
              value={formData.profile.name}
              onChange={handleChange}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </label>
          <label>
            年龄:
            <input
              type="number"
              name="age"
              value={formData.profile.age}
              onChange={handleChange}
            />
            {errors.age && <div className="error-message">{errors.age}</div>}
          </label>
          <label>
            手机号:
            <input
              type="tel"
              name="phone"
              value={formData.profile.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </label>
          <label>
            性别:
            <select
              name="gender"
              value={formData.profile.gender}
              onChange={handleChange}
            >
              <option value="">请选择</option>
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
            {errors.gender && <div className="error-message">{errors.gender}</div>}
          </label>
          <button type="submit">立即注册</button>
        </form>
        {errors.profile && <div className="error-message">{errors.profile}</div>}
        {errors.general && <div className="error-message">{errors.general}</div>}
        {message && <div className="success-message">{message}</div>}
      </div>
    </div>
  );
}

export default Register;
