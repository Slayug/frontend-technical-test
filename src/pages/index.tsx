import type {FC} from 'react'
import styles from '../styles/Home.module.css'
import WelcomeConversation from "../components/welcomeConversation/WelcomeConversation";

const Home: FC = () => {

  return (
    <div className={styles.container}>
      <WelcomeConversation/>
    </div>
  )
}

export default Home
