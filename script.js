var table = [];
for (var i = 0; i < 9; i++) {
    table[i] = [];
    for (var j = 0; j < 9; j++) {
        table[i][j] = 0;
    }
}

// calculates the position of the bombs on the playing board
var bombs = 10;
while (bombs) {
	var row = Math.floor(Math.random() * 9); 
	var column = Math.floor(Math.random() * 9);
	if (table[row][column] != 9) {
		table[row][column] = 9;
		bombs--; 
	}
}
var remainingBombs = 10;

// generates playing board
function loadTable() {
	for (var i = 0; i < 9; i++) {
		$('#table').append(`
			<tr></tr>
		`)
		for (var j = 0; j < 9; j++) {
			$('#table').append(`
				<td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + + j +`" onmousedown = "checkButton(event, id);"><i class="las la-code"></i></button></td>
			`);
		}
	}
}

// calculates the value of a specific cell
function getBombs(row, column) {
	var closeBombs = 0;
	if (table[row][column - 1] == 9 && (row >= 0 && row <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		closeBombs++;
	}
	if (table[row][column + 1] == 9 && (row >= 0 && row <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		closeBombs++;
	}
	if (table[row - 1][j + 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		closeBombs++;
	}
	if (table[row - 1][column + 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		closeBombs++;
	}
	if (table[row - 1][column - 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		closeBombs++;
	}
	if (table[row + 1][column - 1] == 9 && (row + 1 >= 0 && row + 1<= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		closeBombs++;
	}
	if (table[row - 1][column] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column >= 0 && column <= 8)) {
		closeBombs++;
	}
	if (table[row + 1][column] == 9 && (row + 1 >= 0 && row + 1 <= 8  && column>= 0 && column<= 8)) {
		closeBombs++;
	}
	if (closeBombs != 0) {
		table[row][column] = 1;
	} else {
		table[row][column] = 2;
	}
	return closeBombs;
}

// checks if it is a bomb/not
function checkButton(event, id) {
	var row = Math.floor(parseInt(id) / 10);
	var column = Math.floor(parseInt(id) % 10);
	if (event.buttons == '2') {
		document.getElementById(id).innerHTML = ('🚩');
	} else {
		if (table[row][column] == 9) {
	 		for (var i = 0; i < 9; i++) {
		    	for (var j = 0; j < 9; j++) {
		        	if (table[i][j] == 9) {
		        		var c = i + String(j);
		        		document.getElementById(c).innerHTML = ("💣");
		        		document.getElementById(c).style.background='#E71023';
		        	}
		    	}
			}
		document.getElementById("status").innerHTML = "You lost! Please Restart!";
		document.getElementById("status").style.color = "red";
		} else if (table[row][column] != 9) {
			var bombs = getBombs(row, column);	
			emptySpaces(bombs, row, column);
			//alert(table[row][column]); // primul bug nu merge pt primul si ultimul rand.
		} 		
	}
	return false;
}

// emptys the spaces by game rules
function emptySpaces(bombs, row, column) {
	if (checkGameStatus()) {
		document.getElementById("status").innerHTML = "You won!";
		document.getElementById("status").style.color = "green";
	}
 	var id = row * 10 + column;
	if (table[row][column] == 1) {
		document.getElementById(id).innerHTML = bombs;
		document.getElementById(id).style.background = "green";
	} else if (table[row][column] == 2){
		// al doilea bug: pt unele celule cu nr de bombe closebombs = 0, daca apasam o singura data click, se curata doar o parte din ce trebuie, dar daca dam dublu click, este ok.
		// presupun ca se intampla acest lucru deoarece se executa mai multe functii in acelasi timp, nu mi dau seama de cum ar trebui sa impart logica codului
		document.getElementById(id).innerHTML = ('0');
		document.getElementById(id).style.background = "green";
		// trebuie pusa o conditie ca sa nu calculeze de mai multe ori aceeasi casuta.
		// daca valaorea casutei e 0, calculam nr de bombe si o curatam.
		// apelam functie separata pt nr de bombe si clear space
		var bomb1, bomb2, bomb3, bomb4, bomb5, bomb6, bomb7, bomb8; 
		if (table[row][column + 1] == 0) { 
			bomb1 = getBombs(row, column + 1);
			emptySpaces(bomb1, row, column + 1);
		}
		if (table[row][column - 1] == 0) {
			bomb2 = getBombs(row, column - 1);
			emptySpaces(bomb2, row, column - 1);
		}
		if (table[row - 1][column - 1] == 0) {
			bomb3 = getBombs(row - 1, column - 1);
			emptySpaces(bomb3, row - 1, column - 1);
		}
		if (table[row + 1][column + 1] == 0) {
			bomb4 = getBombs(row - 1, column + 1);
			emptySpaces(bomb4, row - 1, column + 1);
		}
		if (table[row - 1][column] == 0) {
			bomb5 = getBombs(row - 1, column);
			emptySpaces(bomb5, row - 1, column);
		}
		if (table[row + 1][column] == 0) {
			bomb6 = getBombs(row + 1, column);
			emptySpaces(bomb6, row + 1, column);
		}
		if (table[row + 1][column + 1] == 0) {
			bomb7 = getBombs(row + 1, column + 1);
			emptySpaces(bomb7, row + 1, column + 1);
		}
		if (table[row + 1][column - 1] == 0) {
			bomb8 = getBombs(row + 1, column - 1);
			emptySpaces(bomb8, row + 1, column - 1);
		}
	}
	if (checkGameStatus()) {
		document.getElementById("status").innerHTML = "You won!";
		document.getElementById("status").style.color = "green";
	}
}

function checkGameStatus() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
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
