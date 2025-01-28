import React, { useEffect, useState } from "react";
// import { useReducer } from "react";
// import { useQuery } from "react-query";

// import Cookies from "universal-cookie";
import axios from "axios";
import useFetch from "../hooks/useFetch";

// const SUCCESS = "SUCCESS";
// const FAILED = "FAILED";
// const PANDDING = "PANDDING";
// const initialState = {
//   isLoading: false,
//   isError: null,
//   data: "",
//   statusCode: undefined,
// };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case PANDDING:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isError: null,
//         data: action.payload,
//         statusCode: action.statusCode,
//       };
//     case FAILED:
//       return {
//         ...state,
//         isLoading: false,
//         isError: action.payload,
//         data: "",
//         statusCode: action.statusCode,
//       };
//     default:
//       return state;
//   }
// };

export const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return React.useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { mutation } = useFetch();
  const [authLoading, setAuthLoading] = useState(true);
  const [isFristRender, setIsFristRender] = useState(true);
  const [loggedin, setLoggedIn] = useState(false);
  const [routine, setRoutine] = useState(null);

  const logout = async () => {
    if (currentUser) {
      await mutation.mutateAsync({
        url: `auth/logout`,
        method: "delete",
      });

      setCurrentUser(null);
      localStorage.removeItem("isIn");
      window.location.replace("/");
    }
  };
  const getRefreshToken = async () => {
    await axios({
      method: "get",
      url: `${import.meta.env.VITE_SERVER_URL}/api/auth/refresh_token`,
      withCredentials: true,
    })
      .then(() => {
        if (!loggedin) {
          setLoggedIn(true);
        }
      })
      .catch(() => {
        if (!isFristRender) {
          logout();
          setCurrentUser("");
          localStorage.removeItem("isIn");
        }
      });
  };

  useEffect(() => {
    const isIN = localStorage.getItem("isIn");
    if (isFristRender) {
      setIsFristRender(false);
      return;
    }

    if (isIN) {
      getRefreshToken();
    }
  }, [isFristRender]);

  useEffect(() => {
    const getProfile = async () => {
      await axios({
        url: `${import.meta.env.VITE_SERVER_URL}/api/auth/get_profile`,
        method: "GET",
        withCredentials: true,
      })
        .then((data) => {
          const token = data.data.payload;
          setCurrentUser((prevState) => {
            return {
              ...prevState,
              ...token,
              avatar: token.avatar
                ? `data:image/jpg;base64, ${token.avatar}`
                : "/images/default.jpg",
            };
          });
        })

        .catch((error) => {
          console.log(error);
        });
    };
    const isIN = localStorage.getItem("isIn");
    if (loggedin && isIN) {
      getProfile();
    }

    // setCurrentUser((prevState) => {
    //   return {
    //     ...prevState,
    //     ...token,
    //     avatar: token.avatar
    //       ? `data:image/jpg;base64, ${token.avatar}`
    //       : defaultImage,
    //   };
    // });
  }, [loggedin]);

  useEffect(() => {
    if (!isFristRender) {
      const refreshToken = setInterval(() => {
        if (currentUser) {
          getRefreshToken();
        }
      }, 50000);
      return () => {
        clearInterval(refreshToken);
      };
    }
  }, [isFristRender, currentUser]);

  useEffect(() => {
    if (localStorage.getItem("isIn")) {
      if (currentUser) {
        setAuthLoading(false);
      }
    } else {
      setAuthLoading(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    logout,
    authLoading,
    routine,
    setRoutine,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
