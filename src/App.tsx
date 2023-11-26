import './App.css';
import 'tailwindcss/tailwind.css';
import 'leaflet/dist/leaflet.css';
import { Map } from './components/Map/';
import { Layout } from './components/layout';
import { Form } from './components/Form';
import Spinner from './components/Spinner/Spinner';
import { useGeoStore } from './store/store';

function App() {
  const { loadingSpinner } = useGeoStore();

  return (
    <Layout title={'home'}>
      <Map />
      <div className="flex flex-col justify-center items-center gap-5 m-auto mt-auto mb-auto h-96 p-0">
        <Form />
      </div>

      {loadingSpinner && <Spinner color="save" data={'Loadings'} />}
    </Layout>
  );
}

export default App;
