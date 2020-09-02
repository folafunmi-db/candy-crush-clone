/*jshint esversion: 10 */

document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".grid");
	const width = 8;
	const squares = [];

  //storing the candy colours
  const candyColours = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
  ];

	// Creating Board
	function createBoard() {
		for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      // Generating a random colour
      let randomColour = Math.floor(Math.random() * candyColours.length);

      // Get the random colour number to get the random candy colour
      square.style.backgroundColor = candyColours[randomColour];


			grid.appendChild(square);
			squares.push(square);
		}
	}
	createBoard();
});
