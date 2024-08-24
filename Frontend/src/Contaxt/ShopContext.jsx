import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency ="$";

    const delivery_fee = 10; 

    const value = {
       products, currency, delivery_fee
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

/* 
1. Importing `createContext`:
   - The `createContext` function from React is imported. This function is used to create a Context object, which allows you to share data across the component tree without passing props manually at every level.

2. Creating a Context (`ShopContext`):
   - The `ShopContext` is created using `createContext`. This Context object will hold the state or functions that need to be shared among components.

3. Creating `ShopContextProvider` Component:
   - A functional component called `ShopContextProvider` is created. This component will serve as the provider for the `ShopContext`, allowing child components to access the values stored in the Context.

4. Defining the `value` Object:
   - Inside the `ShopContextProvider`, an object named `value` is created. This object is intended to hold the state, functions, or other values that should be shared with components that consume the Context.

5. Providing Context to Child Components:
   - The `ShopContext.Provider` component is returned, wrapping around `props.children`. This makes the `value` object available to any child components nested inside `ShopContextProvider`.

6. Exporting `ShopContextProvider`:
   - Finally, the `ShopContextProvider` component is exported so it can be imported and used in other parts of the application. This allows other components to be wrapped with `ShopContextProvider` and gain access to the `ShopContext` values.
*/
