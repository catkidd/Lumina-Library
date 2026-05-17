import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import BookCatalog from './pages/BookCatalog';
import BorrowHistory from './pages/BorrowHistory';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/catalog"
                element={
                  <PrivateRoute allowedRoles={['STUDENT', 'ADMIN']}>
                    <BookCatalog />
                  </PrivateRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <PrivateRoute allowedRoles={['STUDENT']}>
                    <BorrowHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/catalog" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
