const expect = require("chai").expect;

describe('Check solution', () => {
  const solution = require("./solution.json")
  const userSolution = require("./user-solution.json")
  it('should be correct', () => {
    expect(userSolution.length).to.eq(solution.affectedUids.length);
    expect(userSolution.sort()).to.eql(solution.affectedUids.sort());

  });
});