import { Stage, Layer, Circle, Text } from "react-konva";
import Konva from "konva";

import Layouter from "./layouter";

const NODE_SIZE = 40;

const noop = evt => {};

export const ApplicationNode = ({ name, x, y, onClick }) => {
  const color = Konva.Util.getRandomColor();
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
      />
      <Text text={name} x={x} y={y} />
    </>
  );
};

ApplicationNode.defaultProps = {
  x: 0,
  y: 0,
  onClick: noop
};

export const ClusterMap = ({ applications, width, height }) => {
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Layouter
          height={height}
          width={width}
          items={applications.map(app => ({ x, y }) => (
            <ApplicationNode key={app.id} x={x} y={y} name={app.name} />
          ))}
        />
      </Layer>
    </Stage>
  );
};
