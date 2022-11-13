const path = require('path')
const jsonServer = require("json-server");

const dbPath = `${path.dirname(__filename)}/../db.json`
const router = jsonServer.router(dbPath)


// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  const db = router.db;
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId
    if (userId) {
      const conversations = db.get('conversations').value();
      const result = conversations.filter(
        conv => conv.senderId == userId || conv.recipientId == userId
      )

      res.status(200).json(result)
      return
    }
  } else if (/conversations/.test(req.url) && req.method === 'POST') {
    const recipientId = req.body.recipientId;
    const senderId = req.body.senderId;
    const conversations = db.get('conversations').value();
    const existingConversation = conversations.filter((conv) =>
      (conv.recipientId == recipientId || conv.senderId == recipientId)
      &&
      (conv.senderId == senderId || conv.recipientId == senderId)
    );
    if (existingConversation.length === 1) {
      return res.status(200).json(existingConversation[0])
    } else {
      const recipientUser = db.get('users').find({id: recipientId}).value()
      const senderUser = db.get('users').find({id: senderId}).value()
      if (recipientUser == undefined || senderUser === undefined) {
        return res.status(404).jsonp({
          error: "Users not found"
        });
      }
      req.body = {
        recipientId,
        senderId,
        recipientNickname: recipientUser.nickname,
        senderNickname: senderUser.nickname,
        lastMessageTimestamp: Date.now() / 1000
      }
    }
  } else if (/messages/.test(req.url) && req.method === 'POST') {
    req.body.timestamp = Date.now() / 1000
    req.body.conversationId = req.query.conversationId
  }

  next()
}
