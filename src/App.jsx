import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import PasswordChecker from './pages/PasswordChecker';
import PasswordGenerator from './pages/PasswordGenerator';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/check" replace />} />
          <Route path="check" element={<PasswordChecker />} />
          <Route path="generate" element={<PasswordGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
