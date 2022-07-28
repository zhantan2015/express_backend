import { secret } from "../app"

const config = {
    SECRET_KEY: secret || 'jta9d2luuq'
}

type AuthenticationRouter = {
    [x: string]: any[]
}

export const AuthenticationRouter: AuthenticationRouter = {
    "GET": ["/logs", "/category"],
    "POST": ["/category", "/article"],
    "PUT": [],
    "DELETE": [],
    "OPTIONS": []
}

export default config