import type {FC} from 'react'
import styles from '../styles/Home.module.css'
import ConversationWrapper from "../components/conversationWrapper/ConversationWrapper";

const Home: FC = () => {


  return (
    <div className={styles.container}>
      <ConversationWrapper/>
    </div>
  )
}

export default Home
