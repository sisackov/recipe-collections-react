import { createContext, useState } from 'react';

const UserContext = createContext({ name: '', token: '', auth: false });

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(UserContext);

    // Login updates the user data with a name parameter
    const handleLogin = (name, token) => {
        setUser(() => ({
            name: name,
            token: token,
            auth: true,
        }));
    };

    // Logout updates the user data to default
    const handleLogout = () => {
        console.log('logging out');
        setUser(() => ({
            name: '',
            token: '',
            auth: false,
        }));
    };

    return (
        <UserContext.Provider
            value={{ user, auth: user.auth, handleLogin, handleLogout }}
        >
            {children}
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider };
