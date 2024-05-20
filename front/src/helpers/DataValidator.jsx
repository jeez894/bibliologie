/**
 * Valide et nettoie les données en fonction des champs autorisés.
 * @param {Object} data - Les données à valider.
 * @param {Array} allowedFields - Les champs autorisés.
 * @returns {Object} Les données nettoyées.
 */
const validateAndCleanData = (data, allowedFields) => {
    const cleanedData = {};
    Object.keys(data).forEach(key => {
        if (allowedFields.includes(key) && data[key] !== undefined) {
            cleanedData[key] = data[key];
        }
    });
    return cleanedData;
};

export default validateAndCleanData;