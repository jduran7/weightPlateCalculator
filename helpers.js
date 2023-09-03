function sortObjectKeysDescending(object) {
  return Object.keys(object).sort((a, b) => b - a);
}

function removeExtraWeights(weightList, platesToTake) {
  const cleanList = [...weightList];
  for (let i = 0; i < cleanList.length; i++) {
    if (cleanList[i][1] % platesToTake !== 0)
      cleanList[i][1] -= cleanList[i][1] % platesToTake;
  }
  return cleanList;
}

function getTotalWeightCount(weightList) {
  return weightList.reduce(
    (acc, [weight, quantity]) => acc + weight * quantity,
    0
  );
}

function arrayToObject(arr){
    const obj = {};
    for(let i=0;i<arr.length;i++){
        const [key, val] = arr[i];
        if(key in obj) {
            obj[key] += val;
        }
        else obj[key] = val;
    }
    return obj;
}

const assembleDumbell = (targetWeight, weights, pair) => {
  let answer = [];
  let minAnswerLength = Infinity; // we will keep track of the shortest answer possible (leats amount of weight plates) using this variable
  const platesToTake = pair ? 4 : 2; // if the user needs to use two dumbbells, then we need to take 4 plates each turn (2 for each dumbbell)
  const newTargetWeight = pair ? targetWeight * 2 : targetWeight; // the target weight should also be adjusted based on the need for 2 dumbbells.
  let weightList = [...sortObjectKeysDescending(weights)]
    .map((weight) => [weight, weights[weight]])
    .filter(([, quantity]) => quantity >= platesToTake);

  // keeping the number of plates even / removing extra ones
  weightList = removeExtraWeights(weightList, platesToTake);

  const rackTotalWeight = getTotalWeightCount(weightList);

  // At this point we have cleaned the rack for plates that are not available in pairs
  // and can start trying different combinations to reach the target weight.
  // It is still possible that the rack does not have enough weight to match the specific target weight
  // so we need to check before even trying combinations:

  if (rackTotalWeight < newTargetWeight) {
    console.log(
      'not enough weight on the rack:',
      newTargetWeight,
      'lbs are needed and there are only',
      rackTotalWeight,
      'lbs'
    );
    return [];
  }

  function findCombination(
    weightList,
    platesToTake,
    weightAvailable,
    currentWeight,
    currentDumbbell,
    targetWeight
  ) {
    // stop recurring if we have exceeded the required weight or if there is not enough weight available
    if (
      currentWeight > targetWeight ||
      weightAvailable < targetWeight - currentWeight
    )
      return;

    // stop recurring if we have no more weights to add
    if (weightList.length === 0) {
      if (
        currentWeight === targetWeight &&
        currentDumbbell.length < minAnswerLength
      ) {
        answer = currentDumbbell;
        minAnswerLength = currentDumbbell.length;
      }
      return;
    }

    const availableWeights = [...weightList];

    // add the current weight plates
    const iterationWeight = availableWeights[0][0] * platesToTake;

    // update the availableWeights removing the amount of plates we took
    availableWeights[0][1] -= platesToTake;

    // check if there are more weight plates and if so, remove the corresponding number of plates from the current (first) array element
    if (availableWeights.length > 0) {
      if (availableWeights[0][1] === 0) availableWeights.shift();

      // test a new combination adding the current weight plate
      findCombination(
        availableWeights,
        platesToTake,
        weightAvailable - iterationWeight,
        currentWeight + iterationWeight,
        [...currentDumbbell, [weightList[0][0], platesToTake]],
        targetWeight
      );
    }

    // test a new combination skipping the current weight plate
    findCombination(
      availableWeights,
      platesToTake,
      weightAvailable - iterationWeight,
      currentWeight,
      [...currentDumbbell],
      targetWeight
    );
  }

  findCombination(
    weightList,
    platesToTake,
    rackTotalWeight,
    0,
    [],
    newTargetWeight
  );

  if (answer.length === 0) {
    console.log('There is no plate combination that matches the target weight');
    return [];
  }
  else
    console.log(
      'Your target weight of',
      targetWeight,
      pair ? `(x2 dumbbells = ${newTargetWeight})` : '',
      'can be reached using the following plate combination: '
    );
  return arrayToObject(answer);
};

module.exports = {
  assembleDumbell,
};
