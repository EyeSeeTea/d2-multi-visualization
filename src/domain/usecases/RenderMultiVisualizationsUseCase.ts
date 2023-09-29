import { FutureData } from "../../data/api-futures";
import { Visualization, Dimension } from "../Visualization";
import { MultiVisualization } from "../MultiVisualization";
import { OrgUnit } from "../entities/OrgUnit";
import { Id, Ref } from "../entities/Ref";
import { Future } from "../entities/generic/Future";
import { MultiVisualizationRepository } from "../repositories/MultiVisualizationRepository";

type OrgUnitIds = Pick<OrgUnit, "id">;

export class RenderMultiVisualizationsUseCase {
    constructor(private multiVisualizationRepository: MultiVisualizationRepository) {}

    public execute(
        visualizations: Visualization[],
        orgUnits: OrgUnitIds[]
    ): FutureData<MultiVisualization[]> {
        return Future.success(
            this.generateVisualizationPerOrgUnit(visualizations, orgUnits)
        ).flatMap(multiVisualizations => {
            return this.multiVisualizationRepository.render(multiVisualizations);
        });
    }

    private generateVisualizationPerOrgUnit(
        visualizations: Visualization[],
        orgUnits: OrgUnitIds[]
    ): MultiVisualization[] {
        return orgUnits
            .map(orgUnit => {
                return visualizations.map(visualization => {
                    return {
                        ...visualization,
                        orgUnit: orgUnit.id,
                        rows: visualization.rows.map(row => {
                            return {
                                ...row,
                                items: this.replaceOrgUnitInDimension(row, orgUnit.id),
                            };
                        }),
                        filters:
                            visualization.filters.length > 0
                                ? visualization.filters.map(filter => {
                                      return {
                                          ...filter,
                                          items: this.replaceOrgUnitInDimension(filter, orgUnit.id),
                                      };
                                  })
                                : this.addDefaultDimension(orgUnit.id),
                        columns: visualization.columns.map(column => {
                            return {
                                ...column,
                                items: this.replaceOrgUnitInDimension(column, orgUnit.id),
                            };
                        }),
                    };
                });
            })
            .flatMap(visualizationWithOrgUnits => visualizationWithOrgUnits);
    }

    private replaceOrgUnitInDimension(visualizationFilter: Dimension, orgUnitId: Id): Ref[] {
        return visualizationFilter.dimension === "ou"
            ? visualizationFilter.items.map(() => {
                  return {
                      id: orgUnitId,
                  };
              })
            : visualizationFilter.items;
    }

    private addDefaultDimension(orgUnitId: Id): Dimension[] {
        return [
            {
                dimension: "ou",
                items: [
                    {
                        id: orgUnitId,
                    },
                ],
            },
        ];
    }
}
