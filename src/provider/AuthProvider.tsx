"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";




const AuthProvider = ({children}:{children:ReactNode}) => {

    return  <SessionProvider children={children}></SessionProvider>
};

export default AuthProvider;