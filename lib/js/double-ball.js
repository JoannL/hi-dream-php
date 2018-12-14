function doubleBall(num){
	var ballArray = [];//±£´æÊý×Ö
	var red = 33,redCount=6;
	var blue = 16;
	for(var i=0;i<num;i++){
		var ball = [];
		while(ball.length<redCount){
			while(true){
				var n = JTools.random(red);
				if(!ball.isContains("num",n)){
					ball.push({
						num:n,
						color:"red"
					});
					break;
				}
			}
		}
		
		var esc = function(x,y){  
			return (x["num"] > y["num"]) ? 1 : -1  
		}  
		ball.sort(esc);
		ball.push({
			num:JTools.random(blue),
			color:"blue"
		});
		ballArray.push(ball);
	}
	return ballArray;
	/**for(var index in ballArray){
		for(var i in ballArray[index]){
			var ball = ballArray[index][i];
			$("#show").append("<span class="+ball.color+">"+ball.num+"</span>");
		}
		$("#show").append("</br>");
	}**/
}
	