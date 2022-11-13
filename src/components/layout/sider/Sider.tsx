import {useQuery} from "@tanstack/react-query";
import {UserContext} from "../../../contexts/UserContext";
import {Fragment, useContext, useState} from "react";
import {fetchConversationListByUserId} from "../../../api/ConversationApi";
import ConversationElement from "../../conversationElement/ConversationElement";

import classNames from "classnames";

import styles from './Sider.module.scss'
import {Conversation} from "../../../types/conversation";
import SiderHeader from "./SiderHeader";
import {DoubleRightOutlined} from "@ant-design/icons";

export default function Sider() {

  const [isOpen, setIsOpen] = useState(true);
  const {userId, setCurrentConversationId} = useContext(UserContext);

  const {data: conversations, isLoading} = useQuery({
    queryKey: ['conversations', userId],
    queryFn: ({queryKey}) => fetchConversationListByUserId(userId)
  })

  function selectConversation(conversation: Conversation) {
    setCurrentConversationId(conversation.id)
    setIsOpen(false);
  }

  return <Fragment>
    <div className={styles.asideWrapper}>
      <aside className={classNames(styles.sider, "h-screen", "bg-violet-900", {[styles.hide]: !isOpen})}>
        <SiderHeader userId={userId}/>
        <div className={styles.conversationList}>
          {
            conversations && conversations.map((conversation) =>
              <div className={styles.conversation} key={conversation.id} onClick={() => selectConversation(conversation)}>
                <ConversationElement conversation={conversation}/>
              </div>
            )
          }
        </div>
      </aside>
      <div className={classNames(styles.controller, {[styles.hideController]: !isOpen})}
           onClick={() => setIsOpen(true)}>
        <DoubleRightOutlined/>
      </div>
    </div>
  </Fragment>

}
