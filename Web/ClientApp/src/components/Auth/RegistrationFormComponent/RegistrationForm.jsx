import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import styles from "../AuthPage.module.css";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
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
            Swal.fire('Success!', response.data, 'success');
            // Додайте необхідні дії після успішної реєстрації, наприклад, перенаправлення на сторінку входу
            
        } catch (error) {
            Swal.fire('Error!', error.response?.data[0] || 'An error occurred during registration.', 'error');
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            {/* <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
            </label>
            <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleInputChange} required />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
            </label> */}

                      <div className='mb-2'>
            <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Username' type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
            </div>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className='mb-2'>

                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
               </div>
               <div className='mb-2'>

                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Confirm password' type="password" name="confirmPassword" value={formData.password} onChange={handleInputChange} required/>
               </div>
            <button  className="brn-form brn-primary-form mb-2" type="submit">Зареєструватись</button>
        </form>
    );
};

export default RegistrationForm;
