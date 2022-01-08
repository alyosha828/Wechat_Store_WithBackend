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
    await db.collection('users').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        sign: event.data.sign,
        name: event.data.name,
        url: event.data.url,
        level: event.data.level,
        sublevel: event.data.sublevel,
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
