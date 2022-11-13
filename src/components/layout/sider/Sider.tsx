import {useQuery} from "@tanstack/react-query";
import {UserContext} from "../../../contexts/UserContext";
import {useContext, useState} from "react";
import {fetchConversationListByUserId} from "../../../api/ConversationApi";
import ConversationElement from "../../conversationElement/ConversationElement";

import classNames from "classnames";

import styles from './Sider.module.scss'
import SiderHeader from "./SiderHeader";
import {DoubleRightOutlined} from "@ant-design/icons";
import SiderContextProvider from "./SiderContext";
import Link from "next/link";

export default function Sider() {

  const [isOpen, setIsOpen] = useState(true);
  const {userId} = useContext(UserContext);

  const {data: conversations, isLoading} = useQuery({
    queryKey: ['conversations', userId],
    queryFn: ({queryKey}) => fetchConversationListByUserId(userId)
  })

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false)
  }

  return <SiderContextProvider open={open} close={close}>
    <div className={styles.asideWrapper}>
      <aside className={classNames(styles.sider, "h-screen", "bg-violet-900", {[styles.hide]: !isOpen})}>
        <SiderHeader userId={userId}/>
        <div className={styles.conversationList}>
          {
            conversations && conversations.map((conversation) =>
              <Link href={`/conversation/${conversation.id}`}
                    className={styles.conversation} key={conversation.id}
                    onClick={close}>
                <ConversationElement conversation={conversation}/>
              </Link>
            )
          }
        </div>
      </aside>
      <div className={classNames(styles.controller, {[styles.hideController]: !isOpen})}
           onClick={() => setIsOpen(true)}>
        <DoubleRightOutlined/>
      </div>
    </div>
  </SiderContextProvider>
}
