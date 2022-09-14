import Projects from "~/services/projects";

export default ({ $axios }, inject) => {
    // Initialize API factories
    const factories = {
        project: Projects($axios),
    };

    // Inject $api
    inject("api", factories);
};
