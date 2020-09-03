/*jshint esversion: 10 */

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const width = 8;
	const squares = [];
	let score = 0;

	//storing the candy colours
	const candyColours = ["red", "yellow", "orange", "purple", "green", "blue"];

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
			square.style.backgroundColor = candyColours[randomColour];

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
		colourBeingDragged = this.style.backgroundColor;
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
		colourBeingReplaced = this.style.backgroundColor;

		// Obtaining the ID of the chosen square
		squareIdBeingReplaced = parseInt(this.id);

		// Changing the colour of the chosen and replaced square using ID's
		squares[squareIdBeingDragged].style.backgroundColor = colourBeingReplaced;
		squares[squareIdBeingReplaced].style.backgroundColor = colourBeingDragged;
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
			].style.backgroundColor = colourBeingReplaced;
			squares[squareIdBeingDragged].style.backgroundColor = colourBeingDragged;
		} else {
			squares[squareIdBeingDragged].style.backgroundColor = colourBeingDragged;
		}
	}

	// To check for row of 3 matches
	function checkRowForThree() {
		for (let i = 0; i < 61; i++) {
			// Variable for a correct set of 3 squares
			let rowOfThree = [i, i + 1, i + 2];
			let decidedColour = squares[i].style.backgroundColor;

			// To check for blank squares
			const isBlank = squares[i].style.backgroundColor === "";

			// To cater for the wrapping of matches from one row to another
			const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
			if (notValid.includes(i)) continue;

			// Logic for correct set
			if (
				rowOfThree.every(
					(index) =>
						squares[index].style.backgroundColor === decidedColour && !isBlank
				)
			) {
				score += 3;
				rowOfThree.forEach((index) => {
					squares[index].style.backgroundColor = "";
				});
			}
		}
	}
	checkRowForThree();

	// To check for column  of 3 matches
	function checkColumnForThree() {
		for (let i = 0; i < 47; i++) {
			// Variable for a correct set of 3 squares
			let columnOfThree = [i, i + width, i + width * 2];
			let decidedColour = squares[i].style.backgroundColor;

			// To check for blank squares
			const isBlank = squares[i].style.backgroundColor === "";

			// Logic for correct set
			if (
				columnOfThree.every(
					(index) =>
						squares[index].style.backgroundColor === decidedColour && !isBlank
				)
			) {
				score += 3;
				columnOfThree.forEach((index) => {
					squares[index].style.backgroundColor = "";
				});
			}
		}
	}
	checkColumnForThree();

	window.setInterval(function () {
		checkRowForThree();
		checkColumnForThree();
	}, 100);
});
