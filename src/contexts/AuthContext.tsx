import { createContext, ReactNode, useEffect, useState } from "react"
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router"
import { api } from "../services/apiClient";

type User = {
    id?: string;
    name?: string;
    lastname?: string;
    email: string;
    avatar?: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    user: User;
    setProfileUser: () => void
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
    destroyCookie(undefined, "super-price.token")
    destroyCookie(undefined, "super-price.refreshToken")

    if (broadcast) {
        authChannel.postMessage('signOut');
    }

    Router.push("/signin")
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'super-price.token': token } = parseCookies();

        if (token) {
            api.get("/users/profile")
                .then(response => {
                    const { id, name, lastname, email, avatar_url } = response.data;

                    setUser({
                        id,
                        name,
                        lastname,
                        email,
                        avatar: avatar_url
                    })
                }).catch(() => {
                    signOut();
                })
        }
    }, [])

    useEffect(() => {

        authChannel = new BroadcastChannel("auth");

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case "signOut":
                    signOut(false);
                    break;
                case 'signIn':
                    const { 'super-price.token': token } = parseCookies()
                    if (token) {
                        Router.push('/dashboard')
                    }
                default:
                    break
            }
        }
    }, [])

    async function signIn({ email, password }: SignInCredentials) {

        const response = await api.post("/sessions", {
            email,
            password
        })

        const { user, token, refresh_token } = response.data

        setCookie(undefined, "super-price.token", token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/"
        });

        setCookie(undefined, "super-price.refreshToken", refresh_token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/"
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`

        authChannel.postMessage('signIn')

        await setProfileUser();

        Router.push("/dashboard");

    }

    async function setProfileUser() {
        api.get("/users/profile")
            .then(response => {
                const { id, name, lastname, email, avatar_url } = response.data;

                setUser({
                    id,
                    name,
                    lastname,
                    email,
                    avatar: avatar_url
                })
            })
    }

    return (
        <AuthContext.Provider value={{ signOut, signIn, isAuthenticated, user, setProfileUser }} >
            {children}
        </AuthContext.Provider>
    )
}