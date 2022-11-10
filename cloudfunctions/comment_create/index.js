// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {

  db.collection('comment').add({
    data: {
      comment_avatar: event.avatar,
      comment_nickName: event.nickName,
      comment_time: event.time,
      comment_start: event.start,
      comment_id: event.id,
      comment_openid: event.openid,
      comment_content: event.content
    }
  })
}