import { Visualization, eventUrlType } from "../../domain/Visualization";
import { Id } from "../../domain/entities/Ref";
import _ from "../../domain/entities/generic/Collection";
import { Future } from "../../domain/entities/generic/Future";
import { VisualizationRepository } from "../../domain/repositories/VisualizationRepository";
import { D2Api } from "../../types/d2-api";
import { apiToFuture, FutureData } from "../api-futures";

export class VisualizationD2Repository implements VisualizationRepository {
    constructor(private api: D2Api) {}

    public getByIds(ids: Id[], eventUrlType: eventUrlType): FutureData<Visualization[]> {
        const reqVisualizations = this.getVisualizationsRequests(ids, eventUrlType);
        return Future.parallel([...reqVisualizations], {
            concurrency: 5,
        }).map(d2Response => d2Response);
    }

    private getVisualizationsRequests(ids: Id[], type: eventUrlType) {
        return ids.map(id => {
            return apiToFuture(
                this.api.get<Visualization>(`/${type}/${id}`, {
                    fields: "id,name,type,rows[dimension,items],columns[dimension,items],filters[dimension,items]",
                })
            );
        });
    }
}
