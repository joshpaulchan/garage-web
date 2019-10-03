import { useState, useEffect } from "react";

import GetApplicationsInClusterUseCase from "../src/use-cases/get-applications-in-cluster";
import ApplicationClient from "../src/interactors/application-client";
import { ApplicationMap } from "../src/components/application-map";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const applicationClient = new ApplicationClient();
const getApplicationsInClusterUseCase = new GetApplicationsInClusterUseCase({
  applicationClient
});

const CLUSTER_ID = "shootsnleaders";

const Index = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const selectApplication = app =>
    setSelectedApplications([...selectedApplications, app]);

  useEffect(() => {
    getApplicationsInClusterUseCase
      .execute({ clusterId: CLUSTER_ID })
      .then(setApplications);
  }, [setApplications]);

  return (
    <>
      <ApplicationMap
        applications={applications}
        selectApplication={selectApplication}
      />
    </>
  );
};

export default Index;
