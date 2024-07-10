import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerResponse = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (registerResponse.ok) {
        // Nếu đăng ký thành công, thực hiện đăng nhập
        const loginResponse = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          alert('User registered and logged in successfully');
          // Lưu token vào local storage hoặc state quản lý authentication
          localStorage.setItem('token', data.token);
          // Chuyển hướng người dùng tới trang mua vé hoặc trang chính
          window.location.href = '/tickets';
        } else {
          const errorData = await loginResponse.json();
          alert(`Error logging in: ${errorData.message}`);
        }
      } else {
        const errorData = await registerResponse.json();
        alert(`Error registering user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
