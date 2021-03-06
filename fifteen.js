$(document).ready(function(){

	var board = setUpBoard();

	//We don't allow users to click the buttons, until they start the game
	var shuffledClick = false;
	var solved = false;

	//YOUR TIMER FUNCTION GOES HERE
	//setTimeout(function(){
		//function here
	//}, time to you lose right here );


	//Creates board, and then draw tiles
	$("#shuffle").click(function(){
		shuffledClick = true;
		board = randomizeGrid(board);
		drawTiles(board);
		
	});

	$("#demo").click(function(){

		shuffledClick = true;
		board =  createGrid();
		board[2][3].index = parseInt(15);
		board[3][3].index = parseInt(11);
		drawTiles(board); 
		
	});



	//todo generate auto add alerts
	$("#grid").on("click mouseleave mouseover", "#0, #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15", function(){
		if(event.type == "mouseover"){
			$(this).css({'color' : "green", 'text-decoration': "underline", "opacity": ".6" });
		}else if(event.type == "mouseout"){
			//reset the class
			$(this).css({'color' : "", 'text-decoration': "", "opacity": ".2" });
		}else if(event.type == "click"){
			if(shuffledClick){
				console.log(board);
				board = checkAnswer(board, $(this).attr("id"));
				drawTiles(board);
				solved = isSolved(board);
				if(solved){
				//implemnt you won condition, set the inner html of the #grid to something
					console.log("you won");
				}
				
			}
		}
	});

});

function checkAnswer(board, tileId){
	console.log(board);
	for(var i = 0 ; i < board.length; i++){
		for(var j = 0; j < board.length; j++){
			if(board[i][j].index == tileId){
				var x = $("#" + tileId).css('backgroundPositionY');
				var y = $("#" + tileId).css('backgroundPositionX');
				board = checkSwap(board, x, y, i, j, tileId);
				return board;
			}
		}
	}

	return board;
}

function checkSwap(array, x, y, i, j, tileId){
	console.log(array);
	var blankTilePosition = getPositionOfLastElement(array);
	//calculate the distance of the selected tile to the blank tile
	var distanceFromBlankTile = distance(array[blankTilePosition.i][blankTilePosition.j].x,
	 array[blankTilePosition.i][blankTilePosition.j].y,
	 array[i][j].x,
	 array[i][j].y); 
	if(distanceFromBlankTile == 100 && tileId != ((array.length * array.length) - 1 )){
		array[i][j].index = ((array.length * array.length) - 1 );
		array[blankTilePosition.i][blankTilePosition.j].index = parseInt(tileId);
	}
	return array;
}

function distance(x1, y1, x2, y2){
	var math = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) );
	return math;	
}

function getPositionOfLastElement(board){
	var result = new Object;
	for(var i = 0 ; i < board.length; i++){
		for(var j = 0; j < board.length; j++){
			if(board[i][j].index == ((board.length * board.length) -1) ){
				result.i = i;
				result.j = j;
			}
		}
	}
	return result;
}

function setUpBoard(){
	board = createGrid();
	drawTiles(board);
	return board;
}

//Creates inital grid. Storing objects for it to remeber
function createGrid(){
	var x = -300;
	var y = 0;

	var board = new Array(4);
	var index = 0;
	for(var i = 0 ; i < 4; i++){
		board[i] = new Array(4);
		for(var j = 0; j < 4; j++){
			board[i][j] =  new Object;
			board[i][j].x = x;
			board[i][j].y = y;
			board[i][j].index = index;
			x = x + 100;
			index++;
		}
		x = -300;
		y = y + 100;
	}
	return board;
}

//Randomizes the grid
function randomizeGrid(array){
	var randomIndexs = generateRandomArray();	
	var randomIndex = 0;
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			array[i][j].index = randomIndexs[randomIndex];
			randomIndex++;
		}
	}
	return array;
}
function drawTiles(board){
	//Takes each item from grid, then adds the new index
	$("#grid").html("");
	for(var i = 0 ; i < 4; i++){
		for(var j = 0 ; j < 4; j++){
			$("#grid").append(imageTile(board[i][j].index,
				board[i][j].x,
				board[i][j].y ));
		}	
	}
}

function imageTile(index, locX, locY){
	var div = $("<div></div>");
	div.addClass("")
	var container = $("<div></div>");
	container.addClass("imageTile");
	if(index != 15){
		var imageDiv = $("<div></div>");
		imageDiv.addClass("image");
		
		var img = $("<img/>");
		img.attr("src", "images/"+ index + ".jpg");
		imageDiv.append(img);
		container.append(imageDiv);
	}
	var numberDiv = $("<div>"+ (index + 1) + "</div>")
	numberDiv.addClass("numberImage");
	numberDiv.attr('id', index);
	numberDiv.css("background-position", locX + "px " + locY + "px");
	container.append(numberDiv);
	return container;
}
function generateRandomArray(){
	var result = [];
    for(var i = 0; i < 16	; i++){
      	result[i] = i;
    } 
    result.sort(function() {
      return Math.random() - .5;
    });
    return result;
}
function isSolved(board){
	var index = 0;
	for(var i = 0; i < board.length; i++){
		for(var j = 0; j < board[i].length; j++){
			if(board[i][j].index == index){
				index++;
			}else{
				return false;
			}
		}
	}
	return true;
}