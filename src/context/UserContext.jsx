import { useState, useEffect, createContext } from "react";
import { auth, db } from "../utils/firebaseApp";
import { getFirstElementArrayCollection } from "../utils/parser";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);

  const createUser = async (user, uid) => {
    await db.collection("users").doc(uid).set(user);
  };

  const getUserByEmail = async (email) => {
    const usersReference = db.collection("users");
    const snapshot = await usersReference.where("email", "==", email).get();

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  const resetPassword = async (email) => {
    await auth.sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    setloading(true);
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);

        if (profile) {
          setUser(profile);
        }
      } else {
        console.log("nada");
        setUser(null);
      }

      setloading(false);
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        createUser,
        getUserByEmail,
        resetPassword,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
