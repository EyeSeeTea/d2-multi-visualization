import { Dashboard } from "../../domain/Dashboard";
import { Future } from "../../domain/entities/generic/Future";
import { DashboardRepository } from "../../domain/repositories/DashboardRepository";
import { FutureData } from "../api-futures";

export class DashboardTestRepository implements DashboardRepository {
    public getAll(): FutureData<Dashboard[]> {
        return Future.success([]);
    }
}
