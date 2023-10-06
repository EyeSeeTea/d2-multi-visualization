import { getTestCompositionRoot } from "../../../CompositionRoot";
import {
    createEventChartItem,
    createEventReportItem,
    createVisualizationChartItem,
    createVisualizationTableItem,
} from "../../entities/__tests__/dashboardFixtures";

describe("GetVisualizationsByIdUseCase", () => {
    it("returns pluginType for visualizations", async () => {
        const compositionRoot = getTestCompositionRoot();

        const request = compositionRoot.visualizations.getByIds.execute([
            createEventChartItem(),
            createEventReportItem(),
            createVisualizationChartItem(),
            createVisualizationTableItem(),
        ]);

        const visualizations = await request.toPromise();

        expect(visualizations).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    pluginType: "eventChartPlugin",
                }),
                expect.objectContaining({
                    pluginType: "chartPlugin",
                }),
                expect.objectContaining({
                    pluginType: "eventReportPlugin",
                }),
                expect.objectContaining({
                    pluginType: "reportTablePlugin",
                }),
            ])
        );
    });
});
