import React from 'react';

const SettingModal = ({ show, onClose, dyslexicMode, onToggleTheme, onToggleDyslexicMode }) => {
    if (!show) return null;

    const buttonText = dyslexicMode === 'false' ? 'Mode Dyslexique' : (dyslexicMode === 'true' ? 'Dyslexique Super' : 'Désactiver');

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Paramètres</h2>
                <button onClick={onClose}>Fermer</button>
                <button onClick={() => onToggleTheme('Light')}>Mode Clair</button>
                <button onClick={onToggleDyslexicMode}>{buttonText}</button>
            </div>
        </div>
    );
};

export default SettingModal;
