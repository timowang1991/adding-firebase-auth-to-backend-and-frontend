import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import { useEffect, useState } from 'react';

const auth = getAuth();

export default function EmailPasswordAuth() {
    const [eAuth, setEAuth] = useState();

    useEffect(() => {
        onAuthStateChanged(auth, (result) => {
            console.log('ep onAuthStateChanged---', result);
            if (result) {
                setEAuth(true);
            } else {
                setEAuth(false);
            }
        });
    }, [])

    const signup = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('email----', email);
        console.log('password----', password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('createUserWithEmailAndPassword result---', result);
                setEAuth(true);
            })
            .catch((error) => {
                console.log('createUserWithEmailAndPassword error---', error);
                setEAuth(false);
            });
    };

    const signin = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('signInWithEmailAndPassword result---', result);
                setEAuth(true);
            })
            .catch((error) => {
                console.log('signInWithEmailAndPassword error---', error);
                setEAuth(false);
            });
    }

    const inputFields = (
        <div>
            email: <input id="email" type="text" style={{ display: 'block' }} />
            password: <input id="password" type="password" style={{ display: 'block' }} />
            <button onClick={signin}>Log in</button>
            <button onClick={signup}>Sign up</button>
        </div>
    );
    return (
        <div style={{ margin: '100px auto', 'inline-size': 'fit-content' }}>
            <h1>Email Password Auth</h1>
            { eAuth ?
                <div>signed in
                    <div><button onClick={() => { signOut(auth); }}>Log out</button></div>
                </div>
                :
                inputFields
            }
        </div>
    );
}