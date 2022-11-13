import {render} from "@testing-library/react";
import {conversationPatrickThibaut} from "../../../utils/dataTests/Conversation.data";
import ConversationElement from "../ConversationElement";

import '../../../../jest/moduleMapper/matchMediaMock';

describe("ConversationElement", () => {
  it("renders without crashing", () => {
    render(<ConversationElement conversation={conversationPatrickThibaut}/>);
  });

});
