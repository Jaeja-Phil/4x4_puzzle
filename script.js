const randomNumbers = randomNumberGenrator();
let random4x4 = random4x4Generator(randomNumbers);

function swapTilesDOM(curTile, changeTile) {
  let temp = curTile.textContent;
  curTile.textContent = changeTile.textContent;
  changeTile.textContent = temp;
}

function swapTilesArray(direction, indexOfZero) {
  if (direction === "left") {
    [
      random4x4[indexOfZero[0]][indexOfZero[1]],
      random4x4[indexOfZero[0]][indexOfZero[1] + 1],
    ] = [
      random4x4[indexOfZero[0]][indexOfZero[1] + 1],
      random4x4[indexOfZero[0]][indexOfZero[1]],
    ];
  }
  if (direction === "up") {
    [
      random4x4[indexOfZero[0]][indexOfZero[1]],
      random4x4[indexOfZero[0] + 1][indexOfZero[1]],
    ] = [
      random4x4[indexOfZero[0] + 1][indexOfZero[1]],
      random4x4[indexOfZero[0]][indexOfZero[1]],
    ];
  }
  if (direction === "right") {
    [
      random4x4[indexOfZero[0]][indexOfZero[1]],
      random4x4[indexOfZero[0]][indexOfZero[1] - 1],
    ] = [
      random4x4[indexOfZero[0]][indexOfZero[1] - 1],
      random4x4[indexOfZero[0]][indexOfZero[1]],
    ];
  }
  if (direction === "down") {
    [
      random4x4[indexOfZero[0]][indexOfZero[1]],
      random4x4[indexOfZero[0] - 1][indexOfZero[1]],
    ] = [
      random4x4[indexOfZero[0] - 1][indexOfZero[1]],
      random4x4[indexOfZero[0]][indexOfZero[1]],
    ];
  }
}

function isDone() {
  let answerArray = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];
  let result = true;
  answerArray.forEach((el, idx) => {
    el.forEach((innerEl, innerIdx) => {
      if (random4x4[idx][innerIdx] !== answerArray[idx][innerIdx]) {
        result = false;
      }
    });
  });
  return result;
}

function moveTile(e) {
  let indexOfZero = findZero();
  // left
  if (e.keyCode === 37) {
    if (indexOfZero[1] === 3) {
      return console.log("no tile on the right!");
    }
    let rightTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1] + 1}`
    );
    let currentTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1]}`
    );
    swapTilesDOM(currentTile, rightTile);
    swapTilesArray("left", indexOfZero);
  }
  // up
  if (e.keyCode === 38) {
    if (indexOfZero[0] === 3) {
      return console.log("no tile below");
    }
    let belowTile = document.getElementById(
      `${indexOfZero[0] + 1}-${indexOfZero[1]}`
    );
    let currentTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1]}`
    );
    swapTilesDOM(currentTile, belowTile);
    swapTilesArray("up", indexOfZero);
  }
  // right
  if (e.keyCode === 39) {
    if (indexOfZero[1] === 0) {
      return console.log("no tile on the left!");
    }
    let leftTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1] - 1}`
    );
    let currentTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1]}`
    );
    swapTilesDOM(currentTile, leftTile);
    swapTilesArray("right", indexOfZero);
  }
  // down
  if (e.keyCode === 40) {
    if (indexOfZero[0] === 0) {
      return console.log("no tile above");
    }
    let upTile = document.getElementById(
      `${indexOfZero[0] - 1}-${indexOfZero[1]}`
    );
    let currentTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1]}`
    );
    swapTilesDOM(currentTile, upTile);
    swapTilesArray("down", indexOfZero);
  }
  // check if the game is done
  if (isDone()) {
    alert("Congratulations, you won!");
    document.body.removeEventListener("keydown", moveTile);
  }
}

function randomNumberGenrator() {
  let randomNumbers = [];
  while (randomNumbers.length < 16) {
    var r = Math.floor(Math.random() * 16);
    if (randomNumbers.indexOf(r) === -1) {
      randomNumbers.push(r);
    }
  }
  return randomNumbers;
}

function random4x4Generator(randomNums) {
  let result = [[], [], [], []];
  result.forEach((el, idx) => {
    result[idx] = result[idx].concat(randomNums.splice(0, 4));
  });

  result.map((el, idx) => {
    el.map((innerEl, innerIdx) => {
      let current = document.getElementById(`${idx}-${innerIdx}`);
      current.textContent = `${result[idx][innerIdx]}`;
    });
  });

  return result;
}

function findZero() {
  let indexOfZero = [];
  random4x4.forEach((el, idx) => {
    if (el.indexOf(0) !== -1) {
      indexOfZero.push(idx, el.indexOf(0));
    }
  });
  return indexOfZero;
}

document.body.addEventListener("keydown", moveTile);
