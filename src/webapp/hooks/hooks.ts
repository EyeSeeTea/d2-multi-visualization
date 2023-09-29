import React from "react";
import { Dashboard } from "../../domain/Dashboard";
import { Visualization } from "../../domain/Visualization";
import { useAppContext } from "../contexts/app-context";
import _ from "../../domain/entities/generic/Collection";
import { Maybe } from "../../utils/ts-utils";
import { OrgUnit } from "../../domain/entities/OrgUnit";
import { Id } from "../../domain/entities/Ref";
import { LoadingState, SnackbarState, useLoading, useSnackbar } from "@eyeseetea/d2-ui-components";
import i18n from "../../utils/i18n";

type UseDashboardProps = {
    dashboard: Maybe<Dashboard>;
};

function showErrorAndHideLoading(
    snackbar: SnackbarState,
    loading: LoadingState,
    errorMessage: string
) {
    snackbar.error(errorMessage);
    loading.hide();
}

export function useVisualizations(props: UseDashboardProps): Visualization[] {
    const { dashboard } = props;
    const { compositionRoot } = useAppContext();
    const snackbar = useSnackbar();
    const loading = useLoading();
    const [visualizations, setVisualizations] = React.useState<Visualization[]>([]);

    React.useEffect(() => {
        if (dashboard) {
            loading.show(true, i18n.t("Loading Visualizations..."));
            compositionRoot.visualizations.getByIds.execute(dashboard.dashboardItems).run(
                result => {
                    setVisualizations(result);
                    loading.hide();
                },
                error => showErrorAndHideLoading(snackbar, loading, error.message)
            );
        }
    }, [dashboard, loading, compositionRoot, snackbar]);

    return visualizations;
}

export function useDashboards(): Dashboard[] {
    const { compositionRoot } = useAppContext();
    const loading = useLoading();
    const snackbar = useSnackbar();
    const [dashboards, setDashboards] = React.useState<Dashboard[]>([]);

    React.useEffect(() => {
        loading.show();
        compositionRoot.dashboards.getAll.execute().run(
            result => {
                setDashboards(result);
                loading.hide();
            },
            error => showErrorAndHideLoading(snackbar, loading, error.message)
        );
    }, [compositionRoot, loading, snackbar]);

    return dashboards;
}

export function useOrgUnitsFromUser(): OrgUnit[] {
    const { compositionRoot } = useAppContext();
    const loading = useLoading();
    const snackbar = useSnackbar();
    const [orgUnits, setOrgUnits] = React.useState<OrgUnit[]>([]);

    React.useEffect(() => {
        loading.show();
        compositionRoot.orgUnits.getUserOnly.execute().run(
            result => {
                setOrgUnits(result);
                loading.hide();
            },
            error => showErrorAndHideLoading(snackbar, loading, error.message)
        );
    }, [loading, compositionRoot, snackbar]);

    return orgUnits;
}

export function useOrgUnit({ orgUnitId }: { orgUnitId: Maybe<Id> }): Maybe<OrgUnit> {
    const { compositionRoot } = useAppContext();
    const snackbar = useSnackbar();
    const [orgUnit, setOrgUnit] = React.useState<OrgUnit>();

    React.useEffect(() => {
        if (orgUnitId) {
            compositionRoot.orgUnits.getById.execute(orgUnitId).run(
                orgUnit => {
                    setOrgUnit(orgUnit);
                },
                error => snackbar.error(error.message)
            );
        }
    }, [orgUnitId, compositionRoot, snackbar]);

    return orgUnit;
}

export function useRenderVisualizations({
    orgUnit,
    visualizations,
    showVisualizations,
}: {
    orgUnit: Maybe<OrgUnit>;
    visualizations: Visualization[];
    showVisualizations: boolean;
}) {
    const { compositionRoot } = useAppContext();
    const loading = useLoading();
    const snackbar = useSnackbar();

    React.useEffect(() => {
        if (orgUnit && visualizations && showVisualizations) {
            loading.show(true, i18n.t("Generating Visualizations..."));
            compositionRoot.multiVisualizations.render
                .execute(visualizations, orgUnit.children)
                .run(
                    () => loading.hide(),
                    error => showErrorAndHideLoading(snackbar, loading, error.message)
                );
        }
    }, [showVisualizations, orgUnit, visualizations, loading, compositionRoot, snackbar]);
}
