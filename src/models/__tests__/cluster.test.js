import Cluster, { CLUSTER_TYPE } from "../cluster";

describe("Cluster", () => {
  it("should be able to be constructed with id, name, and type", () => {
    const params = {
      id: "some id",
      name: "content-mgmt",
      type: CLUSTER_TYPE.DEVSTACK
    };

    const cluster = new Cluster(params);

    expect(cluster.id).toEqual(params.id);
    expect(cluster.name).toEqual(params.name);
    expect(cluster.type).toEqual(params.type);
  });
});
