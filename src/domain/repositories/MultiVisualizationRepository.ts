import { FutureData } from "../../data/api-futures";
import { MultiVisualization } from "../MultiVisualization";

export interface MultiVisualizationRepository {
    render(visualizations: MultiVisualization[]): FutureData<MultiVisualization[]>;
}
