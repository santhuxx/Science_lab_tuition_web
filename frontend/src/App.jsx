import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from './pages/AdminPanel';
import Home2 from './pages/HomePage';
import Tutorials from './pages/Tutorials';
import Practicals from "./pages/Practicals";
import Lessons from "./pages/Lessons";
import About from "./pages/About";
import Contact from "./pages/Contact";
import 'antd/dist/reset.css'; // Import Ant Design styles
import './App.css'; // Import the global CSS file
import NavBar from './components/NavBar'; // Import your NavBar component

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />  {/* Add the NavBar */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/practicals" element={<Practicals />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;