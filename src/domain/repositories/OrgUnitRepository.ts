import { OrgUnit } from "../entities/OrgUnit";
import { FutureData } from "../../data/api-futures";
import { Id } from "../entities/Ref";

export interface OrgUnitRepository {
    getUserOnly(): FutureData<OrgUnit[]>;
    getById(id: Id): FutureData<OrgUnit>;
}
