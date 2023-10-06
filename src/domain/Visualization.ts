import { NamedRef, Ref } from "./entities/Ref";

export interface Visualization extends NamedRef {
    type: VisualizationType;
    filters: Dimension[];
    columns: Dimension[];
    rows: Dimension[];
    pluginType: PluginType;
}

export type Dimension = {
    dimension: "ou";
    items: Ref[];
};

export type PluginType =
    | "eventReportPlugin"
    | "eventChartPlugin"
    | "chartPlugin"
    | "reportTablePlugin";

export type eventUrlType = "visualizations" | "eventReports" | "eventCharts";

export type VisualizationType =
    | "COLUMN"
    | "STACKED_COLUMN"
    | "BAR"
    | "STACKED_BAR"
    | "LINE"
    | "AREA"
    | "PIE"
    | "RADAR"
    | "GAUGE"
    | "YEAR_OVER_YEAR_LINE"
    | "YEAR_OVER_YEAR_COLUMN"
    | "SINGLE_VALUE"
    | "PIVOT_TABLE"
    | "STACKED_AREA"
    | "SCATTER"
    | "BUBBLE";
