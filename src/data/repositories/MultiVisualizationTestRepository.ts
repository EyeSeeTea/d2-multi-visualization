import { MultiVisualization } from "../../domain/MultiVisualization";
import { Future } from "../../domain/entities/generic/Future";
import { MultiVisualizationRepository } from "../../domain/repositories/MultiVisualizationRepository";
import { FutureData } from "../api-futures";

export class MultiVisualizationTestRepository implements MultiVisualizationRepository {
    render(): FutureData<MultiVisualization[]> {
        return Future.success([]);
    }
}
