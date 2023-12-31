import { ChangeEvent, FC } from 'react';
import { IUser } from '../../utils/interfaces';
import { Auth } from 'firebase/auth';

type LoginFunction = (
  dataUserLogin: { email: string; password: string },
  auth: Auth,
) => void;

interface Props {
  action: () => void | LoginFunction;
  type: 'signIn' | 'signOut';
  dataUserLogin: { email: string; password: string };
  setDataUserLogin: (dataUserLogin: {
    email: string;
    password: string;
  }) => void;
  secondaryAction: () => void;
  user: IUser;
  errorSingIn: boolean;
}

export const ModalSign: FC<Props> = ({
  action,
  type,
  dataUserLogin,
  setDataUserLogin,
  secondaryAction,
  user,
  errorSingIn,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDataUserLogin({ ...dataUserLogin, [name]: value });
  };

  const handleOnSubmit = () => {
    action();
  };
  const renderForm = () => {
    if (type === 'signIn') {
      return (
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            {errorSingIn && (
              <span className="block text-xs font-medium text-red-900">
                No es un usuario registrado. Ponte en contacto con el
                administrador
              </span>
            )}
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleOnSubmit}
              type="button"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Iniciar sesión
            </button>
            <button
              onClick={secondaryAction}
              type="button"
              className="w-full bg-gray-100 text-slate-500 font-semibold py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      );
    }
    if (type === 'signOut') {
      return (
        <div>
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-600">
              Correo Electrónico
            </p>

            <p className="w-full border-2 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400">
              {user.name}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={action}
              type="button"
              className="w-full bg-slate-500 text-white font-semibold py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
            >
              Cerrar sesión
            </button>
            <button
              onClick={secondaryAction}
              type="button"
              className="w-full bg-gray-100 text-slate-500 font-semibold py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="fixed m-2 inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 z-10 bg-black opacity-50 blur"></div>

      <div className="z-20 bg-white p-4 rounded-lg shadow-md w-96">
        <div className="text-center text-xl font-semibold mb-4">
          Iniciar sesión / Cerrar sesión
        </div>
        {renderForm()}
      </div>
    </div>
  );
};
