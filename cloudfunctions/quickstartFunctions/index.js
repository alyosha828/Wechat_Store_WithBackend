const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const createCollection = require('./createCollection/index');
const selectRecord = require('./selectRecord/index');
const updateRecord = require('./updateRecord/index');
const sumRecord = require('./sumRecord/index');

const getStores = require('./getStores/index');
const createOrder = require('./createOrder/index');
const getOrders = require('./getOrders/index');
const orderCancel = require('./orderCancel/index');
const createFeedback = require('./createFeedback/index');
const getLevels = require('./getLevels/index');
const addUser = require('./addUser/index');
const getUserInfo = require('./getUserInfo/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context);
    case 'createCollection':
      return await createCollection.main(event, context);
    case 'selectRecord':
      return await selectRecord.main(event, context);
    case 'updateRecord':
      return await updateRecord.main(event, context);
    case 'sumRecord':
      return await sumRecord.main(event, context);
    case 'getStores':
      return await getStores.main(event, context);
    case 'createOrder':
      return await createOrder.main(event, context);
    case 'getOrders':
      return await getOrders.main(event, context);
    case 'orderCancel':
      return await orderCancel.main(event, context);
    case 'createFeedback':
      return await createFeedback.main(event, context);
    case 'getLevels':
      return await getLevels.main(event, context);
    case 'addUser':
      return await addUser.main(event, context);
    case 'getUserInfo':
      return await getUserInfo.main(event, context);
  }
};
