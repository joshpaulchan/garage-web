import ApplicationClient from "../../interactors/application-client";
jest.mock("../../interactors/application-client");

import GetApplicationsInClusterUseCase from "../get-applications-in-cluster";
import Application from "../../models/Application";

describe("GetApplicationsInClusterUseCase", () => {
  let applicationClient;
  let useCase;

  beforeEach(() => {
    ApplicationClient.mockClear();
    applicationClient = new ApplicationClient();

    useCase = new GetApplicationsInClusterUseCase({
      applicationClient
    });
  });

  it("should return the applications fetched from the client", async () => {
    const expectedApplications = [
      new Application({ id: 1, name: "content" }),
      new Application({ id: 1, name: "content-mgmt" })
    ];
    applicationClient.getApplicationsForClusterId.mockResolvedValue(
      expectedApplications
    );

    const useCaseRequest = { clusterId: "Some-cluster-id" };

    const result = await useCase.execute(useCaseRequest);

    expect(result).toEqual(expectedApplications);
  });
});
