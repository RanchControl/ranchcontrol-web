import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import PublicPages from './PublicPages';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <PublicPages />
    </BrowserRouter>
  );
};

export default AppRouter;
