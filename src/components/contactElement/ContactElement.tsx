import styles from "./ContactElement.module.scss"
import {Avatar} from "antd";

export default function ContactElement({nickname, data}: { nickname: string, data?: JSX.Element }) {

  return <div className={styles.contactElement}>
    <Avatar
      src={`https://joeschmoe.io/api/v1/${nickname}`}
      shape="circle"
      style={{width: "4.5em", height: "4.5em", backgroundColor: 'white'}}
    />
    <div className={styles.info}>
      <span className={styles.nickname}>{nickname}</span>
      {data}
    </div>
  </div>
}
