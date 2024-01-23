import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        additional: ''
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
            console.log(response)
            // Перевірка наявності токену у відповіді
            if (response.data && response.data.token) {
                // Збереження токену в локальному сховищі
                localStorage.setItem('authToken', response.data.token);
                Swal.fire('Success!', 'Login successful', 'success');

                // Додайте необхідні дії після успішного входу, наприклад, перенаправлення на іншу сторінку
            } else {
                Swal.fire('Error!', 'Invalid response format', 'error');
            }
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) {
                setErrors({
                    username: '',
                    password: '',
                    additional: 'Login/Username is wrong'
                });

            } else {

                const serverErrors = error.response.data.errors;
                console.log(serverErrors)
                setErrors({
                    username: serverErrors["UserName"] || '',
                    password: serverErrors["Password"] || ''
                });
                if (error.response) {
                    console.log(error.response)
                }

            }
            // Додайте код для обробки помилки, наприклад, відображення повідомлення про помилку
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <p className='text-danger'>{errors.username}</p>
            </div>
            <br />
            <div>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                </label>
                <p className='text-danger'>{errors.password}</p>
            </div>
            <br />
            <div>
            <p className='text-danger'>{errors.additional}</p>
            
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
