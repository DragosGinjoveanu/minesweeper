var table = [];
for (var i = 0; i < 9; i++) {
    table[i] = [];
    for (var j = 0; j < 9; j++) {
        table[i][j] = 0;
    }
}
var bombs = 10;
while (bombs) {
	var row = Math.floor(Math.random() * 9); 
	var column = Math.floor(Math.random() * 9);
	if (table[row][column] != 4) {
		table[row][column] = 4;
		bombs--; 
	}
}

function loadTable() {
	for (var i = 0; i < 9; i++) {
		$('#table').append(`
			<tr></tr>
		`)
		for (var j = 0; j < 9; j++) {
			$('#table').append(`
				<td><button type="button" class="btn btn-secondary" id = "` + i + + j +`" onclick = "checkButton(id);"><i class="las la-power-off"></i></button></td>
			`);
		}
	}
}

function checkButton(id) {
	var row = Math.floor(parseInt(id) / 10);
	var column = Math.floor(parseInt(id) % 10);
	alert(row);
	alert(column);
	if (table[row][column] == 4) {
	 	for (var i = 0; i < 9; i++) {
		    for (var j = 0; j < 9; j++) {
		        if (table[i][j] == 4) {
		        	var c = i + String(j);
		        	document.getElementById(c).innerHTML = ("💣");
		        	document.getElementById(c).style.background='#E71023';
		        }
		    }
		}
		document.getElementById("status").innerHTML = "You lost! Please Restart!";
		document.getElementById("status").style.color = "red";
	} else if (table[row][column] != 4) {
			if (table[row][column - 1] == 4 && (row >= 0 && row <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row][column + 1] == 4 && (row >= 0 && row <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row - 1][j + 1] == 4 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row - 1][column + 1] == 4 && (row - 1 >= 0 && row - 1 <= 8  && column + 1 >= 0 && column + 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row - 1][column - 1] == 4 && (row - 1 >= 0 && row - 1 <= 8  && column - 1 >= 0 && column - 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row + 1][column - 1] == 4 && (row + 1 >= 0 && row + 1<= 8  && column - 1 >= 0 && column - 1 <= 8)) {
				table[row][column]++;
			}
			if (table[row - 1][column] == 4 && (row - 1 >= 0 && row - 1 <= 8  && column >= 0 && column <= 8)) {
				table[row][column]++;
			}
			if (table[row + 1][column] == 4 && (row + 1 >= 0 && row + 1 <= 8  && column>= 0 && column<= 8)) {
				table[row][column]++;
			}
			//alert(table[row][column]);
		document.getElementById(id).innerHTML = table[row][column];
		document.getElementById(id).style.background = "green";
	} 
	if (row == 8 && column == 0) {
		document.getElementById(id).innerHTML = table[row][column];
		document.getElementById(id).style.background = "green";
	}
	return false;
}

function restartGame() {
	location.reload();
}
