import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Dropdown, MultipleDropdown } from "@eyeseetea/d2-ui-components";

import _ from "../../../domain/entities/generic/Collection";
import { useDashboards, useVisualizations } from "../../hooks/hooks";
import { Maybe } from "../../../utils/ts-utils";
import i18n from "../../../utils/i18n";
import { FiltersState } from "../../pages/landing/MultiVisualizationPage";

type MultiVisualizationFilterProps = {
    onClick: () => void;
    onChange: React.Dispatch<React.SetStateAction<FiltersState>>;
    filterValues: FiltersState;
};

const numberOfColumnsData = Array.from({ length: 4 }, (_, i) => ({
    text: (i + 1).toString(),
    value: (i + 1).toString(),
}));

export const MultiVisualizationFilter: React.FC<MultiVisualizationFilterProps> = React.memo(
    props => {
        const { filterValues, onChange, onClick } = props;
        const visualizations = useVisualizations({ dashboard: filterValues.dashboard });
        const dashboards = useDashboards();

        const onChangeDashboard = (value: Maybe<string>) => {
            const dashboard = dashboards.find(dashboard => dashboard.id === value);
            if (dashboard) {
                onChange(prev => ({ ...prev, dashboard, visualizations: [] }));
            }
        };

        const onChangeVisualization = (ids: string[]) => {
            const selectedVisualizations = visualizations.filter(visualization =>
                ids.includes(visualization.id)
            );
            onChange(prev => ({ ...prev, visualizations: selectedVisualizations }));
        };

        const onChangeColumns = (value: Maybe<string>) => {
            if (value) {
                onChange(prev => ({ ...prev, visualizationsPerRow: value }));
            }
        };

        const dashboardItems = dashboards.map(dashboard => {
            return {
                text: dashboard.name,
                value: dashboard.id,
            };
        });

        const disableButton = !filterValues.dashboard || filterValues.visualizations.length === 0;

        return (
            <FiltersContainer>
                <FilterItem>
                    <Dropdown
                        label={i18n.t("Select Dashboard")}
                        items={dashboardItems}
                        onChange={value => onChangeDashboard(value)}
                        value={filterValues.dashboard?.id}
                        hideEmpty
                    />
                </FilterItem>

                <FilterItem className="dropdown-visualizations">
                    <MultipleDropdown
                        className="visualizations"
                        label={i18n.t("Select Visualizations")}
                        items={visualizations.map(visuzalization => ({
                            text: visuzalization.name,
                            value: visuzalization.id,
                        }))}
                        onChange={value => onChangeVisualization(value)}
                        values={filterValues.visualizations.map(sv => sv.id)}
                    />
                </FilterItem>

                <FilterItem>
                    <Dropdown
                        label={i18n.t("Graphs per row")}
                        items={numberOfColumnsData}
                        onChange={value => onChangeColumns(value)}
                        value={filterValues.visualizationsPerRow}
                        hideEmpty
                    />
                </FilterItem>

                <FilterItem>
                    <Button
                        disabled={disableButton}
                        onClick={onClick}
                        variant="contained"
                        color="primary"
                    >
                        {i18n.t("Generate")}
                    </Button>
                </FilterItem>
            </FiltersContainer>
        );
    }
);

const FiltersContainer = styled.div`
    display: flex;
    gap: 2em;
    padding: 2em 0;

    .dropdown-visualizations {
        min-width: 400px;
    }
`;

const FilterItem = styled.div`
    padding: 1em 0;
    .visualizations {
        width: 100%;
    }
`;
