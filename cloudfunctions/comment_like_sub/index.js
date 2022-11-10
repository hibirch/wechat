// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  await db.collection('comment').where({
    _id: event.id
  }).update({
    data: {
      comment_start: db.command.inc(-1)
    }
  })
}