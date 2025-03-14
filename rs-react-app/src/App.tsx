import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ReactHookForm from './pages/ReactHookForm';
import UncontrolledForm from './pages/UncontrolledForm';
import './App.css';

export default function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center' }}>
        <h1>
          <Link to="/" className="HeaderLinkText">
            React forms
          </Link>
        </h1>
        <hr />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      </Routes>
    </Router>
  );
}
