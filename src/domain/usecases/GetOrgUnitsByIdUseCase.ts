import { FutureData } from "../../data/api-futures";
import { OrgUnit } from "../entities/OrgUnit";
import { Id } from "../entities/Ref";
import _ from "../entities/generic/Collection";
import { OrgUnitRepository } from "../repositories/OrgUnitRepository";

export class GetOrgUnitsByIdUseCase {
    constructor(private orgUnitRepository: OrgUnitRepository) {}

    public execute(id: Id): FutureData<OrgUnit> {
        return this.orgUnitRepository.getById(id).map(orgUnit => {
            return {
                ...orgUnit,
                children: _(orgUnit.children)
                    .sortBy(ou => ou.name)
                    .value(),
            };
        });
    }
}
