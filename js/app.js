angular.module('twitchStatusApp', [])

.controller('mainCtrl', ['$scope', '$http', function($scope, $http){

    // $scope.comster404ID = "";
    // $scope.brunofinID = "";
    $http.defaults.headers.common['Accept'] = "application/vnd.twitchtv.v5+json";
    $http.defaults.headers.common['Client-ID'] = $scope.clientID;
	$scope.twitchUsers = [$scope.freecodecampID, $scope.etchTheSketchID, $scope.soXViciousID, $scope.dexterityBonusID, $scope.patrickRothfussID, $scope.feliciaDayID, $scope.shaBooZeyID, $scope.monsterCatID, $scope.totalBiscuitID, $scope.crendorID, $scope.comster404ID, $scope.brunofinID];
	$scope.userData =[];


	for(i=0; i < $scope.twitchUsers.length; i++){
		$scope.user = $scope.twitchUsers[i];
		console.log($scope.user);
		$http.get("https://api.twitch.tv/kraken/streams/" + $scope.user).success(function(data){
			if(data.stream == null){
				console.log("offline")
				$http.get(data._links.channel).success(function(info){
					console.log(info);
					var name = info.display_name;
					var avatar = info.logo;
					var game = "Offline";
					var status = "Offline";
					var userInfo = {name: name , game: game, avatar: avatar, status: status}
					// $scope.userData.push(userInfo);
				    // console.log($scope.userData);
				})
			} else {
				var channel = data.stream.channel;
				var name = channel.display_name;
				var game = channel.game;
				var avatar = channel.logo;
				var status = "Online";
				var userInfo = {name: name , game: game, avatar: avatar, status: status}
			    $scope.userData.push(userInfo);	
			    console.log($scope.userData);
			}
		}).error(function(error){
			console.log(error)
			var name = error.message.split("'")[1];
			console.log("name " + name);
			var avatar = "img/notwitch.png";
			var game = "No Account";
			var status = "Offline";
			var userInfo = {name: name , game: game, avatar: avatar, status: status}
			$scope.userData.push(userInfo);
			// console.log($scope.userData);	
		})

	};
}])



