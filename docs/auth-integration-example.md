// Update your App.tsx or main app component
import AuthInitializer from './components/auth/AuthInitializer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Wrap your main app content with AuthInitializer
function App() {
  return (
    <AuthInitializer>
      {/* Your existing app content */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-goal" 
          element={
            <ProtectedRoute>
              <AddGoal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/goals/list" 
          element={
            <ProtectedRoute>
              <GoalsList />
            </ProtectedRoute>
          } 
        />
        {/* Add ProtectedRoute to other protected routes */}
      </Routes>
    </AuthInitializer>
  );
}

export default App;