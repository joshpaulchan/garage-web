import { Stage, Layer, Circle, Text } from "react-konva";
import Konva from "konva";

const NODE_SIZE = 40;

export const ApplicationNode = ({ name, x, y }) => {
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

const nextCircularPosition = (origin, step, scale, numberOfItems) => {
  const radian = (step / numberOfItems) * Math.PI * 2;
  return {
    x: origin.x + Math.cos(radian) * scale,
    y: origin.y + Math.sin(radian) * scale
  };
};

const layoutInCircle = (height, width, items) => {
  const origin = { x: width / 2, y: height / 2 };
  const stepSize = 1;
  const startingStep = 0;
  const startingPosition = origin;

  const scale = 250;
  const numberOfItems = items.length;

  return items.reduce(
    (current, item) => {
      const position = nextCircularPosition(
        origin,
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

const layoutInGrid = (height, width, items) => {
  const bufferSize = Math.max(75, NODE_SIZE / 4);
  const itemSize = NODE_SIZE + bufferSize;

  const horizontalPadding = 200;
  const verticalPading = 200;
  const startingPosition = { x: horizontalPadding, y: verticalPading };

  const totalPadding = 2 * horizontalPadding;
  const maxNumberOfItemsInRow = Math.floor(
    (width - startingPosition.x - totalPadding) / itemSize
  );

  const startingItemsInRow = 0;
  return items.reduce(
    (current, item) => {
      const lastPosition = current.position;
      let itemsInCurrentRow = current.itemsInCurrentRow;
      let position;
      if (itemsInCurrentRow > maxNumberOfItemsInRow) {
        position = {
          x: startingPosition.x,
          y: lastPosition.y + itemSize
        };
        itemsInCurrentRow = 0;
      } else {
        position = {
          x: lastPosition.x + itemSize,
          y: lastPosition.y
        };
        itemsInCurrentRow += 1;
      }

      return {
        lastPosition,
        position,
        itemsInCurrentRow,
        items: [current.items, item(position)]
      };
    },
    {
      position: startingPosition,
      itemsInCurrentRow: startingItemsInRow,
      items: []
    }
  );
};

// TODO: layout algorithm to make application nodes space out from each other properly
const Layouter = ({ items, height, width }) => {
  return layoutInCircle(height, width, items).items;
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
