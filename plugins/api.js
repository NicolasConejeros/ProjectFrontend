import Projects from "~/services/projects";
import Requirements from "~/services/requirements";
import Epics from "~/services/epics";
import Comments from "~/services/comments";
import Rooms from "~/services/rooms";
import Audios from "~/services/audios";
import Users from "~/services/users";
import Auth from "~/services/auth";
import Team from "~/services/team";
import Chat from "~/services/chats";

export default ({ $axios }, inject) => {
    // Initialize API factories
    const factories = {
        project: Projects($axios),
        requirement: Requirements($axios),
        epic: Epics($axios),
        comment: Comments($axios),
        room: Rooms($axios),
        audio: Audios($axios),
        user: Users($axios),
        auth: Auth($axios),
        team: Team($axios),
        chat: Chat($axios)
    };

    // Inject $api
    inject("api", factories);
};
