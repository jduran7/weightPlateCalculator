/** Collection of weights plates.
 * Keys are the weight of the plate (i.e. 2.5lbs),
 * Values are the amount of plates for each weight. */
const weightRack = {
  1.25: 5,
  2.5: 6,
  5: 4,
  10: 4,
  20: 4,
  45: 2,
};

/** Choose if the weight should be for one or two dumbbells.
 * true = a pair
 * false = a single dumbbell. */
const pair = true;

/** The total amount of weight the user wants to assemble.
 * if the user is using a pair of weights,
 * the targetDumbbellWeight should be set for each dumbbell. */
const targetDumbbellWeight = 50;

module.exports = {
  weightRack,
  pair,
  targetDumbbellWeight,
};
