import type {AppProps} from 'next/app'
import {getLoggedUserId} from '../utils/getLoggedUserId'
import '../styles/globals.css'
import Layout from "../components/layout/ Layout";
import UserContextProvider from "../contexts/UserContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {setupApi} from "../api/Api";

// Default way to get a logged user
export const loggedUserId = getLoggedUserId()

setupApi()
const queryClient = new QueryClient();

function MyApp(props: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <UserContextProvider currentUserId={loggedUserId}>
      <Layout {...props} />
    </UserContextProvider>
  </QueryClientProvider>
}

export default MyApp
