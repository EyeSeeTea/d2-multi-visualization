import React from "react";
import styled from "styled-components";
import { Button, Dialog, DialogActions, DialogContent } from "@material-ui/core";
import { OrgUnitsSelector } from "@eyeseetea/d2-ui-components";

import { useAppContext } from "../../contexts/app-context";
import _ from "../../../domain/entities/generic/Collection";
import i18n from "../../../utils/i18n";
import { useOrgUnitsFromUser } from "../../hooks/hooks";
import { SelectedOrgUnit } from "../../pages/landing/MultiVisualizationPage";

type OrgUnitFilterProps = {
    buttonText: string;
    onClick: (orgUnit: SelectedOrgUnit) => void;
};

const orgUnitControls = {
    filterByLevel: false,
    filterByGroup: false,
    selectAll: false,
};

const orgUnitListParams = {
    fields: {
        id: true,
        level: true,
        displayName: true,
        path: true,
        children: true,
        shortName: true,
    },
};

export const OrgUnitFilter: React.FC<OrgUnitFilterProps> = React.memo(props => {
    const { buttonText, onClick } = props;
    const { api } = useAppContext();
    const [selectedOrgUnit, setSelectedOrgUnit] = React.useState<SelectedOrgUnit>();
    const [orgUnitModal, setOrgUnitModal] = React.useState(true);
    const orgUnits = useOrgUnitsFromUser();

    const orgUnitRootIds = orgUnits.map(ou => ou.id);

    const onChangeOrgUnit = (orgUnitsPaths: string[]) => {
        const lastPathOrgUnit = _(orgUnitsPaths).last();

        if (lastPathOrgUnit) {
            const split = lastPathOrgUnit.split("/");
            const lastValue = _(split).compact().last();
            if (!lastValue) throw Error(`Cannot find OrgUnit ID from path: ${lastPathOrgUnit}`);

            setSelectedOrgUnit({
                id: lastValue,
                path: lastPathOrgUnit,
            });
        }
    };

    return (
        <>
            <Button onClick={() => setOrgUnitModal(true)} variant="contained" color="primary">
                {buttonText}
            </Button>

            <Dialog open={orgUnitModal}>
                <DialogContent>
                    <OrgUnitSelectorContainer>
                        {orgUnitRootIds.length > 0 && (
                            <OrgUnitsSelector
                                api={api}
                                onChange={onChangeOrgUnit}
                                showNameSetting
                                rootIds={orgUnitRootIds}
                                withElevation={false}
                                typeInput="radio"
                                selected={selectedOrgUnit ? [selectedOrgUnit.path] : []}
                                controls={orgUnitControls}
                                listParams={orgUnitListParams}
                            />
                        )}
                    </OrgUnitSelectorContainer>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            if (selectedOrgUnit) {
                                setOrgUnitModal(false);
                                onClick(selectedOrgUnit);
                            }
                        }}
                        disabled={selectedOrgUnit === undefined}
                        variant="contained"
                        color="primary"
                    >
                        {i18n.t("OK")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

const OrgUnitSelectorContainer = styled.div`
    overflow-x: hidden;
`;
