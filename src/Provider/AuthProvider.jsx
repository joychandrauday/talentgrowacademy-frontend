import { createContext } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext= createContext(null);

export const AuthProvider=({children})=>{
// create a new user
const createUser = (email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
}
//log in an existing user
const signInUser =(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}


    //pass the information through context api
    const AuthInfo ={
        createUser,
        signInUser,
    }

    return (
        <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
    );
}
export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node,
};