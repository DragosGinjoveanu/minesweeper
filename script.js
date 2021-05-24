var table = [];
for (var i = 1; i <= 11; i++) {
    table[i] = [];
    for (var j = 1; j <= 11; j++) {
        table[i][j] = 0;
    }
}

//puts one bomb on the playing board
function loadBomb() {
	var row = Math.floor(Math.random() * 9 + 2);
	var column = Math.floor(Math.random() * 9 + 2);
	if (table[row][column] == 0) {
		table[row][column] = 9;
	} else if (table[row][column] == 9) {
		loadBomb();
	}
}

// generates playing board
function loadTable() {
	for (var i = 2; i <= 10; i++) {
		$('#table').append(`
			<tr></tr>
		`)
		for (var j = 2; j <= 10; j++) {
			$('#table').append(`
				<td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + " " + j +`" onmousedown = "checkButton(event, id);"><i class="las la-code"></i></button></td>
			`);
		}
	}
	//generates all the bombs
	for (var i = 1; i <= 10; i++) {
		loadBomb();
	}
}

// checks if it is a bomb/not
function checkButton(event, id) {
	//gets row/column from id
	var n = '', rowCopy, columnCopy;
	for (var i = 0; i < id.length; i++) {
		n += id.charAt(i);
		if (id.charAt(i) == ' ') {
			rowCopy = n;
			n = '';
		}
	}
	columnCopy = n;
	var row = parseInt(rowCopy);
	var column = parseInt(columnCopy);
	if (event.buttons == '2') {
		document.getElementById(id).innerHTML = ('🚩');
	} else {
		if (table[row][column] == 9) {
	 		for (var i = 2; i <= 10; i++) {
		    	for (var j = 2; j <= 10; j++) {
		        	if (table[i][j] == 9) {
		        		var c = i + " " + j;
		        		document.getElementById(c).innerHTML = ("💣");
		        		document.getElementById(c).style.background='#E71023';
		        	}
		    	}
			}
		document.getElementById("status").innerHTML = "You lost! Please Restart!";
		document.getElementById("status").style.color = "red";
		} else {
			var bombs = calcBombs(row, column);
			emptySpaces(row, column, bombs);
		} 		
	}
	return false;
}

function calcBombs(row, column) {
	var nrBombs = 0;
	for (var i = row - 1; i <= row + 1; i++) {
		for (var j = column - 1; j <= column + 1; j++) {
			if (table[i][j] == 9) {
				nrBombs++;
			}
		}
	}
	return nrBombs;
}

function emptySpaces(row, column, bombs) {
 	if (table[row][column] == 0) {
 		if (bombs != 0) {
 			document.getElementById(row + " " + column).innerHTML = bombs;
 			document.getElementById(row + " " + column).className = "btn btn-success btn-lg";
 			table[row][column] = 1;
 		} else {
 			document.getElementById(row + " " + column).innerHTML = ("0");
 			document.getElementById(row + " " + column).className = "btn btn-success btn-lg";
 			table[row][column] = 2;
 			for (var i = row - 1; i <= row + 1; i++) {
 				for (var j = column - 1; j <= column + 1; j++) {
 					var nrBombs = calcBombs(i, j);
 					emptySpaces(i, j, nrBombs);
 				}
 			}
 		}
 	}
 	if (checkGameStatus()) {
 		document.getElementById("status").innerHTML = "You won!";
 		document.getElementById("status").style.color = "green";
 	}
 }

function checkGameStatus() {
	for (var i = 2; i <= 10; i++) {
		for (var j = 2; j <= 10; j++) {
			if (table[i][j] == 0) {
				return 0;
			}
		}
	}
	return 1;
}

function restartGame() {
	location.reload();
}
