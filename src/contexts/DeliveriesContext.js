import React, { createContext, useState, useContext } from 'react';

const DeliveriesContext = createContext();

export const DeliveriesProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);

  const updateDeliveries = (newDeliveries) => {
    setDeliveries(newDeliveries);
  };

  return (
    <DeliveriesContext.Provider value={{ deliveries, updateDeliveries }}>
      {children}
    </DeliveriesContext.Provider>
  );
};

export const useDeliveriesContext = () => useContext(DeliveriesContext);
