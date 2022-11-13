import ContactElement from "../../components/contactElement/ContactElement";
import styles from './contact.module.scss'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchUserList} from "../../api/UserApi";
import {UserContext} from "../../contexts/UserContext";
import {useContext} from "react";
import {postConversation} from "../../api/ConversationApi";
import {Conversation, ConversationPostDto} from "../../types/conversation";
import {AxiosResponse} from "axios";
import {useRouter} from "next/router";

export default function Contact() {

  const {userId} = useContext(UserContext);
  const router = useRouter()
  const queryClient = useQueryClient()

  const {data: contacts} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserList
  });

  const mutateConversation = useMutation({
    mutationFn: (conv: ConversationPostDto) => postConversation(conv),
  })

  function goToContactConversation(remoteUserId: number) {
    mutateConversation.mutate({
      recipientId: remoteUserId,
      senderId: userId,
    }, {
      onSuccess: (response: AxiosResponse<Conversation>) => {
        // cleaning current user conversation list
        queryClient.invalidateQueries(['conversations', userId])
        router.push(`/conversation/${response.data.id}`)
      },
    });
  }

  return <div className={styles.contacts}>
    {
      contacts && contacts.map((contact) => {
        return <div key={contact.id} className={styles.contact} onClick={() => goToContactConversation(contact.id)}>
          <ContactElement nickname={contact.nickname}/>
        </div>
      })
    }
  </div>
}
