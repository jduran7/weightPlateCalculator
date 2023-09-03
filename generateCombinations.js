const { assembleDumbell } = require('./helpers.js');
const { weightRack, targetDumbbellWeight, pair } = require('./userInputs.js');

console.log(assembleDumbell(targetDumbbellWeight, weightRack, pair));
