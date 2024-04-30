import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { setToken } from '../../../utils/Login';
import styles from "../AuthPage.module.css";
import  { useLocation, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { getFavs } from "../../../services/favProducts";
import { initStorageFavs } from "../../../utils/Functions";

const LoginForm = () => {
    
    const navigate = useNavigate();


    const location = useLocation();
 
    const [from, setFrom] = useState();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      setFrom(urlParams.get("from"));
    }, [location]);
  
  
  

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
                initStorageFavs();
                //Swal.fire('Success!', 'Login successful', 'success');
                if(!from)
                    navigate("/profile");
                else
                    navigate(from);
                toast.success("Ви успішно зайшли на сайт!");
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
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Email' type="text" name="email" value={formData.email} onChange={handleInputChange} required/>
            </div>
            <div className='mb-2'>
                <input className={`input-text-form input-text-secondary-form mb-2 ${styles["my-input-text-form"]}`} placeholder='Password' type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
            </div>

            <button  className="brn-form brn-primary-form mb-2" type="submit">Вхід</button>
        </form>




    );

    
};

export default LoginForm;
