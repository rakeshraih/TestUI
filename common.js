$( document ).ready(function() {

  $('#divRound1').click(function(){

  	 	if($(this).hasClass("rotating")){
     		  return false;
   		}
  	   $(this).addClass("rotating");
       roateLoading($(this));
  });


  function roateLoading(elem){
//	elem = $(".rotateImage:visible");

	$({deg: 0}).animate({deg: 360}, {
	    duration: 500,
        easing: "linear",
	    step: function(now){
	        elem.css({
	             transform: "rotate(" + now + "deg)",
	             marginLeft : "+=1px"
	        });
	    },
   	  complete: function () {
   		if($(elem).hasClass("rotating")){
     		  roateLoading(elem);
   		}
   		checkCollisions();
   	  }
	});
}

function getPositions(box) {
  var $box = $(box);
  var pos = $box.position();
  var width = $box.width();
  var height = $box.height();
  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}
        
function comparePositions(p1, p2) {
  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}

function checkCollisions(){
  var box = $(".bomb")[0];
  var pos = getPositions(box);

  var pos2 = getPositions(this);
  var horizontalMatch = comparePositions(pos[0], pos2[0]);
  var verticalMatch = comparePositions(pos[1], pos2[1]);            
  var match = horizontalMatch && verticalMatch;
  if (match) { $("body").append("<p>COLLISION !!!</p>"); }
}

//http://jsfiddle.net/ryanoc/TG2M7/

});