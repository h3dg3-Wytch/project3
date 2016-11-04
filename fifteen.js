$(document).ready(function(){

	var board = setUpBoard();

	//Creates board, and then draw tiles
	$("#shuffle").click(function(){
		board = randomizeGrid(board);
		drawTiles(board);
	});

	//todo generate auto add alerts
	$("#grid").on("click, mouseover", "#0, #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #12, #13, #14, #15", function(){
		if(event.type == "mouseover"){
			alert("Mouse");
		}

		//alert($(this).attr('id'));
	});
	
	




});


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

	
	container.css("background-position", locX + "px " + locY + "px");
	

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

	container.append(numberDiv);
	return container;
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

