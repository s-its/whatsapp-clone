const ConversationModel = require("../models/conversationModel");

const getConversation = async (userId) => {
  if (userId) {
    const userConv = await ConversationModel.find({
      $or: [{sender: userId}, {receiver: userId}],
    })
    .populate("messages")
    .populate("sender")
    .populate("receiver")
    .sort({updateAt: -1});

    const conversation = userConv?.map((conv) => {
      const countUnseenMsg = conv.messages?.reduce((prev, msg) => {
        const msgByUserId = msg?.msgByUser?.toString();

        if (msgByUserId != userId) {
          return prev + (msg?.seen ? 0 : 1);
        } else {
          return prev;
        }

      }, 0);
      return {
        _id: conv?.id,
        sender: conv?.sender,
        receiver: conv?.receiver,
        countUnseenMsg: countUnseenMsg,
        lastMsg: conv?.messages[conv.messages?.length -1],
      };
    });
    return conversation;
  }
  else {
      return []
  }
}

module.exports = getConversation