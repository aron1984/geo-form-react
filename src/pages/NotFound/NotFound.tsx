import { Layout } from '../../components/layout';

export const NotFound = () => {
  return (
    <Layout title="notfound" subtitle="Página inexistente">
      <div className="flex flex-col absolute top-24 md:top-40 w-full h-auto justify-center items-center">
        <div className="flex flex-col w-full md:w-824 h-80 md:h-630 items-center justify-center py-20 mt-20 md:mt-0 text-slate-800">
          <h1 className="text-9xl ">404</h1>
          <h6 className="text-2xl font-bold">Ooops! Page not found</h6>
        </div>
      </div>
    </Layout>
  );
};
