import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { ExamplePage } from "./example/ExamplePage";
import { MultiVisualizationPage } from "./landing/MultiVisualizationPage";

export function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route
                    path="/for/:name?"
                    render={({ match }) => <ExamplePage name={match.params.name ?? "Stranger"} />}
                />

                {/* Default route */}
                <Route render={() => <MultiVisualizationPage />} />
            </Switch>
        </HashRouter>
    );
}
