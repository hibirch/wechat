// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})
const db = cloud.database(); 
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('post').where({openId:event.openid}).get()
}