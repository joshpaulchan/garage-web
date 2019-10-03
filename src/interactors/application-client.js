import Application from "../models/Application";

export default class ApplicationClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "http://localhost:8000";
  }
  async getApplicationsForClusterId(clusterId) {
    return [];
  }
}

export class DumbApplicationClient {
  async getApplicationsForClusterId(clusterId) {
    return [
      new Application({ id: "content", name: "content" }),
      new Application({ id: "content-mgmt", name: "content-mgmt" }),
      new Application({ id: "projections", name: "projections" }),
      new Application({
        id: "projections-management",
        name: "projections-management"
      }),
      new Application({ id: "inbox", name: "inbox" }),
      new Application({ id: "boxscore", name: "boxscore" }),
      new Application({ id: "coregame", name: "coregame" }),
      new Application({ id: "gamedata", name: "gamedata" }),
      new Application({ id: "sportdata", name: "sportdata" }),
      new Application({
        id: "sportdata-management",
        name: "sportdata-management"
      }),
      new Application({ id: "api", name: "api" }),
      new Application({ id: "graphql", name: "graphql" })
    ];
  }
}
