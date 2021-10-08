import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import Swal from "sweetalert2";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";

/*export const login = (uid, displayName) => {
    return {
        type: types.login
    }
}*/
export const startLoginEmailPasswords = (email, password) => {
    return (dispatch) => {
        /*setTimeout(() => {
            dispatch(login(123, 'edwin'))
        }, 3500);*/
        dispatch(startLoading());
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then( ({user}) => {
            console.log(user);
            dispatch(finishLoading());
            dispatch(login(user.uid, user.displayName));
        }).catch((e) => {
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        })
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider).then(({user}) => {
            dispatch(login(user.uid, user.displayName));
        });
    }
}

export const startRegisterWithEmailPasswordName = (email, pass, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, pass).then( async ({user}) => {
            await updateProfile(auth.currentUser, {displayName: name});
            dispatch(
                login(user.uid, user.displayName)
            );
        }).catch( e => {
            console.log(e);
            Swal.fire('Error', e.message, 'error');
        })
    }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid, 
        displayName
    }
}); 

export const startLogout = () => {
    return async ( dispatch ) => {
        const auth = getAuth();
        signOut(auth);
        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout,
})