export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        if (Date.now() > decoded.exp * 1000) {
            localStorage.removeItem("token");
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};

export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return JSON.parse(atob(token.split(".")[1])).role;
    } catch (error) {
        return null;
    }
};
