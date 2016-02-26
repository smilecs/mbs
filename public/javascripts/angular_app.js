var app = angular.module('mbs', ['chart.js','ngRoute', 'ngCookies']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/new_user', {
		controller:'NewUserCtrl',
        templateUrl:'../register.html'
	}).when('/view', {
		controller: 'ViewPCtrl',
		templateUrl:'../patient_list.html'
	}).when('/addservice',{
		controller:'AddSerCtrl',
		templateUrl:'../add_service.html'
	}).when('/report/:id', {
		controller:'ReCtrl',
		templateUrl:'../p_reciept.html'
	}).when('/new_reciept/:id/:my', {
		controller:'new_repCtrl',
		templateUrl:'../reciept.html'
	}).when('/reciept/:id', {
		controller: 'recieptCtrl',
		templateUrl:'../reciept_view.html'
	}).when('/',{
	controller: 'DashCtlr',
	templateUrl: '../dashboard.html'
	});
}]);

app.controller('DashCtlr', function($scope, $http){
	var map = {};
	$scope.bank_name = [];
	var transaction = 0;
	$scope.map = [];
	  var amount = 0;
	$scope.bank_amount = [];
	$http.get('/users/dashboard').success(function(data){
		for(var i = 0; i < data.length; i++){
			for(var k= 0; k< data[i].rep.length; k++){
				var dat = data[i].rep;
				if(!(dat[i].name in map)){
						map[dat[i].name] = parseInt(dat[i].amount);
					transaction++;
				}else {
					map[dat[i].name] += parseInt(dat[i].amount);
					transaction++;
				}
			}
	}
	for (var ii in map){
	$scope.bank_name.push(ii);
	$scope.bank_amount.push(map[ii]);
	$scope.map.push({name: ii, amount:map[ii]});
	amount += map[ii];
}

$scope.amount = amount;
$scope.trans = transaction;
	});




});

app.controller('new_repCtrl',function($scope, $http, $routeParams, $location){
	$scope.service = {};
	$scope.result = [];
	$scope.add = function(data){
		  console.log(data);
		$scope.result.push(data);
		console.log($scope.result);
		$http.post('/users/newrep/'+$routeParams.id, data).success(function(data){
		  console.log(data);
		});
};
	$http.get('/users/service').success(function(data){
		console.log(data);
		$scope.service = data;
	});


		$scope.save = function(){
			var data = $scope.result;
			$http.post('/users/newrep/'+$routeParams.id+'/'+$routeParams.my, data).success(function(data){
			  console.log(data);
			});
	};

});

app.controller('recieptCtrl',function($scope, $http, $routeParams, $location){
$scope.user = {};
$scope.result = {};
$scope.total = [];
$http.get('/users/final_report/'+$routeParams.id).success(function(data){
//	console.log(data);
	$scope.result = data;
	var amount = 0;
	for(var i= 0; i<data.rep.length; i++){
		//console.log(data.rep[i].amount);
		var tmp = parseInt(data.rep[i].amount);
		amount = tmp + amount;
		console.log(tmp);
		console.log(amount);
	}
	console.log(amount);
	$scope.total.push(amount);
	//console.log($scope.total);
	$http.get('/users/user/'+data.user).success(function(data){
		//console.log(data);
		$scope.user = data;
	});
});

});

app.controller('ReCtrl',function($scope, $http, $routeParams, $location){
$scope.user = {};
$scope.result = {};
$http.get('/users/report/'+$routeParams.id).success(function(data){
	console.log(data);
	$scope.result = data;
});
$scope.add = function(){
	$http.post('/users/new_rep/').success(function(data){
	  console.log(data);
		$location.path('/new_reciept/'+data._id+'/'+$routeParams.id);

	});
};
});

app.controller('NewUserCtrl',function($scope, $http, $routeParams){
$scope.user = {};
$scope.addser = function(data){
	$http.post('/users/register/', data).success(function(data){
	  console.log(data);
		$scope.user = {};
	});
};
});

app.controller('AddSerCtrl',function($scope, $http, $routeParams){
$scope.service = {};
$scope.result = {};
$http.get('/users/service').success(function(data){
	console.log(data);
	$scope.result = data;
});

$scope.addUser = function(data){
	$scope.result.push(data);
	$http.post('/users/add_item/', data).success(function(data){
	  console.log(data);
	});
};
});

app.controller('ViewPCtrl',function($scope, $http, $routeParams){
$scope.result = {};
$http.get('/users/patients/').success(function(data){
	console.log(data);
	$scope.result = data;
});
});
