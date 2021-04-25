require('dotenv').config();

// 3rd party libraries
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');

// constants
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// twilio imports
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const conversationInit = async (conversationName, riderUsername, driverUsername) => {
  // TODO: make sure a binding for participant and proxy don't already exist for conversation id CHXXXXX
  // Create conversation
  let conversationData;
  return client.conversations.conversations
    .create({ friendlyName: conversationName })
    .then(conversation => conversation.sid)
    .then(conversationSid => {
      // Get conversation by Sid
      return client.conversations.conversations(conversationSid).fetch();
    })
    .then(conversation => {
      console.log('Conversation created yo: ', conversation);
      conversationData = conversation;
      // Add driver participant by phone number(s)
      // The driver's phone number will never be visible to the rider since they will only see messages through the app
      return client.conversations.conversations(conversation.sid)
        .participants
        .create({
          'messagingBinding.address': '+', // Hehe that's my phone number I'm baby driver
          'messagingBinding.proxyAddress': process.env.TWILIO_PHONE_NUMBER_ONE,
        });
    })
    .then(participant => {
      // Add the rider participant
      return client.conversations.conversations(participant.conversationSid)
        .participants
        .create({ identity: riderUsername });
    })
    .then(participant => {
      return conversationData;
    })
    .catch(err => {
      console.log('error initializing conversation: ', err);
      return err;
    });
}

const deleteConversation = conversationSid => {
  client.conversations.conversations(conversationSid)
  .remove()
  .catch(err => {console.log('err deleting conversation', err)});
};

// create conversation
app.post('/initialize-user-driver-conversation', (req, res) => {
  const { riderUsername, driverUsername } = req.body;
  conversationInit('TestConnectUserToTaxiDriver', riderUsername, driverUsername)
  .then(conversationData => {
    res.json(conversationData);
  });
});

// send message from rider
app.post('/send-message', (req, res) => {
  const { conversationSid, message, author } = req.body;
  client.conversations.conversations(conversationSid)
    .messages
    .create({ author, body: message })
    .then(message => {
      console.log(message.sid)
      res.json(message);
    })
    .catch(err => {
      console.log('err sending message ', err);
      res.json(err);
    });
});

app.post('/purchase-available-phone-number', (req, res) => {
  client.availablePhoneNumbers('US').local.list({
    areaCode: req.body.areaCode,
    voiceEnabled: true,
    smsEnabled: true
  })
  .then(searchResults => {
    console.log('search results ', searchResults);
    // if (searchResults.availablePhoneNumbers.length === 0) {
    //   throw { message: 'No numbers found with that area code' };
    // }
    // return client.incomingPhoneNumbers.create({
    //   phoneNumber: searchResults.availablePhoneNumbers[0].phoneNumber,
    //   voiceApplicationSid: config.applicationSid,
    //   smsApplicationSid: config.applicationSid
    // });
  })
  // .then(number => {
  //   return number.phone_number;
  // })
  .catch(err => {
    console.log('error purchasing number ', err);
  });
});

app.post('/get-conversation-messages', (req, res) => {
  client.conversations.conversations(req.body.conversationSid)
    .messages
    .list({ limit: 20 })
    .then(messages => {
      res.json(messages);
    })
    .catch(err => {
      res.send(err);
    });
});

http.createServer(app).listen(8009, () => {
  console.log('Express server listening on port 8009');
});
