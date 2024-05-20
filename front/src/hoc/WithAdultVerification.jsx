import React, { useContext } from 'react';
import { AdultStatusContext } from '../context/AdultStatusContext';

const withAdultVerification = (WrappedComponent) => {
  const WithAdultVerification = (props) => {
    const { isAdultVerified } = useContext(AdultStatusContext);

    if (!isAdultVerified) {
      return <div>Vous devez être vérifié comme adulte pour voir ce contenu.</div>;
    }

    return <WrappedComponent {...props} />;
  };

  // Ajout du displayName pour le composant retourné
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAdultVerification.displayName = `WithAdultVerification(${wrappedComponentName})`;

  return WithAdultVerification;
};

export default withAdultVerification;
