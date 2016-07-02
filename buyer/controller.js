var app = angular.module('mainApp',["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "pro_display.html"
    })
    .when("/dis", {
        templateUrl : "discription.html"
    })
    .when("/cart", {
        templateUrl : "cart.html"
    })
    .otherwise( {
        redirectTo : "/"
    });
});


app.controller('buyer',function($scope,$location,$http){
	var i;
	var arr=[];
	var a=[];
	var cart=[]; 
	
	
	
	
	var user="mit";
	
	var x=0;

	for(var j=0;j< localStorage.length;j++){
								
							var temp = localStorage.key(j) ;
							var res=temp.split("=");
							
							if(res[0] == user){
								
									cart[x]=localStorage.getItem(temp);
									x++;
	
							}
							
	}
						

	
	
	
	
	
	$http.get('http://localhost/ng-intern/pro-list.json')
	.success(function(response){

	arr	=	response.myArray;
		
		$scope.list = arr;
	});
	
	$scope.display=function(pid){
		
		for(i=0;i<4;i++){
			
			if(arr[i].pId==pid)
			{
				a[0]=arr[i];
			}
		}	
		$scope.personss = a;
			
	}
	
	$scope.addcart=function(pid){
			var k=0,m=0;
			for(var j=0;j<cart.length;j++){
				if(cart[j]==pid){
				m=1;
				}			
			}

			if(m==0){
				while((typeof cart[k] !== 'undefined') && (cart[k]!=-1)){
						k++;
				}
				
				cart[k]=pid;
				localStorage.setItem(user+"="+k,pid);
			}
			
	}
	
	$scope.removecart=function(pid){
		var k=0;
		while(cart[k]!==pid){
			k++;
		}
		cart[k]=-1;
		localStorage.setItem(user+"="+k,-1);
			
	
	}
	
	$scope.mycart=function(){
		var ab=[];
		var total=0.00;
		var k=0,j,m=0;
			
		for(k=0;k<cart.length;k++)
		{			
		if(cart[k]!=-1){
				for(j=0	;j<arr.length;j++){
					if(cart[k]==arr[j].pId){
						ab[m]=arr[j];
							m++;
						total=parseFloat(arr[j].pPrice)+total;
					}
				}
			}
		}
		$scope.total=total;
		console.log(total);
		$scope.sc = ab;
		
	}
	
});
