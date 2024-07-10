import MainLayOut from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <>
      <ProtectedRoute>
        <MainLayOut></MainLayOut>
      </ProtectedRoute>
    </>
  );
}

export default App;
