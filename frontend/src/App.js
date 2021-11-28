import './App.css';
import {
    getAuth,
    signInWithPopup,
    onAuthStateChanged,
    getIdToken,
    GoogleAuthProvider,
    signOut
} from 'firebase/auth';
import {
    useState,
    useEffect
} from 'react';
import ListOfTodo from './components/ListOfTodo';

const auth = getAuth();
const provider = new GoogleAuthProvider();

function App() {

    const [gAuth, setGAuth] = useState(false || !!window.localStorage.getItem('auth'));
    const [token, setToken] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (result) => {
            console.log('onAuthStateChanged--', result);
            if (result) {
                setGAuth(true);
                window.localStorage.setItem('auth', true);
                getIdToken(result).then((idToken) => {
                    console.log('idToken--', idToken);
                    setToken(idToken);
                })
            } else {
                window.localStorage.setItem('auth', false);
                setToken('');
                setGAuth(false);
            }
        });
    }, []);

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log('signInWithPopup--', result);
            if (result) {
                setGAuth(true);
                window.localStorage.setItem('auth', true);
            } else {
                window.localStorage.setItem('auth', false);
                setToken('');
                setGAuth(false);
            }
        }).catch((error) => {
            console.log('-- error', error);
            window.localStorage.setItem('auth', false);
            setToken('');
            setGAuth(false);
        })
    }

    return (
        <div className = "App" >
            <h1> Google Auth </h1>
            { gAuth ?
                <div>
                    <ListOfTodo token={token} />
                    <button onClick={() => { signOut(auth); }}>Log out</button>
                </div>
                :
                <button onClick={loginWithGoogle}>Login with Google </button>
            }
        </div>
    );
}

export default App;
