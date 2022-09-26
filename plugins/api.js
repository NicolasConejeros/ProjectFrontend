import Projects from "~/services/projects";
import Requirements from "~/services/requirements";
import Epics from "~/services/epics";
import Comments from "~/services/comments";
import Rooms from "~/services/rooms";
import Audios from "~/services/audios";

export default ({ $axios }, inject) => {
    // Initialize API factories
    const factories = {
        project: Projects($axios),
        requirement: Requirements($axios),
        epic: Epics($axios),
        comment: Comments($axios),
        room: Rooms($axios),
        audio: Audios($axios)
    };

    // Inject $api
    inject("api", factories);
};
