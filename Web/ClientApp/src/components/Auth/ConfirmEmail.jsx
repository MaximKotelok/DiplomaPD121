import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConfirmEmail = () => {
    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const email = new URLSearchParams(window.location.search).get('email');
                const response = await axios.get(`https://localhost:7133/api/userauthentication/confirm?email=${email}`);
                Swal.fire('Success!', response.data, 'success');
            } catch (error) {
                Swal.fire('Error!', error.response?.data[0] || 'An error occurred mail comfirmation.', 'error');
            }

        };

        confirmEmail();
    }, []);

    return (
        <div>
            <p>Mail confirmation...</p>
        </div>
    );
};

export default ConfirmEmail;
