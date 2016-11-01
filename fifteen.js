$(document).ready(function(){
	//Place jquery here
	setUpBoard();
});

function setUpBoard(){
	//we need the context in order to start drawing. 
	var context = document.getElementById("board").getContext("2d");
	var img = new Image();
	img.src = "images/vapor.jpg";
	//img.addEventListener('load', drawTiles, false);

	var boardSize = $("#board").width();
	var tileSize = boardSize / 4; 
	var boardParts = new Object;
	setPieces();
}

function setPieces(){
	var randomvalues 
}

function generateRandomArray(){

	var result = [];
    for(var i = 0; i < 16; i++){
     	result[i] = i;
    } 

    result.sort(function() {
      return Math.random() - .5;
    });

    return result;

}


