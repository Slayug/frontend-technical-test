import {Message} from "../../types/message";

export default function MessageElement({ message }: { message: Message }) {


  return <div>{ message.body }</div>
}
