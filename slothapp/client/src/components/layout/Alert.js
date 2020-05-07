import React, { useContext } from 'react';
import { AlertContext } from '../../contexts/AlertContext';

const Alert = () => {
    // Konsumera context
    const { alertData } = useContext(AlertContext);

    return (
        alertData !== null && alertData.length > 0 &&
        alertData.map(alert => (
            <div key={alert.id} className={`alert alert-${alertData.alertType}`}>
                {alert.msg}
            </div>
        ))
    );
}

export default Alert;
