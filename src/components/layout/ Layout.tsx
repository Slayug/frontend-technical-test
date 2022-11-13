import {AppProps} from "next/app";
import Sider from "./Sider";


export default function Layout({ Component, pageProps }: AppProps) {

  return <div className="container">
    <Sider />
    <Component {...pageProps} />
  </div>
}
