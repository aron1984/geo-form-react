import {FC, useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {IItems} from '../../utils/interfaces';
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {useGeoStore} from '../../store/store';
import {ModalSign} from '../ModalSign';
import {NavbarPresenter} from './NavbarPresenter';

interface Props {
  items: IItems[]
}

export const Navbar: FC<Props> = ({items}) => {
  const SUPER_USER = import.meta.env.VITE_SUPER_USER_ADMIN;
  const presenter = new NavbarPresenter(SUPER_USER);

  const location = useLocation();
  const {
    user,
    isLogged,
    setUser,
    setIsLoggedIn,
    setIsLoggedOut,
    setShowLoadingSpiner,
  } = useGeoStore();
  const [dataUserLogin, setDataUserLogin] = useState({
    email: '',
    password: '',
  });
  const [showModalSign, setShowModalSign] = useState(false);
  const [showErrorSignIn, setShowErrorSignIn] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const userCurrent = auth.currentUser;
    if (userCurrent !== null) {
      // const displayName = user.displayName;
      // const uid = userCurrent?.uid;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;
      const email = userCurrent?.email;
      setUser({name: email, profile: presenter.userProfile(email)});
      setIsLoggedIn();
    }
  }, []);

  const login = () => {
    setShowLoadingSpiner(true);
    signInWithEmailAndPassword(
      auth,
      dataUserLogin.email,
      dataUserLogin.password,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        const userName = user.email;

        setUser({
          name: userName,
          profile: presenter.userProfile(userCredential?.user?.email),
        });
        setIsLoggedIn();
        setShowErrorSignIn(false);
        setShowModalSign(false);
      })
      .catch((error) => {
        setShowErrorSignIn(true);
        console.error(error.code);
        console.error(error.message);
        return;
      })
      .finally(() => {
        setShowLoadingSpiner(false);
      });
  };

  const logOut = () => {
    setShowLoadingSpiner(true);
    signOut(auth).then(() => {
      setUser({name: '', profile: 'visitor'});
      setIsLoggedOut();
    })
      .catch((error) => {
        console.error('Error al cerrar sesión: ', error);
      })
      .finally(() => {
        setShowModalSign(false);
        setShowLoadingSpiner(false);
      });
  };

  const handleClick = () => {
    setShowModalSign(true);
  };

  const hideModal = () => {
    setShowModalSign(false);
  };

  return (
    <>
      <div className="bg-slate-800 h-10 md:h-20 shadow-lg w-full z-50 fixed">
        <div className="flex h-full items-center justify-end">
          <img
            src="/img/g-logo_myv.svg"
            alt="Geo Form"
            className="px-2 h-6 mr-auto md:pl-5 md:h-8"
          />
          <ul className="flex gap-2 h-full ">
            {items.map(({id, path}) => (
              <li
                key={id}
                className={
                  location.pathname === path
                    ? 'flex items-center px-3 text-cyan-300 font-semibold text-xs md:text-lg'
                    : 'flex items-center px-3 text-slate-300 font-semibold hover:text-emerald-400 text-xs md:text-lg'
                }
              >
                <Link to={path}>{id.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
          <img
            src={
              user.name?.length
                ? '/img/user-masc.png'
                : '/img/user-masc-none.png'
            }
            alt={user.name?.length ? user.name : 'No logueado'}
            className="px-2 ml-2 md:ml-3 h-6 pl-2 md:pl-3 md:h-8"
            style={{borderLeft: 'solid 1px gray'}}
            onClick={handleClick}
          />
        </div>
      </div>
      {showModalSign && (
        <ModalSign
          action={!isLogged ? login : logOut}
          secondaryAction={hideModal}
          type={isLogged ? 'signOut' : 'signIn'}
          dataUserLogin={dataUserLogin}
          setDataUserLogin={setDataUserLogin}
          user={user}
          errorSingIn={showErrorSignIn}
        />
      )}
    </>
  );
};
