import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './css/tailwind.css';
import './css/scrollbar.css';
import './css/background.css';
import Navbar from './components/Navbar';
import { NAVIGATION_LINKS } from './navigation';

export default function App() {
  return (
    <div className="flex flex-row text-white overflow-hidden">
      <Router>
        <header className="h-screen bg-primary">
          <Navbar />
        </header>
        <main className="flex-1 bg-secondary ml-50">
          <Routes>
            {NAVIGATION_LINKS.map((link) => (
              <Route
                key={link.path}
                path={link.path}
                element={<link.element />}
              />
            ))}
          </Routes>
        </main>
      </Router>
    </div>
  );
}
