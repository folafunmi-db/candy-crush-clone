/*jshint esversion: 10 */

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const scoreDisplay = document.getElementById("score");
	const width = 8;
	const squares = [];
	let score = 0;

	//storing the candy colours
	const candyColours = [
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351357/Candy%20Crush%20Candies/red_lpha7h.png)",
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351356/Candy%20Crush%20Candies/yellow_z6ohdt.png)",
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351356/Candy%20Crush%20Candies/orange_qzwnvh.png)",
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351356/Candy%20Crush%20Candies/purple_h7c3ak.png)",
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351356/Candy%20Crush%20Candies/green_yw6bll.png)",
		"url(https://res.cloudinary.com/folafunmi/image/upload/v1599351355/Candy%20Crush%20Candies/blue_bvwm7s.png)",
	];

	// Creating Board
	function createBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div");

			// To make candies/squares draggable
			square.setAttribute("draggable", true);
			// Assign and ID from '0'-'63'
			square.setAttribute("id", i);
			// Generating a random colour
			let randomColour = Math.floor(Math.random() * candyColours.length);

			// Get the random colour number to get the random candy colour
			square.style.backgroundImage = candyColours[randomColour];

			grid.appendChild(square);
			squares.push(square);
		}
	}
	createBoard();

	// Drag the candies
	squares.forEach((square) => square.addEventListener("dragstart", dragStart));
	squares.forEach((square) => square.addEventListener("dragover", dragOver));
	squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
	squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
	squares.forEach((square) => square.addEventListener("dragend", dragEnd));
	squares.forEach((square) => square.addEventListener("drop", dragDrop));

	// Variable to hold the colour of the square being dragged and replaced
	let colourBeingDragged;
	let colourBeingReplaced;
	let squareIdBeingDragged;
	let squareIdBeingReplaced;

	function dragStart() {
		colourBeingDragged = this.style.backgroundImage;
		squareIdBeingDragged = parseInt(this.id);
		console.log(colourBeingDragged);
		console.log(this.id, "dragstart");
	}

	function dragOver(event) {
		event.preventDefault();
		console.log(this.id, "dragover");
	}

	function dragEnter(event) {
		event.preventDefault();
		console.log(this.id, "dragenter");
	}

	function dragLeave() {
		console.log(this.id, "dragleave");
	}

	function dragDrop() {
		console.log(this.id, "dragdrop");
		colourBeingReplaced = this.style.backgroundImage;

		// Obtaining the ID of the chosen square
		squareIdBeingReplaced = parseInt(this.id);

		// Changing the colour of the chosen and replaced square using ID's
		squares[squareIdBeingDragged].style.backgroundImage = colourBeingReplaced;
		squares[squareIdBeingReplaced].style.backgroundImage = colourBeingDragged;
	}

	function dragEnd() {
		console.log(this.id, "dragend");

		// What constitues a valid move?
		let validMoves = [
			squareIdBeingDragged - 1,
			squareIdBeingDragged - width,
			squareIdBeingDragged + 1,
			squareIdBeingDragged + width,
		];

		// Setting a boolean for validity of the move
		let validMove = validMoves.includes(squareIdBeingReplaced);
		if (squareIdBeingReplaced && validMove) {
			squareIdBeingReplaced = null;
		} else if (squareIdBeingReplaced && !validMove) {
			squares[
				squareIdBeingReplaced
			].style.backgroundImage = colourBeingReplaced;
			squares[squareIdBeingDragged].style.backgroundImage = colourBeingDragged;
		} else {
			squares[squareIdBeingDragged].style.backgroundImage = colourBeingDragged;
		}
	}

	// Drop squares once some have been colourBeingDragged
	function moveDown() {
		// check the first seven rows for an empty square
		for (i = 0; i < 55; i++) {
			if (squares[i + width].style.backgroundImage === "") {
				squares[i + width].style.backgroundImage =
					squares[i].style.backgroundImage;

				squares[i].style.backgroundImage = "";

				// To include new squares in the first row
				const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
				const isInFirstRow = firstRow.includes(i);
				if (isInFirstRow && squares[i].style.backgroundImage === "") {
					let randomColour = Math.floor(Math.random() * candyColours.length);
					squares[i].style.backgroundImage = candyColours[randomColour];
				}
			}
		}
	}

	// Check for matches

	// Check for matches of 4
	function checkRowForFour() {
		// Loop through each square
		for (let i = 0; i < 61; i++) {
			//Variable for a correct set of 4 squares
			let rowOfFour = [i, i + 1, i + 2, i + 3];
			let decidedColour = squares[i].style.backgroundImage;

			// To check if the square is blank
			const isBlank = squares[i].style.backgroundImage === "";

			// To cater for the wrapping of matches from one row to another
			// Set the square for which match checking is to be skipped-
			const notValid = [
				5,
				6,
				7,
				13,
				14,
				15,
				21,
				22,
				23,
				29,
				30,
				31,
				37,
				38,
				39,
				45,
				46,
				47,
				53,
				54,
				55,
			];
			if (notValid.includes(i)) continue;

			// Logic for correct set of 4
			if (
				rowOfFour.every(
					(index) =>
						squares[index].style.backgroundImage === decidedColour && !isBlank
				)
			) {
				score += 4;
				scoreDisplay.innerHTML = score;
				rowOfFour.forEach((index) => {
					squares[index].style.backgroundImage = "";
				});
			}
		}
	}

	checkRowForFour();

	// Check for matches of 4
	function checkColumnForFour() {
		// Loop through each square
		for (let i = 0; i < 47; i++) {
			//Variable for a correct set of 4 squares
			let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
			let decidedColour = squares[i].style.backgroundImage;

			// To check if the square is blank
			const isBlank = squares[i].style.backgroundImage === "";

			// Logic for correct set of 4
			if (
				columnOfFour.every(
					(index) =>
						squares[index].style.backgroundImage === decidedColour && !isBlank
				)
			) {
				score += 4;
				scoreDisplay.innerHTML = score;
				columnOfFour.forEach((index) => {
					squares[index].style.backgroundImage = "";
				});
			}
		}
	}

	checkColumnForFour();

	// To check for row of 3 matches
	function checkRowForThree() {
		// Loop through each square
		for (let i = 0; i < 61; i++) {
			// Variable for a correct set of 3 squares
			let rowOfThree = [i, i + 1, i + 2];
			let decidedColour = squares[i].style.backgroundImage;

			// To check for blank squares
			const isBlank = squares[i].style.backgroundImage === "";

			// To cater for the wrapping of matches from one row to another
			// Set the square for which match checking is to be skipped-
			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
			if (notValid.includes(i)) continue;

			// Logic for correct set
			if (
				rowOfThree.every(
					(index) =>
						squares[index].style.backgroundImage === decidedColour && !isBlank
				)
			) {
				score += 3;
				scoreDisplay.innerHTML = score;
				rowOfThree.forEach((index) => {
					squares[index].style.backgroundImage = "";
				});
			}
		}
	}

	checkRowForThree();

	// To check for column  of 3 matches
	function checkColumnForThree() {
		// Loop through each square
		for (let i = 0; i < 47; i++) {
			// Variable for a correct set of 3 squares
			let columnOfThree = [i, i + width, i + width * 2];
			let decidedColour = squares[i].style.backgroundImage;

			// To check for blank squares
			const isBlank = squares[i].style.backgroundImage === "";

			// Logic for correct set
			if (
				columnOfThree.every(
					(index) =>
						squares[index].style.backgroundImage === decidedColour && !isBlank
				)
			) {
				score += 3;
				scoreDisplay.innerHTML = score;
				columnOfThree.forEach((index) => {
					squares[index].style.backgroundImage = "";
				});
			}
		}
	}

	checkColumnForThree();

	window.setInterval(function () {
		moveDown();
		checkRowForFour();
		checkColumnForFour();
		checkRowForThree();
		checkColumnForThree();
	}, 100);
});
