import { createContext, useEffect, useState } from "react";
import Axios from "../Utils/Axios";
// import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const response = await Axios.get('/vendeur/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUserData(null);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await Axios.post('/login/vendeur', {
        email_or_phone: identifier,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const { token, user } = response.data.data;
        localStorage.setItem('token', token);
        setUserData(user);
        setIsLoggedIn(true);
      } else {
        throw new Error('Erreur de connexion')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };


  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await Axios.post('/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem('token');
      }
      setUserData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const isAuthenticated = () => {
    return isLoggedIn;
  };

  const getCurrentUser = () => {
    return userData;
  };

  const contextValue = {
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    setUserData,
    setIsLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
