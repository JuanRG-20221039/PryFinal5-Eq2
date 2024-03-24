import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import AppRouter from "./routes/AppRouter";
import Layout from "./layouts/Layout";


function App() {
  return (
    <div>
      <Router>
      <AuthProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
