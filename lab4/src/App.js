import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Goals from './components/Goals/Goals';
import Community from "./components/Community/Community";
import Footer from './components/Footer/Footer';
import GoalDetails from './components/GoalDetails/GoalDetails';

import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Goals />} />
            <Route path="/community" element={<Community />} />
            <Route path="/goal/:id" element={<GoalDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
