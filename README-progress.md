Hi,

I have started by cloning the repository on my computer, I have started to read what was already setup.

Then a got a reflection stage about the ui, the layout and how to organise the conversion list with the messages.
I wanted finally something similar to the WhatsApp web version:
![WhatsApp web version](https://thehackernews.com/images/-EUxmg4d_AZc/VMANFw5h2oI/AAAAAAAAhiM/5XhiQpJp3rk/w0/Whatsapp-web-app.png)

My first problematic was to adapt the sider bar (conversations container, left part) with the current conversation (
right panel).

I have started to create both component in mobile version, I couldn't use the router for this version.
For instance if I used the router ([Next version](https://nextjs.org/docs/routing/introduction#index-routes)) I had to
create two page component files and handle when the user is on mobile: just render the conversation list first, then
when user select one, redirect him/her on the selected conversation.
And for the web behavior I had to display both in the same time.

I decided to create only one page and hide the sider when the screen is large enough to render both component (sider &
conversation) with a simple animation. It was easier to implement because there is only one solution to implement
without handling if the router must be involved or not.

TODO

- [ ] Add at least one/two unit test
- [ ] Add a snapshot test
- [ ] Add a smoke test


