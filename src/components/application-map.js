import { useMemo } from "react";
import { Stage, Layer, Circle, Text } from "react-konva";
import Konva from "konva";

import useWindowDimensions from "./use-window-dimensions";
import Layouter from "./layouter";

const NODE_SIZE = 40;

const noop = evt => {};

export const ApplicationNode = ({ app, onClick, x, y }) => {
  const color = useMemo(Konva.Util.getRandomColor, [app]);
  const borderColor = "#333";
  const strokeWidth = 4;
  const itemSize = NODE_SIZE;

  return (
    <>
      <Circle
        radius={itemSize}
        fill={color}
        stroke={borderColor}
        strokeWidth={strokeWidth}
        x={x}
        y={y}
        onClick={() => onClick(app)}
      />
      <Text text={app.name} x={x} y={y} />
    </>
  );
};

ApplicationNode.defaultProps = {
  x: 0,
  y: 0,
  onClick: noop
};

export const ApplicationMap = ({ applications, selectApplication }) => {
  const { height, width } = useWindowDimensions();

  return (
    <Stage width={width} height={height}>
      <Layer>
        <Layouter
          height={height}
          width={width}
          items={applications.map(app => ({ x, y }) => (
            <ApplicationNode
              key={app.id}
              app={app}
              onClick={selectApplication}
              x={x}
              y={y}
            />
          ))}
        />
      </Layer>
    </Stage>
  );
};
