import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import AuthBase from '@components/Base/AuthBase';

import RoutesPath from '@router/routes';

import pages from './pages';

const PublicPages: React.FC = () => {
  return (
    <AuthBase>
      <Routes>
        {pages.map((page) => (
          <Route
            key={page.route}
            path={page.route}
            element={<page.component />}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={RoutesPath.auth.login} replace />}
        />
      </Routes>
    </AuthBase>
  );
};

export default PublicPages;
