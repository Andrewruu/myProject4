import React, {useState, useEffect} from "react";

// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const updateUser = (updatedUserData) => {

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
    .then((r) => {
      if (!r.ok) {
        throw new Error("Failed to update user fund.");
      }
      return r.json()
    })
    .then((data)=>
    {
      setUser(data)
    })
    .catch((error) => {
      console.error('Error updating user fund:', error);
    });
  };

  return <UserContext.Provider value={{user, setUser, updateUser}}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };