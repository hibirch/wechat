// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "cloud1-2glgw1abc00b0ea7"
})

// 云函数入口函数
exports.main = async (event) => {
  const wxContext = cloud.getWXContext()

  db.collection('user').where(event.openId).updata({
    data: {
      nickName: event.nickName,
      avatar: event.avatar
    }
  })
}