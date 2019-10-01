export const CLUSTER_TYPE = {
  DEVSTACK: "devstack"
};

export default class Cluster {
  id = null;
  type = null;
  name = null;
  constructor({ id, type, name }) {
    this.id = id;
    this.type = type;
    this.name = name;
  }
}
