var user="mit";
var a=[];
var index=[];

var x=0;

 //localStorage.clear();

for(j=0;j< localStorage.length;j++){
								
							var temp = localStorage.key(j) ;
							console.log("-->temp="+temp);
							var res=temp.split("=");
							console.log("res="+res[0]);
							//localStorage.removeItem(temp);
							if(res[0] == user){
								
									a[x]=localStorage.getItem(temp);
									index[x]=j;		
									console.log("a["+x+"]="+a[x]);
									//console.log("a"+a[x]);
									x++;
									console.log("x is"+x);
	
							}
							
	}
						
					
					
function detail(i,arr) {
				
			out='<tr><th><img height=100 width=100" src="'+arr[i].pImage+'"/></th><th>'+arr[i].pName+'</th></tr><tr><td>Size</td><td>'+arr[i].pDis.size+'</td></tr><tr><td>Color</td><td>'+arr[i].pDis.color+'</td></tr><tr><td>Product Id</td><td>'+arr[i].pId+'</td></tr><tr><td>Selle Id</td><td>'+arr[i].sId+'</td></tr><tr><td>Price (Rs.)</td><td>'+arr[i].pPrice+'</td></tr><tr><td><button onclick="addcart('+i+')">ADD TO CART</button></td><td><button  onclick="removecart('+i+')">REMOVE FROM CART</button></td></tr>'
			
			document.getElementById("id01").innerHTML = out;
}

function addcart(i){
		
	var k=0;
	var j=0;
	var m=0;
	
	
	for(j=0;j<a.length;j++){
		if(a[j]==i){
			m=1;
		}
		
	}
	while((typeof a[k] !== 'undefined') && (a[k]!=-1)){
			
		k++;
	
	}

	if(m==0)
	{
		a[k]=i;
			
		localStorage.setItem(user+"="+k,i);
			
		document.getElementById("d").innerHTML = "a["+k+"]="+a[k]+"length="+a.length +"localStorage="+localStorage.getItem(localStorage.key(0));
	}	
	
}

function removecart(i){
	var j;
	
	for(j=0;j<a.length;j++){
		if(a[j]==i){
			a[j]=-1;
			
			localStorage.setItem(user+"="+j,-1);
		}
		
	}
}
	
function mycart(arr){
	
	var total=0;
	var j;
	var out="";
	
	for(j=0;j<a.length;j++)
	{	
		var k=a[j];
		console.log("k="+k);
	
	if( k != -1){
		       out+='<tr><td><img height=100 width=100" onclick="detail('+k+',myArray)" src="'+arr[k].pImage+'"/></td><td>'+arr[k].pName+'</td><td>'+arr[k].pId+'</td><td>'+arr[k].sId+'</td><td>'+arr[k].pPrice+'</td></tr>';
						var t=parseInt(arr[k].pPrice);
						total=total+t;
		
	}	
 }
	
		out="<tr><th>Image</th><th>Product Name</th><th>Product Id</th><th>Seller Id</th><th>Price(Rs.)</th></tr>"+out+"<tr><td></td><td></td><td></td><td>Total</td><td>"+total+"</td></tr>";
		
					document.getElementById("id01").innerHTML = out;
		
}	