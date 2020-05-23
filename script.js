const randomNumbers = randomNumberGenrator();
const random4x4 = random4x4Generator(randomNumbers);

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
    let temp = currentTile.textContent;
    currentTile.textContent = rightTile.textContent;
    rightTile.textContent = temp;

    return document.body.addEventListener("keydown", moveTile);
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
    let temp = currentTile.textContent;
    currentTile.textContent = belowTile.textContent;
    belowTile.textContent = temp;
    return;
  }
  // right
  if (e.keyCode === 39) {
    if (indexOfZero[1] === 0) {
      return console.log("no tile on the left!");
    }
    let rightTile = document.getElementById(
      `${indexOfZero[0]}-${indexOfZero[1] + 1}`
    );
  }
  // down
  if (e.keyCode === 40) {
    if (indexOfZero[0] === 0) {
      return console.log("no tile above");
    }
    let downTile = document.getElementById(
      `${indexOfZero[0] + 1}-${indexOfZero[1]}`
    );
  }
  return;
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
