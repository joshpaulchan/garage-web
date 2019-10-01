import Application from "../Application";

describe("Application", () => {
  it("should be able to be constructed with id and name", () => {
    const params = { id: "some id", name: "content-mgmt" };

    const application = new Application(params);

    expect(application.id).toEqual(params.id);
    expect(application.name).toEqual(params.name);
  });
});
