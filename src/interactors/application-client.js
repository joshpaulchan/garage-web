import Application from "../models/Application";

const getApplicationsForClusterRequst = (baseUrl, clusterId) => {
  return {
    url: `${baseUrl}/applications/${clusterId}`,
    method: "GET"
  };
};

const deployApplicationRequest = (baseUrl, target) => {
  const { clusterId } = target;
  return {
    url: `${baseUrl}/applications/${clusterId}/deploy`,
    method: "POST",
    body: JSON.stringify({
      targets: [
        {
          application_id: target.applicationId,
          version: target.version
        }
      ]
    })
  };
};

const operateApplicationRequest = (baseUrl, target) => {
  const { clusterId } = target;
  return {
    url: `${baseUrl}/applications/${clusterId}/states`,
    method: "POST",
    body: JSON.stringify({
      target_states: [
        {
          application_id: target.applicationId,
          state: target.state
        }
      ]
    })
  };
};

export default class ApplicationClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "http://localhost:8000";
  }
  async getApplicationsForClusterId(clusterId) {
    const request = getApplicationsForClusterRequst(this.baseUrl, clusterId);

    const response = await fetch(request.url, {
      method: request.method
    });

    const payload = await response.json();

    return payload.applications.map(
      app => new Application({ id: app.id, name: app.name })
    );
  }
  async deploy(deployTargets) {
    return deployTargets.map(async deployTarget => {
      const request = deployApplicationRequest(this.baseUrl, deployTarget);

      const response = await fetch(request.url, {
        method: request.method,
        body: request.body
      });

      const payload = await response.json();
      return payload;
    });
  }
  async operate(stateTargets) {
    return stateTargets.map(async deployTarget => {
      const request = operateApplicationRequest(this.baseUrl, deployTarget);
      console.log(request);

      const response = await fetch(request.url, {
        method: request.method,
        body: request.body
      });

      const payload = await response.json();
      return payload;
    });
  }
}

export class DumbApplicationClient extends ApplicationClient {
  constructor() {
    super();
  }
  async getApplicationsForClusterId(clusterId) {
    return super.getApplicationsForClusterId(clusterId);
    // return [
    //   new Application({ id: "content", name: "content" }),
    //   new Application({ id: "content-mgmt", name: "content-mgmt" }),
    //   new Application({ id: "projections", name: "projections" }),
    //   new Application({
    //     id: "projections-management",
    //     name: "projections-management"
    //   }),
    //   new Application({ id: "inbox", name: "inbox" }),
    //   new Application({ id: "boxscore", name: "boxscore" }),
    //   new Application({ id: "coregame", name: "coregame" }),
    //   new Application({ id: "gamedata", name: "gamedata" }),
    //   new Application({ id: "sportdata", name: "sportdata" }),
    //   new Application({
    //     id: "sportdata-management",
    //     name: "sportdata-management"
    //   }),
    //   new Application({ id: "api", name: "api" }),
    //   new Application({ id: "graphql", name: "graphql" })
    // ];
  }
}
