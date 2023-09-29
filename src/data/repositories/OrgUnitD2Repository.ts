import { OrgUnit } from "../../domain/entities/OrgUnit";
import { Id } from "../../domain/entities/Ref";
import { OrgUnitRepository } from "../../domain/repositories/OrgUnitRepository";
import { D2Api } from "../../types/d2-api";
import { apiToFuture, FutureData } from "../api-futures";

export class OrgUnitD2Repository implements OrgUnitRepository {
    constructor(private api: D2Api) {}

    getUserOnly(): FutureData<OrgUnit[]> {
        return apiToFuture(
            this.api.models.organisationUnits.get({
                userOnly: true,
                fields: { id: true, name: true, level: true, path: true },
            })
        ).map(d2Response => {
            return d2Response.objects.map(d2OrgUnit => {
                return {
                    id: d2OrgUnit.id,
                    name: d2OrgUnit.name,
                    level: d2OrgUnit.level,
                    path: d2OrgUnit.path,
                    children: [],
                };
            });
        });
    }

    getById(id: Id): FutureData<OrgUnit> {
        return apiToFuture(
            this.api.metadata.get({
                organisationUnits: {
                    fields: {
                        id: true,
                        name: true,
                        level: true,
                        path: true,
                        children: {
                            id: true,
                            name: true,
                        },
                    },
                    filter: {
                        id: {
                            eq: id,
                        },
                    },
                },
            })
        ).map(d2Response => {
            const d2OrgUnit = d2Response.organisationUnits[0];
            if (!d2OrgUnit) throw Error(`Cannot find OrgUnit: ${id}`);
            return d2OrgUnit;
        });
    }
}
