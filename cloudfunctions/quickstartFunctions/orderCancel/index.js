const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {

  try {
    // 遍历修改数据库信息
      await db.collection('orders').where({
        _id: event.data
      }).update({
          data: {
            status: 2
          },
        });
    return {
      success: true
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};
