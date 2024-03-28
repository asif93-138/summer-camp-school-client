import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.config";
import { useContext } from "react";
import { CampContext } from "../ContextProvider";


export default function useGoogleSI() {
    const contxtData = useContext(CampContext);
    function siwG() {
        
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                const userObj = {id: user.uid, name: user.displayName, email: user.email};
                fetch(`http://localhost:3000/user/${user.uid}`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(userObj)
                })
                .then(res => res.json())
                .then(resData => localStorage.setItem('scs-access-token', resData.token))
                // IdP data available using getAdditionalUserInfo(result)

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return siwG;
}