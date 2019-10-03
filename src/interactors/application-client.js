export default class ApplicationClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "http://localhost:8000";
  }
  async getApplicationsForClusterId(clusterId) {
    return [];
  }
}
