import { Route, Routes } from 'react-router-dom';
import { About } from '../pages/About';
import App from '../App';
import { Places } from '../pages/Places';
import { NotFound } from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/places" element={<Places />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
