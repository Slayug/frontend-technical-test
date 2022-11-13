import React from "react";

export type UserContextProps = {
  userId: number,
}

export const UserContext = React.createContext<Partial<UserContextProps>>({})

export default function UserContextProvider({
                                              children,
                                              currentUserId
                                            }: {
  children: JSX.Element;
  currentUserId: number
}) {

  return <UserContext.Provider value={{
    userId: currentUserId,
  }}>
    {children}
  </UserContext.Provider>

}
