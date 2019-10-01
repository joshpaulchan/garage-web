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

const nextPosition = (lastPosition, step, scale, numberOfItems) => {
  return {
    x: lastPosition.x + Math.cos((step / numberOfItems) * Math.PI * 2) * scale,
    y: lastPosition.y + Math.sin((step / numberOfItems) * Math.PI * 2) * scale
  };
};

const layoutInCircle = items => {
  const stepSize = 1;
  const startingStep = 0;
  const startingPosition = {
    x: 800,
    y: 200
  };

  const scale = 250;
  const numberOfItems = items.length;

  return items.reduce(
    (current, item) => {
      const position = nextPosition(
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
const Layouter = ({ items }) => {
  return layoutInCircle(items).items;
};

export const ClusterMap = ({ applications }) => {
  return (
    <Stage width={1900} height={1440}>
      <Layer>
        <Layouter
          items={applications.map(app => ({ x, y }) => (
            <ApplicationNode key={app.id} x={x} y={y} name={app.name} />
          ))}
        />
      </Layer>
    </Stage>
  );
};
