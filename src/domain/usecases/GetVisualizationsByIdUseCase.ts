import { FutureData } from "../../data/api-futures";
import { DashboardItem } from "../Dashboard";
import { PluginType, Visualization } from "../Visualization";
import _ from "../entities/generic/Collection";
import { Future } from "../entities/generic/Future";
import { VisualizationRepository } from "../repositories/VisualizationRepository";

export class GetVisualizationsByIdUseCase {
    constructor(private visualizationRepository: VisualizationRepository) {}

    public execute(dashboardItems: DashboardItem[]): FutureData<Visualization[]> {
        return this.getVisualizationsByType(dashboardItems);
    }

    private getVisualizationsByType(dashboardItems: DashboardItem[]): FutureData<Visualization[]> {
        const visualizationsIds = _(dashboardItems)
            .map(dashboardItem =>
                dashboardItem.type === "VISUALIZATION" ? dashboardItem.visualization?.id : undefined
            )
            .compact()
            .value();

        const eventChartsIds = _(dashboardItems)
            .map(dashboardItem =>
                dashboardItem.type === "EVENT_CHART" ? dashboardItem.eventChart?.id : undefined
            )
            .compact()
            .value();

        const eventReportsIds = _(dashboardItems)
            .map(dashboardItem =>
                dashboardItem.type === "EVENT_REPORT" ? dashboardItem.eventReport?.id : undefined
            )
            .compact()
            .value();

        return Future.joinObj({
            visualizations: this.visualizationRepository.getByIds(
                visualizationsIds,
                "visualizations"
            ),
            eventCharts: this.visualizationRepository.getByIds(eventChartsIds, "eventCharts"),
            eventReports: this.visualizationRepository.getByIds(eventReportsIds, "eventReports"),
        }).map(({ eventCharts, eventReports, visualizations }) => {
            const eventChartsWithPluginInfo = this.addPluginType(eventCharts, "eventChartPlugin");
            const eventReportsWithPluginInfo = this.addPluginType(
                eventReports,
                "eventReportPlugin"
            );
            const visualizationsWithPluginInfo: Visualization[] = visualizations.map(
                visualization => {
                    return {
                        ...visualization,
                        pluginType:
                            visualization.type === "PIVOT_TABLE"
                                ? "reportTablePlugin"
                                : "chartPlugin",
                    };
                }
            );

            return [
                ...eventChartsWithPluginInfo,
                ...eventReportsWithPluginInfo,
                ...visualizationsWithPluginInfo,
            ];
        });
    }

    private addPluginType(
        visualizations: Visualization[],
        pluginType: PluginType
    ): Visualization[] {
        return visualizations.map(eventChart => {
            return {
                ...eventChart,
                pluginType,
            };
        });
    }
}
