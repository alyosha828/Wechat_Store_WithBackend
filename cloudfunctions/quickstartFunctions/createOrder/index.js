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
    await db.collection('orders').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        animalcount: event.data.animalcount,
        checkintext: event.data.checkintext,
        checkouttext: event.data.checkouttext,
        enddate: event.data.enddate,
        imageurl: event.data.imageurl,
        roomdetail: event.data.roomdetail,
        roomname: event.data.roomname,
        roomprice1: event.data.roomprice1,
        roomprice2: event.data.roomprice2,
        setprice:event.data.setprice,
        setroomcount:event.data.setroomcount,
        setanimalcount:event.data.setanimalcount,
        note: event.data.note,
        sizedetail: event.data.sizedetail,
        startdate: event.data.startdate,
        status: event.data.status,
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
