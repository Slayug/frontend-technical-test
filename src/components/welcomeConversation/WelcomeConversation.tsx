import {AliwangwangOutlined} from "@ant-design/icons";

import styles from './WelcomeConversation.module.scss'

export default function WelcomeConversation() {

  return <div className={styles.welcomeConversation}>
    <AliwangwangOutlined/>
    <p>Select a conversation ⬅️</p>
  </div>
}
