import { FutureData } from "../../data/api-futures";
import { Dashboard } from "../Dashboard";
import { DashboardRepository } from "../repositories/DashboardRepository";

export class GetDashboardsUseCase {
    constructor(private dashboardRepository: DashboardRepository) {}

    public execute(): FutureData<Dashboard[]> {
        return this.dashboardRepository.getAll();
    }
}
