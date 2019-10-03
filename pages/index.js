import { useState, useEffect } from "react";

import GetApplicationsInClusterUseCase from "../src/use-cases/get-applications-in-cluster";
import ApplicationClient from "../src/interactors/application-client";
import { ApplicationMap } from "../src/components/application-map";
import useWindowDimensions from "../src/components/use-window-dimensions";

const applicationClient = new ApplicationClient();
const getApplicationsInClusterUseCase = new GetApplicationsInClusterUseCase({
  applicationClient
});

const CLUSTER_ID = "shootsnleaders";

const Index = () => {
  const [applications, setApplications] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    getApplicationsInClusterUseCase
      .execute({ clusterId: CLUSTER_ID })
      .then(setApplications);
  }, [setApplications]);

  return (
    <ClusterMap applications={applications} height={height} width={width} />
  );
};

export default Index;
