export default class GetApplicationsInClusterUseCase {
  constructor({ applicationClient }) {
    this.applicationClient = applicationClient;
  }
  async execute(useCaseRequest) {
    const { clusterId } = useCaseRequest;

    const applications = await this.applicationClient.getApplicationsForClusterId(
      clusterId
    );

    return applications;
  }
}
