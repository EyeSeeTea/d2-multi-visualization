import { Dashboard } from "../../domain/Dashboard";
import { DashboardRepository } from "../../domain/repositories/DashboardRepository";
import { D2Api } from "../../types/d2-api";
import { apiToFuture, FutureData } from "../api-futures";

export class DashboardD2Repository implements DashboardRepository {
    constructor(private api: D2Api) {}

    public getAll(): FutureData<Dashboard[]> {
        return apiToFuture(
            this.api.metadata.get({
                dashboards: {
                    fields: {
                        id: true,
                        name: true,
                        dashboardItems: {
                            id: true,
                            eventReport: {
                                id: true,
                                name: true,
                                type: true,
                            },
                            eventChart: {
                                id: true,
                                name: true,
                                type: true,
                            },
                            type: true,
                            visualization: {
                                id: true,
                                name: true,
                                type: true,
                            },
                        },
                    },
                },
            })
        ).map(d2Response => d2Response.dashboards);
    }
}
