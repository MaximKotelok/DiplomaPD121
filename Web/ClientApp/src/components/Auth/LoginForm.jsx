import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7133/api/userauthentication/login', formData);
            // Перевірка наявності токену у відповіді
            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                Swal.fire('Success!', 'Login successful', 'success');
                // Додайте необхідні дії після успішного входу, наприклад, перенаправлення на іншу сторінку
            } else {
                Swal.fire('Error!', 'An error occurred during login.', 'error');
            }
        } catch (error) {
            Swal.fire('Error!', error.response?.data || 'An error occurred during login.', 'error');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
