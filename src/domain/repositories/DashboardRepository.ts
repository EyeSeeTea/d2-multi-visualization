import { FutureData } from "../../data/api-futures";
import { Dashboard } from "../Dashboard";

export interface DashboardRepository {
    getAll(): FutureData<Dashboard[]>;
}
