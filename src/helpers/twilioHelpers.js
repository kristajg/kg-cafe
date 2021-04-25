import superagent from 'superagent';

// export const purchasePhoneNumber = () => {
//   superagent
//     .post('/purchase-available-phone-number')
//     .send({ areaCode: '512' })
//     .set('Accept', 'application/json')
//     .then(res => {
//        console.log('Driver phone number purchased ' + JSON.stringify(res.body));
//        return JSON.stringify(res.body);
//     });
// }

export const handlePickupNow = async (riderUsername, driverUsername) => {
  // initialize conversation between user & driver
  let data;
  await superagent
    .post('/initialize-user-driver-conversation')
    .send({
      riderUsername,
      driverUsername,
    })
    .set('Accept', 'application/json')
    .then(res => {
      console.log('Response from init chat: ' + res.body);
      data = res.body;
    })
    .catch(err => {
      console.log('Error initializing user driver conversation in handlePickupNow ', err);
      data = err;
    })
  console.log('after server responded with answer ', data);
  return data;
}

export const handlePickupLater = () => {
  // IVR solution
  // Pay in advance
}

export const sendMessage = async (conversationSid, message, author) => {
  let data;
  await superagent
    .post('/send-message')
    .send({ conversationSid, message, author })
    .set('Accept', 'application/json')
    .then(res => { data = res.body })
    .catch(err => {
      console.log('Error sending message ', err);
      data = err;
    })
  return data;
}

export const getAllConversationMessages = async (conversationSid) => {
  let data;
  await superagent
    .post('/get-conversation-messages')
    .send({ conversationSid })
    .set('Accept', 'application/json')
    .then(res => {
      data = res.body;
    })
    .catch(err => {
      data = err;
    })
  return data;
}
