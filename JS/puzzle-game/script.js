const btnStart = document.querySelector(".btn-start");
const container = document.querySelector(".container");
const puzzle = document.querySelector(".puzzle");
const pieces = document.querySelectorAll(".piece");
const movesCountSpan = document.querySelector(".moves");
const winScreen = document.querySelector(".win-screen");
const btnAgain = document.querySelector(".btn-again");
const result = document.querySelector(".result");
let moves = 0;

btnStart.addEventListener("click", () => {
  container.classList.remove("welcome");
});

btnAgain.addEventListener("click", () => {
  window.location.reload();
});

movingPiecesLogic();

//FUNCTIONS//
function movingPiecesLogic() {
  pieces.forEach((piece) => {
    piece.addEventListener("click", () => {
      //getting the place coordinates of the clicked piece
      let pieceStyle = getComputedStyle(piece);
      let colStart = parseInt(pieceStyle.getPropertyValue("grid-column-start"));
      let colEnd = parseInt(pieceStyle.getPropertyValue("grid-column-end"));
      let rowStart = parseInt(pieceStyle.getPropertyValue("grid-row-start"));
      let rowEnd = parseInt(pieceStyle.getPropertyValue("grid-row-end"));

      //getting around pieces
      let aroundPieces = [
        {
          //right piece
          colStart: colStart + 1,
          colEnd: colEnd + 1,
          rowStart: rowStart,
          rowEnd: rowEnd,
        },
        {
          //left piece
          colStart: colStart - 1,
          colEnd: colEnd - 1,
          rowStart: rowStart,
          rowEnd: rowEnd,
        },
        {
          //above piece
          colStart: colStart,
          colEnd: colEnd,
          rowStart: rowStart - 1,
          rowEnd: rowEnd - 1,
        },
        {
          //below piece
          colStart: colStart,
          colEnd: colEnd,
          rowStart: rowStart + 1,
          rowEnd: rowEnd + 1,
        },
      ];

      //find the empty piece and switch with it
      aroundPieces.forEach((aroundPiece) => {
        let aroundPieceSelector = `.col${aroundPiece.colStart}-${aroundPiece.colEnd}.row${aroundPiece.rowStart}-${aroundPiece.rowEnd}`;
        let aroundPieceDiv = document.querySelector(aroundPieceSelector);
        //check if the selector exists
        if (!aroundPieceDiv) return;
        if (aroundPieceDiv.classList.contains(`empty-piece`)) {
          //switching places
          aroundPieceDiv.className = `piece empty-piece col${pieceStyle.gridColumnStart}-${pieceStyle.gridColumnEnd} row${pieceStyle.gridRowStart}-${pieceStyle.gridRowEnd}`;
          piece.className = `piece col${aroundPiece.colStart}-${aroundPiece.colEnd} row${aroundPiece.rowStart}-${aroundPiece.rowEnd}`;
          moves++;
          movesCountSpan.textContent = `${moves} moves`;
        }
      });

      checkRightOrder();
    });
  });
}
function checkRightOrder() {
  //The right order for the parts
  let part1 = document.querySelector("#part1.col1-2.row1-2"),
    part2 = document.querySelector("#part2.col2-3.row1-2"),
    part3 = document.querySelector("#part3.col3-4.row1-2"),
    part4 = document.querySelector("#part4.col1-2.row2-3"),
    part5 = document.querySelector("#part5.col2-3.row2-3"),
    part6 = document.querySelector("#part6.col3-4.row2-3"),
    part7 = document.querySelector("#part7.col1-2.row3-4"),
    part8 = document.querySelector("#part8.col2-3.row3-4"),
    part9 = document.querySelector("#part9.col3-4.row3-4");

  //check if each part is in the right place
  if (
    part1 &&
    part2 &&
    part3 &&
    part4 &&
    part5 &&
    part6 &&
    part7 &&
    part8 &&
    part9
  ) {
    win();
  }
}
function win() {
  puzzle.classList.add("win");
  setTimeout(() => {
    document.body.classList.add("win");
  }, 600);

  result.textContent = `You did it with ${moves} moves`;
}
