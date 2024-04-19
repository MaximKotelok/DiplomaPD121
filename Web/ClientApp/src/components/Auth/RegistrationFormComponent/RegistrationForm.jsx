import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import styles from "../AuthPage.module.css";
const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    

    //const [errors, setErrors] = useState({}); // Add this line

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Swal.fire('Error!', 'Passwords do not match.', 'error');
            return;
        }

        try {
            const response = await axios.post('https://localhost:7133/api/userauthentication/register', formData);
            Swal.fire('Success!', response.data, 'success');
        } catch (error) {
            //setErrors(error.response?.data || {}); // Add this line
            Swal.fire('Error!', error.response?.data[0] || 'An error occurred during registration.', 'error');
        }
    };

    // Check if all fields are filled
    const isFormFilled = formData.username && formData.email && formData.password && formData.confirmPassword;

    return (
        <form onSubmit={handleRegistration}>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Username' type="text" name="username" value={formData.username} onChange={handleInputChange} required />
                {/*{errors.username && <p className="error">{errors.username}</p>} */}{/* Add this line */}
            </div>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Email' type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                {/*{errors.email && <p className="error">{errors.email}</p>} */}{/* Add this line */}
            </div>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength="6" />
                {/*{errors.password && <p className="error">{errors.password}</p>} */}{/* Add this line */}
            </div>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Confirm password' type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required/>
                {/*{errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} */}{/* Add this line */}
            </div>
            <button className={`brn-form ${isFormFilled ? 'brn-primary-form' : 'brn-secondary-form'} mb-2`} type="submit" disabled={!isFormFilled}>Зареєструватись</button>
        </form>
    );
};

export default RegistrationForm;
