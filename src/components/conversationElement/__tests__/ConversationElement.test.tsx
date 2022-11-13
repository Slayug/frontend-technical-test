import {render, screen} from "@testing-library/react";
import {conversationElodieThibaut, conversationPatrickThibaut} from "../../../utils/dataTests/Conversation.data";
import ConversationElement from "../ConversationElement";
import renderer from "react-test-renderer";

import '../../../../jest/moduleMapper/matchMediaMock';
import UserContextProvider from "../../../contexts/UserContext";
import {Conversation} from "../../../types/conversation";

/**
 * Current user is Thibaut with first ID
 * @param conversation
 */
function renderWithContext(conversation: Conversation) {
  return <UserContextProvider currentUserId={1}>
    <ConversationElement conversation={conversation}/>
  </UserContextProvider>
}

describe("ConversationElement", () => {
  it("renders without crashing", () => {
    render(renderWithContext(conversationPatrickThibaut));
  });

  test("component snapshot", () => {
    const tree = renderer.create(renderWithContext(conversationElodieThibaut)).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct nickname when remote is recipient', () => {
    render(renderWithContext(conversationPatrickThibaut));
    expect(
      screen.getByText(conversationPatrickThibaut.recipientNickname)
    ).toBeInTheDocument()

  });

  it('should render correct nickname when remote is sender', () => {
    render(renderWithContext(conversationElodieThibaut));
    expect(
      screen.getByText(conversationElodieThibaut.senderNickname)
    ).toBeInTheDocument()

  });
});
