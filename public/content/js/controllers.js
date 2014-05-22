/*
	Controllers
*/
app.controller('mainCtrl', MainController);

app.controller('syncCtrl', SyncController);

app.controller('formCtrl', FormController);


// This controller is for creating a new Ticket
function SyncController($scope, $http){
	//$scope.synclink = "https://www.syncit.io/sync/A4GIEXM72G469VBE3";
	$scope.isReady = false;

	$scope.isAvailable = function($identifier){
		if($identifier == undefined){
			return false;
		}

		$http.get('api/check', {params : {
			identifier : $identifier
		}})
		.success(function(data, status, headers, config){
			console.log(typeof(data));
			if(data == "true"){
				console.log("This name can be used!");
				$scope.status = "This name is valid!";
				$('#availableStatus').removeClass('invisible failure').addClass('success');

				// If valid lets also change the synclink
				$scope.isReady = true;
				$scope.getSync();

			}else{
				console.log("This name cannot be used!");
				$scope.status = "This name is already in use!";
				$('#availableStatus').removeClass('invisible success').addClass('failure');
			}
		})
		.error(function(data, status, headers, config){
			console.log(data);
		});
	}


	$scope.getSync = function(){
		$http.get('api/sync', {params : {
				nameId : $scope.identifier
			}})
		.success(function(data, status, headers, config){
			console.log(data);
			$scope.synclink = "https://www.syncit.io/sync/"+data.reference;
		})
		.error(function(data, status, headers, config){
			console.log(data);
			console.log(status);
			$scope.synclink = "Error: Could not process you a SyncLink";
		});
	}



};


function MainController($scope){

}

function FormController($scope){

}