import { Route, Routes } from 'react-router-dom';
import { About } from '../pages/About';
import App from '../App';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</>
	);
};
