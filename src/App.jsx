import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPage from './pages/FormPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* FormPage now handles /:formId by defaulting to standard variant */}
        <Route path="/:formId" element={<FormPage />} />
        <Route path="/:formId/:variant" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
