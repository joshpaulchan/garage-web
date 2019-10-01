import Dependency from "../dependency";

describe("Dependency", () => {
  it("should be able to be constructed with from/to notation", () => {
    const thizz = "this guy needs";
    const that = "a Snickers bar";

    const dependency = Dependency.from(thizz).to(that);

    expect(dependency.source).toEqual(thizz);
    expect(dependency.sink).toEqual(that);
  });

  it("should be able to be constructed with of/on notation", () => {
    const thizz = "this guy needs";
    const that = "a Snickers bar";

    const dependency = Dependency.of(thizz).on(that);

    expect(dependency.source).toEqual(thizz);
    expect(dependency.sink).toEqual(that);
  });

  it("should be able to be constructed with mix and match notation", () => {
    const thizz = "this guy needs";
    const that = "a Snickers bar";

    const fromOnDependency = Dependency.from(thizz).on(that);
    const ofToDependency = Dependency.of(thizz).to(that);

    expect(fromOnDependency.source).toEqual(fromOnDependency.source);
    expect(fromOnDependency.sink).toEqual(ofToDependency.sink);
  });
});
