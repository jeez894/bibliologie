import React from 'react';
import { toast } from 'react-toastify';

const ConfirmActionToast = ({ message, onConfirm }) => {
    return (
        <section className="confirm-toast">
            {message}
            <button onClick={() => {
                onConfirm();
                toast.dismiss();
            }}>
                Confirmer
            </button>
            <button onClick={() => toast.dismiss()}>
                Annuler
            </button>
        </section>
    );
};

export default ConfirmActionToast;