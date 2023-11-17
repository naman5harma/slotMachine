//1. Deposit Some Money
//2. Determine Number of lines to bet on
//3. Collect a bet amount
//4. Spin the slot machine
//5. Check if user won
//6. Give the user their winnings
//7.Play Again

// function deposit()
// {
//     return 1
// }

const prompt = require("prompt-sync")();

const row = 3;
const col = 3;

const symbols_Count = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUEs = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// const spin = () => {};

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a Deposit Amount: ");
    const Number_DepositAmount = parseFloat(depositAmount);

    if (isNaN(Number_DepositAmount) || Number_DepositAmount <= 0)
      console.log("Invalid deposit Amount, Try Again");
    else return Number_DepositAmount;
  }
};

const getNumberofLine = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on (1-3): ");
    const numberoflines = parseFloat(lines);
    if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
      console.log("Invalid number of lines, Try again ");
    } else {
      return numberoflines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the total bet:  Rs ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Incorrect Bet Amount");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(symbols_Count)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];

  for (let i = 0; i < col; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (let j = 0; j < row; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbol = reelSymbol[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbol.splice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < row; i += 1) {
    rows.push([]);
    for (let j = 0; j < col; j += 1) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowsString = "";
    for (const [i, symbol] of row.entries()) {
      rowsString += symbol;

      if (i != row.length - 1) {
        rowsString += " | ";
      }
    }
    console.log(rowsString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbols[0] != symbol) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SYMBOL_VALUEs[symbols[0]];
    }
  }
  return winnings;
};
//const reels = spin();
//console.log(reels);

const game = () => {
  let balance = deposit();
  while (true) {
    console.log("You have a balance of Rs" + balance);
    const numberoflines = getNumberofLine();
    const bet = getBet(balance, numberoflines);
    balance -= bet * numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    // console.log(reels);
    // console.log(rows);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberoflines);
    balance += winnings;
    console.log("You won, Rs" + winnings.toString());
    if (balance <= 0) {
      console.log("You ran out of luck and Money!");
      break;
    }

    const playagain = prompt("Do you want to play again(y/n)? ");

    if (playagain != "y") break;
  }
};

game();
