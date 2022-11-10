// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database();

  await db.collection('user').add({
    data: {
      openId: wxContext.OPENID,
      collect: 0,
      fans: 0,
      like: 0,
      explain:"",
    }
  })

  return wxContext.OPENID
}