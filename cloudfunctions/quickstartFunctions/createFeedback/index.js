const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
    // await db.createCollection('orders');
    await db.collection('feedbacks').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        feed1: event.data.feed1,
        feed2: event.data.feed2,
        feed3: event.data.feed3,
        feednote: event.data.feednote,
        star: event.data.star,
        userid:event.data.userid,

      }
    });
    return {
      success: true
    };
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    console.log(e)
    return {
      success: true,
      data: 'create collection success'
    };
  }
};
