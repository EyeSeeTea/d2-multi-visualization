import { Maybe } from "../utils/ts-utils";
import { Visualization } from "./Visualization";
import { NamedRef, Ref } from "./entities/Ref";

export interface Dashboard extends NamedRef {
    dashboardItems: DashboardItem[];
}

export interface DashboardItem extends Ref {
    type: string;
    eventReport: SimpleVisualization;
    eventChart: SimpleVisualization;
    visualization: SimpleVisualization;
}

export type SimpleVisualization = Maybe<Pick<Visualization, "id" | "name" | "type">>;
