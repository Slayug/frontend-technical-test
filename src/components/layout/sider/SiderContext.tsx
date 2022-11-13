import {createContext} from "react";


export type SiderContext = {
  open: () => void,
  close: () => void
}

export const SiderContext = createContext<Partial<SiderContext>>({})

export default function SiderContextProvider(props: SiderContext & { children: JSX.Element }) {

  return <SiderContext.Provider value={props}>
    {props.children}
  </SiderContext.Provider>


}
