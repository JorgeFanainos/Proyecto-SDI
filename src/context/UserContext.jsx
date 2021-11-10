import { useState, useEffect, createContext } from "react";
import { auth, db } from "../firebaseApp";
import { getFirstElementArrayCollection } from "../parser";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = async (user, uid) => {
    await db.collection("users").doc(uid).set(user);
  };

  const createUserPsico = async (user, uid) => {
    await db.collection("usersPsicologos").doc(uid).set(user);
  };

  const getUserByEmail = async (email) => {
    const usersReference = db.collection("users");
    const snapshot = await usersReference.where("email", "==", email).get();

    if (!snapshot.size) return null;

    const loggedUser = getFirstElementArrayCollection(snapshot);

    return loggedUser;
  };

  const getUserByEmailPsico = async (email) => {
    const usersReference = db.collection("usersPsicologos");
    const snapshot = await usersReference.where("email", "==", email).get();

    if (!snapshot.size) return null;

    const loggedUserPsico = getFirstElementArrayCollection(snapshot);

    return loggedUserPsico;
  };

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged(async (loggedUser) => {
      if (loggedUser) {
        const profile = await getUserByEmail(loggedUser.email);

        if (!profile) {
          const newProfile = {
            name: loggedUser.displayName,
            lastname: "",
            email: loggedUser.email,
            gender: "",
            phoneNumber: "",
          };
          await createUser(newProfile, loggedUser.uid);
          setUser(newProfile);
        } else {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
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
        createUserPsico,
        getUserByEmailPsico,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
