import { OrgUnit } from "../../domain/entities/OrgUnit";
import { Future } from "../../domain/entities/generic/Future";
import { OrgUnitRepository } from "../../domain/repositories/OrgUnitRepository";
import { FutureData } from "../api-futures";

export class OrgUnitTestRepository implements OrgUnitRepository {
    getUserOnly(): FutureData<OrgUnit[]> {
        return Future.success([]);
    }

    getById(): FutureData<OrgUnit> {
        return Future.success({
            children: [],
            id: "",
            level: 1,
            name: "",
            path: "",
        });
    }
}
