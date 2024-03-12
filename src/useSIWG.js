import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase.config";
import { useContext } from "react";
import { CampContext } from "../ContextProvider";

export default function useGoogleSI(data) {
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
                // IdP data available using getAdditionalUserInfo(result)
                if (data == 'inst') {
                    contxtData.setInstructor(true);
                    localStorage.setItem('scs-ins-id', 'user-inst');
                }
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