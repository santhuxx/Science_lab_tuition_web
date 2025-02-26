import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from './pages/AdminPanel';
import Home2 from './pages/HomePage';
import 'antd/dist/reset.css'; // Import Ant Design styles


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/home2" element={<Home2 />} />
      </Routes>
    </Router>
  );
}

export default App;
