import { FutureData } from "../../data/api-futures";
import { Visualization, eventUrlType } from "../Visualization";
import { Id } from "../entities/Ref";

export interface VisualizationRepository {
    getByIds(ids: Id[], eventUrlType: eventUrlType): FutureData<Visualization[]>;
}
