import React, {useState} from "react";

export type UserContextProps = {
  userId: number,
  currentConversationId: number,
  setCurrentConversationId: (id: number) => void
}

export const UserContext = React.createContext<Partial<UserContextProps>>({})

export default function UserContextProvider({
  children,
  currentUserId
}: {
  children: JSX.Element;
  currentUserId: number
}) {
  const [currentConversationId, setCurrentConversationId] = useState(undefined);

  return <UserContext.Provider value={{
    userId: currentUserId,
    setCurrentConversationId,
    currentConversationId,
  }}>
    {children}
  </UserContext.Provider>

}
