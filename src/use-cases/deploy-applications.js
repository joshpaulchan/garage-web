export default class DeployApplicationsUseCase {
  constructor({ applicationClient }) {
    this.applicationClient = applicationClient;
  }
  async execute(useCaseRequest) {
    const { deployTargets } = useCaseRequest;

    const results = await this.applicationClient.deploy(deployTargets);

    return deployTargets;
  }
}
