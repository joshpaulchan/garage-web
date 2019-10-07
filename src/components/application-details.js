import { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Divider,
  FormGroup,
  InputGroup,
  H4,
  H5,
  Tag
} from "@blueprintjs/core";

import "./application-details.css";

import DeployApplicationsUseCase from "../use-cases/deploy-applications";
import { DumbApplicationClient } from "../interactors/application-client";
import OperateApplicationsUseCase from "../use-cases/operate-applications";

const applicationClient = new DumbApplicationClient();
const deployApplicationsUseCase = new DeployApplicationsUseCase({
  applicationClient
});

const deployApplication = (clusterId, applicationId, version) => {
  const deployTargets = [
    {
      clusterId,
      applicationId,
      version
    }
  ];
  // content_service-2019-10-03-b280-master

  return deployApplicationsUseCase.execute({
    deployTargets
  });
};

const preventDefault = handler => evt => {
  evt.preventDefault();
  return handler(evt);
};

const DeployVersionItem = ({ clusterId, application }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [version, setVersion] = useState("");

  return (
    <div>
      <Button onClick={() => setIsOpen(isOpen => !isOpen)}>
        Deploy Version
      </Button>
      <Collapse isOpen={isOpen}>
        <form
          onSubmit={preventDefault(() =>
            deployApplication(clusterId, application.id, version)
          )}
        >
          <FormGroup
            helperText="Helper text with details..."
            label="Version"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup
              id="text-input"
              placeholder="Placeholder text"
              required
              value={version}
              onChange={evt => setVersion(evt.target.value)}
            />
          </FormGroup>
        </form>
      </Collapse>
    </div>
  );
};

const operateApplicationUseCase = new OperateApplicationsUseCase({
  applicationClient
});

const restartApplication = (clusterId, applicationId) => {
  const stateTargets = [
    {
      clusterId,
      applicationId,
      state: "RESTARTING"
    }
  ];
  return operateApplicationUseCase.execute({
    stateTargets
  });
};

const RestartItem = ({ clusterId, application }) => {
  return (
    <div>
      <Button onClick={() => restartApplication(clusterId, application.id)}>
        Restart
      </Button>
    </div>
  );
};

export const ApplicationDetails = ({ application }) => {
  return (
    <Card className="application-details-card">
      <H4>{application.name}</H4>
      <Tag>{application.version}</Tag>
      <H5>Details</H5>
      <H5>Actions</H5>
      <div>
        <DeployVersionItem
          application={application}
          clusterId={"devstack-shootsnleaders"}
        />
        <RestartItem
          application={application}
          clusterId={"devstack-shootsnleaders"}
        />
      </div>
    </Card>
  );
};
