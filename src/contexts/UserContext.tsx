import React, {useState} from "react";

export type UserContextProps = {
  userId: number,
  setUserId: (id: number) => void
}

export const UserContext = React.createContext<Partial<UserContextProps>>({})

export default function UserContextProvider({children, currentUserId}: {
  children: JSX.Element;
  currentUserId: number
}) {

  const [userId, setUserId] = useState(currentUserId);

  return <UserContext.Provider value={{
    userId,
    setUserId
  }}>
    {children}
  </UserContext.Provider>

}
