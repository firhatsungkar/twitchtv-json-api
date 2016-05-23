(function($){
	new Vue({
		el:"#app",
		ready: function(){
			var that = this;
			this.users.map(function(user){

				var userObj = {
					username: null,
					avatar: 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F',
					status: '',
					link: null,
					isOnline: false};

				$.getJSON('https://api.twitch.tv/kraken/users/'+user+'?callback=?', function(data) {
					userObj.username = data.display_name;
					userObj.link = data._links.self;
					if(data.logo) {
						userObj.avatar = data.logo;
					}
				});

				$.getJSON('https://api.twitch.tv/kraken/streams/'+user+'?callback=?', function(data) {
					if(data.stream) {
						userObj.status = data.stream.game + ": " + data.stream.channel.status;
						userObj.isOnline = true;
					} else {
						userObj.isOnline = false;
						userObj.status = "Offline";
					}
				});
				
				that.result.push(userObj);	

			});
		},
		data: {
			search: '',
			status: '',
			users: ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","OgamingSC2","ESL_SC2"],
			example: "some data",
			result:[]
		},
		computed: {
			userOnline: function(){
				var filtered = this.result.filter(function(obj){
					return obj.isOnline == true;
				})

				return filtered;
			},
			userOffline: function(){
				var filtered = this.result.filter(function(obj){
					return obj.isOnline == false;
				})

				return filtered;
			}
		}
	})

	$('.nav-tabs li a').on('click', function(){
		var li = $(this).parent();
		li.siblings().removeClass('active');
		li.addClass('active');
	});
})(jQuery);