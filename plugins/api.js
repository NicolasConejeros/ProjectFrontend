import Projects from "~/services/projects";
import Requirements from "~/services/requirements";
import Epics from "~/services/epics";

export default ({ $axios }, inject) => {
    // Initialize API factories
    const factories = {
        project: Projects($axios),
        requirement: Requirements($axios),
        epic: Epics($axios),
    };

    // Inject $api
    inject("api", factories);
};
