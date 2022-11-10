// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  db.collection('post').add({
    data: {
      openId: wxContext.OPENID,
      like:0,
      collect:0,
      see:0,
      title:event.title,
      post_content:event.post_content,
      post_image:event.post_image,
      time:event.time
    }
  })
}