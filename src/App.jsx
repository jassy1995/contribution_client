import { Route, Routes } from 'react-router-dom';
import Overview from './pages/Overview.jsx';
import Collections from './pages/Collections.jsx';
import RequireAuth from './components/core/shared/RequireAuth.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';
import Users from './pages/Users.jsx';
import Transactions from './pages/Transactions.jsx';
import Login from './pages/Login.jsx';
import RequireNoAuth from './components/core/shared/RequireNoAuth.jsx';
import Logout from './pages/Logout.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <RequireNoAuth>
              <Login />
            </RequireNoAuth>
          }
        />
        <Route
          path="/logout"
          element={
            <RequireAuth>
              <Logout />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route path="" element={<Overview />} />
          <Route path="collections" element={<Collections />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
