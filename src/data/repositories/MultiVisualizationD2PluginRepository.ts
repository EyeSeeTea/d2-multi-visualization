import { MultiVisualization } from "../../domain/MultiVisualization";
import { Future } from "../../domain/entities/generic/Future";
import { MultiVisualizationRepository } from "../../domain/repositories/MultiVisualizationRepository";
import { FutureData } from "../api-futures";

export class MultiVisualizationD2PluginRepository implements MultiVisualizationRepository {
    render(visualizations: MultiVisualization[]): FutureData<MultiVisualization[]> {
        visualizations.forEach(visualizationDetail => {
            window[visualizationDetail.pluginType].load([
                {
                    id: visualizationDetail.id,
                    el: `${visualizationDetail.orgUnit}_${visualizationDetail.id}`,
                    filters: visualizationDetail.filters,
                    rows: visualizationDetail.rows,
                    columns: visualizationDetail.columns,
                },
            ]);
        });
        return Future.success(visualizations);
    }
}
