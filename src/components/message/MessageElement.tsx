import {Message} from "../../types/message";

import styles from './Message.module.scss';
import {UserContext} from "../../contexts/UserContext";
import {useContext} from "react";
import classNames from "classnames";

export default function MessageElement({message}: { message: Message }) {
  const {userId} = useContext(UserContext);

  return <div className={classNames(styles.message, {[styles.me]: userId === message.authorId})}>
    {message.body}
  </div>
}
