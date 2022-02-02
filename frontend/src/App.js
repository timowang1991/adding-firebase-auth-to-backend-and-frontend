import './App.css';
import {
    getAuth,
    signInWithPopup,
    onAuthStateChanged,
    getIdToken,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut
} from 'firebase/auth';
import {
    useState,
    useEffect
} from 'react';
import ListOfTodo from './components/ListOfTodo';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {

    const [isAuth, setIsAuth] = useState(false || !!window.localStorage.getItem('auth'));
    const [token, setToken] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (result) => {
            console.log('onAuthStateChanged--', result);
            if (result) {
                setIsAuth(true);
                window.localStorage.setItem('auth', true);
                getIdToken(result).then((idToken) => {
                    console.log('idToken--', idToken);
                    setToken(idToken);
                })
            } else {
                window.localStorage.setItem('auth', false);
                setToken('');
                setIsAuth(false);
            }
        });
    }, []);

    const loginWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            console.log('signInWithPopup--', result);
            if (result) {
                setIsAuth(true);
                window.localStorage.setItem('auth', true);
            } else {
                window.localStorage.setItem('auth', false);
                setToken('');
                setIsAuth(false);
            }
        }).catch((error) => {
            console.log('-- error', error);
            window.localStorage.setItem('auth', false);
            setToken('');
            setIsAuth(false);
        });
    }

    const loginWithFacebook = () => {
        signInWithPopup(auth, facebookProvider).then((result) => {
            console.log('signInWithPopup facebook', result);
            if (result) {
                setIsAuth(true);
                window.localStorage.setItem('auth', true);
            } else {
                window.localStorage.setItem('auth', false);
                setToken('');
                setIsAuth(false);
            }
        }).catch((error) => {
            console.log('-- error', error);
            window.localStorage.setItem('auth', false);
            setToken('');
            setIsAuth(false);
        })
    }

    return (
        <div className = "App" >
            <h1> Google Auth </h1>
            { isAuth ?
                <div>
                    <ListOfTodo token={token} />
                    <button onClick={() => { signOut(auth); }}>Log out</button>
                </div>
                :
                <div>
                    <button onClick={loginWithGoogle}>Login with Google </button>
                    <button onClick={loginWithFacebook}>Login with Facebook </button>
                </div>
            }
        </div>
    );
}

export default App;
