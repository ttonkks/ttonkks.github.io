import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Goals from './components/Goals/Goals';
import Progress from "./components/Progress/Progress";
import Community from "./components/Community/Community";
import Footer from './components/Footer/Footer';
import GoalDetails from './components/GoalDetails/GoalDetails';

function App() {
  return (
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Goals />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/comunity" element={<Community />} />

        <Route path="/goal/:id" element={<GoalDetails />} />
      </Routes>
        <Footer />
    </Router>
  );
}

export default App;
