const data = require("./MOCK_DATA.json")
const fs = require('fs');
const uuid = require("uuid");


let failures = [];
let failureData = [];
data.forEach(d => {
  failureData.push({
    ...d,
    amount: Number(d.amount),
    timestamp: Number(d.timestamp),
  })
  if (Math.random() < .05) {
    const dupTimestamp = 1581651131; // 14/02/2020 04:32:11 AM
    const numPotentialDuplicates = Math.round(Math.random() * 10)
    for (let index = 0; index < numPotentialDuplicates; index++) {
      const isDup = Math.round(Math.random());
      if (isDup) {
        const last = failureData.pop();
        last.timestamp = dupTimestamp;
        failureData.push(last);
        const duplicated = {
          ...d,
          _id: uuid.v4(),
          amount: Number(d.amount),
          timestamp: Number(dupTimestamp),
        }
        failures.push(duplicated);
        failureData.push(duplicated);
      }
      else {
        const offset = 3600 + Math.round(Math.random() * 3600 * 12);
        const seemsDuplicatedButNot = {
          ...d,
          _id: uuid.v4(),
          amount: Number(d.amount),
          timestamp: Number(d.timestamp) + offset,
        }
        failureData.push(seemsDuplicatedButNot)
      }
    }

  }
})

const failuresIds = failures.map(f => f.uid)
const failuresIdsUnique = failuresIds.filter((v, i) => failuresIds.indexOf(v) === i)

const solution = {
  incidentDate: "1581651131000 14/02/2020 04:32:11 AM",
  numOfAffectedUsers: failuresIdsUnique.length,
  affectedUids: failuresIdsUnique.sort(f => f),
}

console.log(failureData.length)
fs.writeFileSync('data.json', JSON.stringify(shuffle(failureData)));
fs.writeFileSync('solution.json', JSON.stringify(solution));


function shuffle(arr) {
  var i,
    j,
    temp;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};