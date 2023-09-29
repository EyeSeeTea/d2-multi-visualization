import { PluginType, Visualization, VisualizationType } from "../../Visualization";

export function createVisualization(
    pluginType: PluginType,
    type: VisualizationType
): Visualization {
    return {
        type,
        filters: [],
        columns: [],
        rows: [],
        pluginType,
        id: "DxXJfeiYMPD",
        name: "",
    };
}
