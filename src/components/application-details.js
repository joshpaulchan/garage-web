import { Card, H5, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";

import "./application-details.css";

export const ApplicationDetails = ({ application }) => {
  return (
    <Card className="application-details-container">
      <H5>{application}</H5>
      <Menu>
        <MenuDivider />
        <MenuItem text="Restart" disabled />
        <MenuItem text="Stop" disabled />
        <MenuItem text="Deploy Version" disabled />
        <MenuItem text="Update Config" disabled />
        <MenuItem text="Send Request" disabled />
      </Menu>
    </Card>
  );
};
