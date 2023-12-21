import React from "react";
import { IUserProfile } from "@/src/services/auth0/interfaces";

const AuthContext = React.createContext<IUserProfile>({});

export default AuthContext;