import React, {createContext, useReducer} from 'react';

import PlacesReducer from '../reducers/PlacesReducer';

export const PlacesContext = createContext();
export const PlacesDispatchContext = createContext();

export const PlacesProvider = props => {
  const [places, dispatch] = useReducer(PlacesReducer, []);

  return (
    <PlacesContext.Provider value={places}>
      <PlacesDispatchContext.Provider value={dispatch}>
        {props.children}
      </PlacesDispatchContext.Provider>
    </PlacesContext.Provider>
  );
};
