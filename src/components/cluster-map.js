import { Stage, Layer, Circle, Text } from "react-konva";
import Konva from "konva";

export const ApplicationNode = ({ name, x, y }) => {
  const color = Konva.Util.getRandomColor();
  const borderColor = "#333";
  const strokeWidth = 4;
  return (
    <>
      <Circle
        radius={40}
        fill={color}
        stroke={borderColor}
        strokeWidth={strokeWidth}
        x={x}
        y={y}
      ></Circle>
      <Text text={name} x={x} y={y} />
    </>
  );
};

const nextPosition = (origin, lastPosition, step, scale, numberOfItems) => {
  const radian = (step / numberOfItems) * Math.PI * 2;
  return {
    x: origin.x + Math.cos(radian) * scale,
    y: origin.y + Math.sin(radian) * scale
  };
};

const layoutInCircle = (origin, items) => {
  const stepSize = 1;
  const startingStep = 0;
  const startingPosition = origin;

  const scale = 250;
  const numberOfItems = items.length;

  return items.reduce(
    (current, item) => {
      const position = nextPosition(
        origin,
        current.position,
        current.step,
        scale,
        numberOfItems
      );
      return {
        step: current.step + stepSize,
        lastPosition: current.position,
        position,
        items: [current.items, item(position)]
      };
    },
    {
      position: startingPosition,
      step: startingStep,
      items: []
    }
  );
};

// TODO: layout algorithm to make application nodes space out from each other properly
const Layouter = ({ items, origin }) => {
  return layoutInCircle(origin, items).items;
};

export const ClusterMap = ({ applications, width, height }) => {
  const origin = { x: width / 2, y: height / 2 };
  return (
    <Stage width={width} height={height}>
      <Layer>
        <Layouter
          origin={origin}
          items={applications.map(app => ({ x, y }) => (
            <ApplicationNode key={app.id} x={x} y={y} name={app.name} />
          ))}
        />
      </Layer>
    </Stage>
  );
};
