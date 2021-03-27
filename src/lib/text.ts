import { Vector } from "./math";
import { context } from "../lib";

export const text = (str: unknown, position: Vector) => {
  context.fillText(String(str), position.x, position.y);
};

export const textSize = (size: number) => {
  context.font = `${size}px serif`;
};
