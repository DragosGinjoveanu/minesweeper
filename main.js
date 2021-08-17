var table = [];
for (let i = 1; i <= 11; i++) {
    table[i] = [];
    for (let j = 1; j <= 11; j++) {
        table[i][j] = 0;
    }
}

//puts one bomb on the playing board
function loadBomb() {
	const row = Math.floor(Math.random() * 9 + 2);
	const column = Math.floor(Math.random() * 9 + 2);
	if (table[row][column] == 0) {
		table[row][column] = 9;
	} else if (table[row][column] == 9) {
		loadBomb();
	}
}

//generates playing board
function loadTable() {
	for (let i = 2; i <= 10; i++) {
		$('#table').append(`
			<tr></tr>
		`);
		for (let j = 2; j <= 10; j++) {
			$('#table').append(`
				<td><button type="button" class="btn btn-secondary btn-lg" id = "` + i + " " + j +`" onmousedown = "checkButton(event, id);"><i class="las la-code"></i></button></td>
			`);
		}
	}
	//generates all the bombs
	for (let i = 1; i <= 10; i++) {
		loadBomb();
	}
}

function calcBombs(row, column) {
	let nrBombs = 0;
	for (let i = row - 1; i <= row + 1; i++) {
		for (let j = column - 1; j <= column + 1; j++) {
			if (table[i][j] == 9) {
				nrBombs++;
			}
		}
	}
	return nrBombs;
}

function checkGameStatus() {
	for (let i = 2; i <= 10; i++) {
		for (let j = 2; j <= 10; j++) {
			if (table[i][j] == 0) {
				return 0;
			}
		}
	}
	return 1;
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
 			for (let i = row - 1; i <= row + 1; i++) {
 				for (let j = column - 1; j <= column + 1; j++) {
 					if (i >= 2 && i <= 10 && j >= 2 && j <= 10) {
	 					const nrBombs = calcBombs(i, j);
 						emptySpaces(i, j, nrBombs);
 					}
 				}
 			}
 		}
 	}
 	if (checkGameStatus()) {
 		document.getElementById("status").innerHTML = "You won!";
 		document.getElementById("status").style.color = "green";
 	}
}

// checks if the cell is a bomb/not
function checkButton(event, id) {
	//gets row/column from id
	let n = '';
	let rowCopy, columnCopy;
	for (let i = 0; i < id.length; i++) {
		n += id.charAt(i);
		if (id.charAt(i) == ' ') {
			rowCopy = n;
			n = '';
		}
	}
	columnCopy = n;
	const row = parseInt(rowCopy);
	const column = parseInt(columnCopy);
	//right click
	if (event.buttons == '2' && (table[row][column] == 0 || table[row][column] == 9)) {
		document.getElementById(id).innerHTML = ('🚩');
	} else {
		//left click
		if (table[row][column] == 9) {
	 		for (let i = 2; i <= 10; i++) {
		    	for (let j = 2; j <= 10; j++) {
		        	if (table[i][j] == 9) {
		        		const id = i + " " + j;
		        		document.getElementById(id).innerHTML = ("💣");
		        		document.getElementById(id).style.background='#E71023';
		        	}
		    	}
			}
		document.getElementById("status").innerHTML = "You lost! Please Restart!";
		document.getElementById("status").style.color = "red";
		} else {
			const bombs = calcBombs(row, column);
			emptySpaces(row, column, bombs);
		} 		
	}
	return false;
}

function restartGame() {
	location.reload();
}
