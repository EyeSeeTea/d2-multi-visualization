import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

import { OrgUnit } from "../../../domain/entities/OrgUnit";
import { Dashboard } from "../../../domain/Dashboard";
import { Dimension, Visualization } from "../../../domain/Visualization";
import _ from "../../../domain/entities/generic/Collection";
import i18n from "../../../utils/i18n";
import { DomSelector, Id } from "../../../domain/entities/Ref";
import { useOrgUnit, useRenderVisualizations } from "../../hooks/hooks";
import { Maybe } from "../../../utils/ts-utils";
import { OrgUnitFilter } from "../../components/org-unit-filter/OrgUnitFilter";
import { MultiVisualizationFilter } from "../../components/multi-visualization-filter/MultiVisualizationFilter";

export type SelectedOrgUnit = Pick<OrgUnit, "id" | "path">;

export type FiltersState = {
    dashboard: Maybe<Dashboard>;
    visualizations: Visualization[];
    visualizationsPerRow: string;
};

export const MultiVisualizationPage: React.FC = React.memo(() => {
    const [selectedOrgUnit, setSelectedOrgUnit] = React.useState<SelectedOrgUnit>();
    const [showVisualizations, setShowVisualizations] = React.useState(false);

    const [filterValues, setFilterValues] = React.useState<FiltersState>({
        dashboard: undefined,
        visualizationsPerRow: "1",
        visualizations: [],
    });

    const orgUnit = useOrgUnit({ orgUnitId: selectedOrgUnit?.id });

    useRenderVisualizations({
        orgUnit,
        visualizations: filterValues.visualizations,
        showVisualizations,
    });

    const onGenerateVisualizations = () => {
        setShowVisualizations(true);
    };

    const orgUnitModalButtonText = orgUnit
        ? `${i18n.t("Select Organisation Unit")} - ${orgUnit.name}`
        : i18n.t("Select Organisation Unit");

    return (
        <Container>
            <OrgUnitFilter
                buttonText={orgUnitModalButtonText}
                onClick={orgUnit => {
                    setSelectedOrgUnit(orgUnit);
                }}
            />

            <MultiVisualizationFilter
                filterValues={filterValues}
                onChange={filterValues => {
                    setFilterValues(filterValues);
                    setShowVisualizations(false);
                }}
                onClick={onGenerateVisualizations}
            />

            {showVisualizations &&
                orgUnit &&
                filterValues.visualizations.length > 0 &&
                filterValues.visualizations.map(vis => {
                    return (
                        <VisualizationPanel key={vis.id}>
                            <Typography className="title" variant="body2">
                                {vis.name}
                            </Typography>
                            <VisualizationGrid columns={filterValues.visualizationsPerRow}>
                                {orgUnit.children.map(orgUnit => {
                                    return (
                                        <PluginContainer
                                            key={orgUnit.id}
                                            id={`${orgUnit.id}_${vis.id}`}
                                        />
                                    );
                                })}
                            </VisualizationGrid>
                        </VisualizationPanel>
                    );
                })}
        </Container>
    );
});

interface PluginData {
    url: string;
    load(reports: ReportItem[]): void;
}

type ReportItem = {
    id: Id;
    el: DomSelector;
    filters: Dimension[];
    rows: Dimension[];
    columns: Dimension[];
};

declare global {
    interface Window {
        eventChartPlugin: PluginData;
        eventReportPlugin: PluginData;
        chartPlugin: PluginData;
        reportTablePlugin: PluginData;
    }
}

const Container = styled.div`
    padding: 1em;
`;

const VisualizationPanel = styled.div`
    .title {
        font-size: 2em;
    }
`;

const VisualizationGrid = styled.div<{ columns: string }>`
    gap: 1em;
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, minmax(0, 1fr));
    padding: 2em 0;
`;

const PluginContainer = styled.div`
    overflow: auto;
`;
