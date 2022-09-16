import Projects from "~/services/projects";
import Requirements from "~/services/requirements";

export default ({ $axios }, inject) => {
    // Initialize API factories
    const factories = {
        project: Projects($axios),
        requirement: Requirements($axios),
    };

    // Inject $api
    inject("api", factories);
};
