import { Visualization } from "../../domain/Visualization";
import { Id } from "../../domain/entities/Ref";
import { createVisualization } from "../../domain/entities/__tests__/visualizationFixtures";
import { Future } from "../../domain/entities/generic/Future";
import { VisualizationRepository } from "../../domain/repositories/VisualizationRepository";
import { FutureData } from "../api-futures";

export class VisualizationTestRepository implements VisualizationRepository {
    public getByIds(ids: Id[]): FutureData<Visualization[]> {
        if (ids.length === 0) return Future.success([]);
        return Future.success([
            createVisualization("chartPlugin", "BAR"),
            createVisualization("eventChartPlugin", "LINE"),
            createVisualization("eventReportPlugin", "AREA"),
            createVisualization("reportTablePlugin", "PIVOT_TABLE"),
        ]);
    }
}
