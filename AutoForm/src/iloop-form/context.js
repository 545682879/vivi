import React from 'react';

export const dependences = {
};

export const DependencesContext = React.createContext({ 
  dependences, 
  changeDependences: () => {},
});

