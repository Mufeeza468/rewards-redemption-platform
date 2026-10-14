import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import History from "./pages/History";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;