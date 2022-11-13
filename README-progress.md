Hi,

I have started by cloning the repository on my computer, then I read the instructions and what was already setup.

Then I've been thinking about the ui, the layout and how to organise the conversion list with the messages.
I wanted something similar to the WhatsApp web version:
![WhatsApp web version](https://thehackernews.com/images/-EUxmg4d_AZc/VMANFw5h2oI/AAAAAAAAhiM/5XhiQpJp3rk/w0/Whatsapp-web-app.png)

## Setup

I set up in first place different libraries to help me during the code process:

## Layout

My first problematic was to adapt the sider bar (conversations container, left part) with the current conversation (
right panel).

I have started to create both component in mobile version, I couldn't use the router for this version.
For instance if I used the router ([Next version](https://nextjs.org/docs/routing/introduction#index-routes)) I had to
create two page component files and handle when the user is on mobile: just render the conversation list first, then
when user select one, redirect him/her on the selected conversation, it means two pages.
And for the web behavior I had to display both in the same time.

I decided to create only one page and hide the sider when the screen is large enough to render both component (sider &
conversation) with a simple animation. It was easier to implement because there is only one solution to implement
without handling if the router must be involved or not.

## Tests

I created four tests to show different test I could create with my components for the `ConversationElement` component.

## Create a new conversation

During the process of creating the new conversation, I decided to create a new route `pages/contact` with
a random list of contact, where user will be able to create a new conversation, selecting one.
In same time I refactored the conversation system by adding the current one to the router instead of the context.

TODO

- [x] Add at least one/two unit test
- [x] Add a snapshot test
- [x] Add a smoke test


