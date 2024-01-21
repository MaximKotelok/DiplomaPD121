import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:7133/api/userauthentication/register', formData);
            Swal.fire('Success!', 'User registered successfully', 'success');
            // Додайте необхідні дії після успішної реєстрації, наприклад, перенаправлення на сторінку входу
            
        } catch (error) {
            const serverErrors = error.response.data.errors;
            
            setErrors({
                username: serverErrors.find((e) => e.code.toUpperCase().includes('USERNAME'))?.description || '',
                email: serverErrors.find((e) => e.code.toUpperCase().includes('EMAIL'))?.description || '',
                password: serverErrors.find((e) => e.code.toUpperCase().includes('PASSWORD'))?.description || ''
            });
            if(error.response) { 
                console.log(error.response) 
            } 
            //Swal.fire('Error!', error.message, 'error');
            // Додайте код для обробки помилки, наприклад, відображення повідомлення про помилку
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <div>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                </label>
                <p className='text-danger'>{errors.username}</p>
            </div>
            <div>

                <label>
                    Email:
                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <p className='text-danger'>{errors.email}</p>
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
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
