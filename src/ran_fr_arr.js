const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

let sq_from_table = [1, 2, 3, 4, 5, 6, 7, 8, 9]




// while (sq_from_table.length > 1) {
//   let randomValue = getRandom(sq_from_table);
//   sq_from_table = sq_from_table.filter((val) => val !== randomValue)
//   console.log(randomValue);
// }

export default (getRandom)