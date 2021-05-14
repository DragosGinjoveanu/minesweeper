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

// generates playing board
function loadTable() {
	for (var i = 0; i < 9; i++) {
		$('#table').append(`
			<tr></tr>
		`)
		for (var j = 0; j < 9; j++) {
			$('#table').append(`
				<td><button type="button" class="btn btn-secondary" id = "` + i + + j +`" onclick = "checkButton(id);"><i class="las la-skull-crossbones"></i></i></button></td>
			`);
		}
	}
}

// calculates the value of a specific cell
function calcValue(row, column) {
	if (table[row][column - 1] == 9 && (row >= 0 && row <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row][column + 1] == 9 && (row >= 0 && row <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row - 1][j + 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row - 1][column + 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row - 1][column - 1] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row + 1][column - 1] == 9 && (row + 1 >= 0 && row + 1<= 8  && column - 1 >= 0 && column - 1 <= 8)) {
		table[row][column]++;
	}
	if (table[row - 1][column] == 9 && (row - 1 >= 0 && row - 1 <= 8  && column >= 0 && column <= 8)) {
		table[row][column]++;
	}
	if (table[row + 1][column] == 9 && (row + 1 >= 0 && row + 1 <= 8  && column>= 0 && column<= 8)) {
		table[row][column]++;
	}
}

// checks if it is a bomb/not
function checkButton(id) {
	var row = Math.floor(parseInt(id) / 10);
	var column = Math.floor(parseInt(id) % 10);
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
		calcValue(row, column); // aflu valoarea unei celule.
		emptySpaces(id, table[row][column], row, column);
	}
	return false;
}

// emptys the spaces by game rules
function emptySpaces(id, cellValue, row, column) {
	if (cellValue != 0) {
		document.getElementById(id).innerHTML = cellValue;
		document.getElementById(id).style.background = "green";
	}

}

function restartGame() {
	location.reload();
}
