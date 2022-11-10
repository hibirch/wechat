Component({
	data: {
		active: 0,
		list: [
			{
				normal: 'home-o',
				active: '/images/home_.png',
				text: '首页',
				url: '/pages/home/home'
			},
			{
				normal: 'home-o',
				active: '/images/home_.png',
				text: '空间',
				url: '/pages/space/space'
			},
			{
				normal: 'manager-o',
				active: '/images/me_.png',
				text: '我的',
				url: '/pages/me/me'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
