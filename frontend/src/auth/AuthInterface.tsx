export interface AuthInterface {
    token : string,
    login : (username: string, password: string) => Promise<void>,
    logout: () => void
}