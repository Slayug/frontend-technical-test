const path = require('path')
const db = require(`${path.dirname(__filename)}/../db.json`)

// Need this middleware to catch some requests
// and return both conversations where userId is sender or recipient
module.exports = (req, res, next) => {
  if (/conversations/.test(req.url) && req.method === 'GET') {
    const userId = req.query?.senderId
    const result = db?.conversations?.filter(
      conv => conv.senderId == userId || conv.recipientId == userId
    )

    res.status(200).json(result)
    return
  } else if (/conversations/.test(req.url) && req.method === 'POST') {
    const recipientId = req.body.recipientId;
    const senderId = req.body.senderId;
    const existingConversation = db?.conversations?.filter((conv) =>
      (conv.recipientId == recipientId || conv.recipientId == senderId)
      &&
      (conv.senderId == recipientId || conv.senderId == senderId)
    );
    if (existingConversation.length === 1) {
      return res.status(200).json(existingConversation[0])
    } else {
      const recipientUser = db?.users?.filter((user) => user.id === recipientId)[0]
      const senderUser = db?.users?.filter((user) => user.id == senderId)[0]
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
        lastMessageTimestamp: Date.now()
      }
    }
  } else if (/messages/.test(req.url) && req.method === 'POST') {
    req.body.timestamp = Date.now()
    req.body.conversationId = req.query.conversationId
  }

  next()
}
