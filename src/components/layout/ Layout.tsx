import {AppProps} from "next/app";
import Sider from "../sider/Sider";


export default function Layout({ Component, pageProps }: AppProps) {

  return <div className="w-screen flex bg-green-600">
    <Sider />
    <Component {...pageProps} />
  </div>
}
