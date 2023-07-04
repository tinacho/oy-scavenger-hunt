import { pathOr, path, pipe, sum, uniqBy, map } from "ramda";

export const getTeamScore = pipe(
  pathOr([], ["solutions", "data"]),
  uniqBy(path(["challenge", "_id"])),
  map(pathOr(0, ["challenge", "score"])),
  sum
);
