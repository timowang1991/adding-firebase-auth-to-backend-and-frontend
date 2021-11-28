import './App.css';
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
  GoogleAuthProvider
} from 'firebase/auth';
import { useState, useEffect } from 'react';
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
      }
    });
  }, []);

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log('signInWithPopup--', result);
      if (result) {
        setGAuth(true);
        window.localStorage.setItem('auth', true);
      }
    }).catch((error) => {
      console.log('-- error', error);
    })
  }

  return (
    <div className="App">
      <h1>Google Auth</h1>
      { gAuth ?
        <ListOfTodo token={token} />
        :
        <button onClick={loginWithGoogle}>Login with Google</button>
      }
    </div>
  );
}

export default App;
