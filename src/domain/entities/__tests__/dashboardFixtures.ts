import { DashboardItem, SimpleVisualization } from "../../Dashboard";

export function createEventChartItem(): DashboardItem {
    return createDashboardItem({
        type: "EVENT_CHART",
        eventChart: {
            id: "yMoTWVrYvwM",
            name: "",
            type: "COLUMN",
        },
    });
}

export function createEventReportItem(): DashboardItem {
    return createDashboardItem({
        type: "EVENT_REPORT",
        eventReport: {
            id: "yMoTWVrYvwM",
            name: "",
            type: "COLUMN",
        },
    });
}

export function createVisualizationTableItem(): DashboardItem {
    return createDashboardItem({
        type: "VISUALIZATION",
        visualization: {
            id: "yMoTWVrYvwM",
            name: "",
            type: "PIVOT_TABLE",
        },
    });
}

export function createVisualizationChartItem(): DashboardItem {
    return createDashboardItem({
        type: "VISUALIZATION",
        visualization: {
            id: "yMoTWVrYvwM",
            name: "",
            type: "BAR",
        },
    });
}

type DashboardItemType = "EVENT_CHART" | "EVENT_REPORT" | "VISUALIZATION";

function createDashboardItem({
    type,
    visualization,
    eventChart,
    eventReport,
}: {
    type: DashboardItemType;
    visualization?: SimpleVisualization;
    eventChart?: SimpleVisualization;
    eventReport?: SimpleVisualization;
}): DashboardItem {
    return {
        id: "DxXJfeiYMPD",
        eventReport,
        visualization,
        eventChart,
        type,
    };
}
