import {render} from "@testing-library/react";
import {conversationPatrickThibaut} from "../../../utils/dataTests/Conversation.data";
import ConversationElement from "../ConversationElement";
import renderer from "react-test-renderer";

import '../../../../jest/moduleMapper/matchMediaMock';

describe("ConversationElement", () => {
  it("renders without crashing", () => {
    render(<ConversationElement conversation={conversationPatrickThibaut}/>);
  });

  test("component snapshot", () => {
    const tree = renderer.create(<ConversationElement conversation={conversationPatrickThibaut}/>).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
