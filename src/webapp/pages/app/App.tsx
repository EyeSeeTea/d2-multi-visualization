import { HeaderBar } from "@dhis2/ui";
import { Feedback } from "@eyeseetea/feedback-component";
import { MuiThemeProvider } from "@material-ui/core/styles";
//@ts-ignore
import OldMuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { useEffect, useState } from "react";
import { SnackbarProvider, LoadingProvider } from "@eyeseetea/d2-ui-components";

import { appConfig } from "../../../app-config";
import { CompositionRoot } from "../../../CompositionRoot";
import Share from "../../components/share/Share";
import { AppContext, AppContextState } from "../../contexts/app-context";
import { Router } from "../Router";
import "./App.css";
import muiThemeLegacy from "./themes/dhis2-legacy.theme";
import { muiTheme } from "./themes/dhis2.theme";

import { D2Api } from "../../../types/d2-api";

export interface AppProps {
    api: D2Api;
    compositionRoot: CompositionRoot;
}

function App(props: AppProps) {
    const { compositionRoot, api } = props;
    const [showShareButton, setShowShareButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [appContext, setAppContext] = useState<AppContextState | null>(null);

    useEffect(() => {
        async function setup() {
            const isShareButtonVisible = appConfig.appearance.showShareButton;
            const currentUser = await compositionRoot.users.getCurrent.execute().toPromise();
            if (!currentUser) throw new Error("User not logged in");

            setAppContext({ api, currentUser, compositionRoot, isDev: import.meta.env.DEV });
            setShowShareButton(isShareButtonVisible);
            setLoading(false);
        }
        setup();
    }, [compositionRoot, api]);

    if (loading) return null;

    return (
        <MuiThemeProvider theme={muiTheme}>
            <OldMuiThemeProvider muiTheme={muiThemeLegacy}>
                {/* @ts-ignore */}
                <LoadingProvider>
                    <SnackbarProvider>
                        <HeaderBar appName="Multi Visualization" />

                        {appConfig.feedback && appContext && (
                            <Feedback
                                options={appConfig.feedback}
                                username={appContext.currentUser.username}
                            />
                        )}

                        <div id="app" className="content">
                            <AppContext.Provider value={appContext}>
                                <Router />
                            </AppContext.Provider>
                        </div>

                        <Share visible={showShareButton} />
                    </SnackbarProvider>
                </LoadingProvider>
            </OldMuiThemeProvider>
        </MuiThemeProvider>
    );
}

export default React.memo(App);
