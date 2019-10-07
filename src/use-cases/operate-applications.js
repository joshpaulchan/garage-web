export default class OperateApplicationsUseCase {
  constructor({ applicationClient }) {
    this.applicationClient = applicationClient;
  }
  async execute(useCaseRequest) {
    const { stateTargets } = useCaseRequest;

    const applications = await this.applicationClient.operate(stateTargets);

    return stateTargets;
  }
}
