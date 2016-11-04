$(document).ready(function(){

	var board = setUpBoard();

	//We don't allow users to click the buttons, until they start the game
	var shuffledClick = false;


	//Creates board, and then draw tiles
	$("#shuffle").click(function(){
		shuffledClick = true;
		board = randomizeGrid(board);
		drawTiles(board);
	});


	//todo generate auto add alerts
	$("#grid").on("click mouseleave mouseover", "#0, #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15", function(){
		if(event.type == "mouseover"){
			$(this).css({'color' : "green", 'text-decoration': "underline", "opacity": ".6" });
		}else if(event.type == "mouseout"){
			//reset the class
			$(this).css({'color' : "", 'text-decoration': "", "opacity": ".2" });
		}else{
			if(shuffledClick){
				board = checkAnswer(board, $(this).attr("id"));
			}
		}
	});
});

function checkAnswer(board, tileId){
	for(var i = 0 ; i < board.length; i++){
		for(var j = 0; j < board.length; j++){
			if(board[i][j].index == tileId){
				var x = $("#" + tileId).css('backgroundPositionY');
				var y = $("#" + tileId).css('backgroundPositionX');
				//check swap
				//Todo implement math to check the position and such
				checkswap(board, x, y, i, j, tileId);
			}
		}
	}

	return result;
}

function getPositionOfLastElement(){

}



function assignListeners(){
	for(var i = 0; i < 16; i++){
		$("#grid").on("click", "#"+ toString(i), function(){
			alert(i);
	
		});
	}
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

