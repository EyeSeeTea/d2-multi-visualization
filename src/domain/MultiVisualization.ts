import { Visualization } from "./Visualization";
import { Id } from "./entities/Ref";

export type MultiVisualization = Visualization & { orgUnit: Id };
