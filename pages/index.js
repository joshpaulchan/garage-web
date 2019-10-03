import { useState, useEffect } from "react";

import GetApplicationsInClusterUseCase from "../src/use-cases/get-applications-in-cluster";
import ApplicationClient from "../src/interactors/application-client";
import { ApplicationMap } from "../src/components/application-map";
import { ApplicationDetails } from "../src/components/application-details";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";

const API_BASE_URL = "http://localhost:8000";
const applicationClient = new ApplicationClient(API_BASE_URL);
const getApplicationsInClusterUseCase = new GetApplicationsInClusterUseCase({
  applicationClient
});

const CLUSTER_ID = "devstack-shootsnleaders";

const Index = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, selectApplication] = useState(null);
  const deselectApplication = () => selectApplication(null);

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
      <div className="application-details-container">
        {selectedApplication && (
          <ApplicationDetails application={selectedApplication} />
        )}
      </div>
    </>
  );
};

export default Index;
