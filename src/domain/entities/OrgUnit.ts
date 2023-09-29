import { Id } from "./Ref";
import _ from "./generic/Collection";

export type OrgUnit = {
    id: Id;
    name: string;
    level: number;
    path: string;
    children: Pick<OrgUnit, "id" | "name">[];
};
