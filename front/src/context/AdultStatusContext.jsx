import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../config";

export const AdultStatusContext = createContext();

export const AdultStatusProvider = ({ children }) => {
  const [isAdultVerified, setIsAdultVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('b4y-token');
    if (token) {
      verifyAdultStatus(token);
    }
  }, []);

  const verifyAdultStatus = async (token) => {
    try {
      const response = await axios.get(`${config.backend}/adultVerify`, {
        headers: {'Authorization': `Bearer ${token}`},
      });

      const { data } = response;
      if (data.isAdultVerified) {
        setIsAdultVerified(true);
      } else {
        setIsAdultVerified(false);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification d\'adulte:', error);
      setIsAdultVerified(false);
    }
  };

  return (
    <AdultStatusContext.Provider value={{ isAdultVerified, verifyAdultStatus }}>
      {children}
    </AdultStatusContext.Provider>
  );
};
