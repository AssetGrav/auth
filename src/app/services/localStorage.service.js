
const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPRESS_KEY = "jwt-express";

export function setTokens({ refreshToken, idToken, expiresIn }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPRESS_KEY, expiresDate);
};
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
};
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
};
export function getTokenExpiresDate() {
    return localStorage.getItem(EXPRESS_KEY);
};
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
