// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})
const db = cloud.database()

exports.main = async (event, context) => {
  return await db.collection('comment').where({comment_id: event.id}).get()
}