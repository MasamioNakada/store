import { useState, useEffect, createContext } from "react";

import { auth, firebase } from "../config/Firebase";

//para poder ejecutar las funciones de ingresar, salir y ver el estado del login
export const AuthContext = createContext();

const proveedorGoogle = new firebase.auth.GoogleAuthProvider();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const signIn = async () => {
        //para loguearte abre una ventanita. signInWithPopup(proveedor)
        const rptaGoogle = await auth.signInWithPopup(proveedorGoogle);
        console.log(rptaGoogle);
    };
    //deslogueo
    const signOut = () => auth.signOut();

    useEffect(() => {
        //en caso el usuario ingrese o salga de la app, se va a disparar a esta funcion para ver que hay
        //si no esta loguado o si sale, retornará null
        // si se loguea retornará un objeto
        return auth.onAuthStateChanged((user) => {
            //user es null( no loguado) , o es un objeto(loguado)
            setUser(user)
        })
    })

    return (
        <AuthContext.Provider
            // value es lo que va a brindar desde su estado global
            value={{ user, signIn, signOut }}
        >
            {/* Provider va a funcionar como una caja generica transparente, componente genérico que va a contener otros componentes pero sin saber exactamente que componentes son */}
            {props.children}
        </AuthContext.Provider>
    );
};
