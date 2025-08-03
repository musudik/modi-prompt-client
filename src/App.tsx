import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PromptGenerator from './components/PromptGenerator';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<PromptGenerator />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;