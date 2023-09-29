import ReactDOM from "react-dom/client";
import { Dhis2App, getBaseUrl } from "./pages/app/Dhis2App";
import { getD2APiFromInstance } from "../utils/d2-api";
import { D2Api } from "../types/d2-api";

const domElementId = "root";
const root = document.getElementById(domElementId);

export function loadJsPlugin(pluginUrl: string) {
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement("script");

        scriptEle.setAttribute("src", pluginUrl);
        scriptEle.setAttribute("type", "text/javascript");
        scriptEle.setAttribute("async", "false");
        scriptEle.setAttribute("defer", "false");

        document.head.appendChild(scriptEle);

        scriptEle.addEventListener("load", resolve);
        scriptEle.addEventListener("error", reject);
    });
}

export async function loadPlugins(contextPath: string, version: string) {
    const pluginsFilesNames = [
        version.startsWith("2.36")
            ? "dhis-web-pivot/reporttable.js"
            : "dhis-web-interpretation/reporttable.js",
        "dhis-web-interpretation/chart.js",
        "dhis-web-maps/map.js",
        "dhis-web-event-visualizer/eventchart.js",
        "dhis-web-event-reports/eventreport.js",
    ];
    return Promise.all(
        pluginsFilesNames.map(fileName => loadJsPlugin(`${contextPath}/${fileName}`))
    );
}

function setupPluginsUrl(api: D2Api) {
    const url = import.meta.env.DEV ? "/dhis2" : api.baseUrl;
    window.chartPlugin.url = url;
    window.eventChartPlugin.url = url;
    window.eventReportPlugin.url = url;
    window.reportTablePlugin.url = url;
}

async function main() {
    const baseUrl = await getBaseUrl();
    const api = getD2APiFromInstance({ type: "local", url: baseUrl });
    const info = await api.system.info.getData();
    await loadPlugins(api.baseUrl, info.version);
    setupPluginsUrl(api);
    if (!root) throw new Error(`Root DOM element not found: id=${domElementId}`);
    ReactDOM.createRoot(root).render(<Dhis2App api={api} />);
}

main();
