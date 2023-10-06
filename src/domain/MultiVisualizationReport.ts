import { Dashboard } from "./Dashboard";
import { OrgUnit } from "./entities/OrgUnit";

export type MultiVisualizationReport = {
    dashboards: Dashboard[];
    orgUnits: OrgUnit[];
    numberOfColumnsData: SelectorOptions[];
};

type SelectorOptions = { text: string; value: string };
