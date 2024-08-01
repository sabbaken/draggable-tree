import {random} from "lodash";

export const generateRandomId = (min = 1, max = 1_000_000) => {
  return random(min, max);
};