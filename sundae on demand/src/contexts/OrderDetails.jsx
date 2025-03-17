import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

//create custom hook to check whether we're in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error("Context Must Be Used Inside The Provider");
  }

  return contextValue;
}

export function OrderDetailsProvider({ children }) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionsCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionsCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((acc, curr) => acc + curr, 0);
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  return (
    <OrderDetails.Provider
      value={{ optionCounts, totals, updateItemCount, resetOrder }}
    >
      {children}
    </OrderDetails.Provider>
  );
}
