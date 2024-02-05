import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { setToken } from '../../../utils/Login';

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
                setToken(response.data.token);
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
            <div>
                <input className='input-text-form input-text-secondary-form mb-2' placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div>
                <input className='input-text-form input-text-secondary-form mb-2' placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
            </div>

            <button  className="brn-form brn-primary-form mb-2" type="submit">Вхід</button>
        </form>




    );
};

export default LoginForm;
