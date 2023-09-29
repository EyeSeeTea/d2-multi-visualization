import { DashboardD2Repository } from "./data/repositories/DashboardD2Repository";
import { DashboardTestRepository } from "./data/repositories/DashboardTestRepository";
import { MultiVisualizationD2PluginRepository } from "./data/repositories/MultiVisualizationD2PluginRepository";
import { MultiVisualizationTestRepository } from "./data/repositories/MultiVisualizationTestRepository";
import { OrgUnitD2Repository } from "./data/repositories/OrgUnitD2Repository";
import { OrgUnitTestRepository } from "./data/repositories/OrgUnitTestRepository";
import { UserD2Repository } from "./data/repositories/UserD2Repository";
import { UserTestRepository } from "./data/repositories/UserTestRepository";
import { VisualizationD2Repository } from "./data/repositories/VisualizationD2Repository";
import { VisualizationTestRepository } from "./data/repositories/VisualizationTestRepository";
import { DashboardRepository } from "./domain/repositories/DashboardRepository";
import { MultiVisualizationRepository } from "./domain/repositories/MultiVisualizationRepository";
import { OrgUnitRepository } from "./domain/repositories/OrgUnitRepository";
import { UserRepository } from "./domain/repositories/UserRepository";
import { VisualizationRepository } from "./domain/repositories/VisualizationRepository";
import { GetCurrentUserUseCase } from "./domain/usecases/GetCurrentUserUseCase";
import { GetDashboardsUseCase } from "./domain/usecases/GetDashboardsUseCase";
import { GetOrgUnitsUserOnlyUseCase } from "./domain/usecases/GetOrgUnitUserOnlyUseCase";
import { GetOrgUnitsByIdUseCase } from "./domain/usecases/GetOrgUnitsByIdUseCase";
import { GetVisualizationsByIdUseCase } from "./domain/usecases/GetVisualizationsByIdUseCase";
import { RenderMultiVisualizationsUseCase } from "./domain/usecases/RenderMultiVisualizationsUseCase";
import { D2Api } from "./types/d2-api";

export type CompositionRoot = ReturnType<typeof getCompositionRoot>;

type Repositories = {
    usersRepository: UserRepository;
    dashboardRepository: DashboardRepository;
    orgUnitRepository: OrgUnitRepository;
    visualizationRepository: VisualizationRepository;
    multiVisualizationRepository: MultiVisualizationRepository;
};

function getCompositionRoot(repositories: Repositories) {
    return {
        dashboards: {
            getAll: new GetDashboardsUseCase(repositories.dashboardRepository),
        },
        visualizations: {
            getByIds: new GetVisualizationsByIdUseCase(repositories.visualizationRepository),
        },
        multiVisualizations: {
            render: new RenderMultiVisualizationsUseCase(repositories.multiVisualizationRepository),
        },
        orgUnits: {
            getUserOnly: new GetOrgUnitsUserOnlyUseCase(repositories.orgUnitRepository),
            getById: new GetOrgUnitsByIdUseCase(repositories.orgUnitRepository),
        },
        users: {
            getCurrent: new GetCurrentUserUseCase(repositories.usersRepository),
        },
    };
}

export function getWebappCompositionRoot(api: D2Api) {
    const repositories: Repositories = {
        usersRepository: new UserD2Repository(api),
        dashboardRepository: new DashboardD2Repository(api),
        orgUnitRepository: new OrgUnitD2Repository(api),
        visualizationRepository: new VisualizationD2Repository(api),
        multiVisualizationRepository: new MultiVisualizationD2PluginRepository(),
    };

    return getCompositionRoot(repositories);
}

export function getTestCompositionRoot() {
    const repositories: Repositories = {
        usersRepository: new UserTestRepository(),
        dashboardRepository: new DashboardTestRepository(),
        orgUnitRepository: new OrgUnitTestRepository(),
        visualizationRepository: new VisualizationTestRepository(),
        multiVisualizationRepository: new MultiVisualizationTestRepository(),
    };

    return getCompositionRoot(repositories);
}
