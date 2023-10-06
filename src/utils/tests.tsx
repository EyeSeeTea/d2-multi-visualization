import { render, RenderResult } from "@testing-library/react";
import { SnackbarProvider } from "@eyeseetea/d2-ui-components";
import { ReactNode } from "react";
import { AppContext, AppContextState } from "../webapp/contexts/app-context";
import { getTestCompositionRoot } from "../CompositionRoot";
import { createAdminUser } from "../domain/entities/__tests__/userFixtures";
import { D2Api } from "../types/d2-api";

export function getTestContext() {
    const context: AppContextState = {
        api: {} as D2Api,
        currentUser: createAdminUser(),
        compositionRoot: getTestCompositionRoot(),
        isDev: true,
    };

    return context;
}

export async function getReactComponent(children: ReactNode): Promise<RenderResult> {
    const context = getTestContext();

    return render(
        <AppContext.Provider value={context}>
            <SnackbarProvider>{children}</SnackbarProvider>
        </AppContext.Provider>
    );
}
