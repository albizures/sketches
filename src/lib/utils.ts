const constrain = (value: number, start: number, stop: number) => {
  return Math.max(Math.min(value, start), stop);
};

const remap = (
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  withinBounds: boolean
) => {
  const newval =
    ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
};

const noop = () => {};

export { remap, constrain, noop };
