import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { NotificationList } from './pages/NotificationList';
import { UserList } from './pages/UserList';
import { CreateNotification } from './pages/CreateNotification';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <Router>
      <ToastProvider>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notifications" element={<NotificationList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/create-notification" element={<CreateNotification />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </UserProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;