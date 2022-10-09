<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <AppNavBar :is-logged-in="true" />
      <Nuxt />
    </div>
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <div
          class="
            text-lg
            font-medium
            text-neutral-content
            p-2
            justify-self-center
          "
        >
          Reuniones
          <AppModalButton
            class="mt-1"
            :forModal="'addRoomModal'"
            :width="18"
            :height="18"
          />
          <RoomModal @updateRooms="onGetRooms" />
        </div>
        <!-- Sidebar content here -->
        <li v-for="(room, index) in rooms" :key="index">
          <nuxt-link :to="route + '/' + room.slug">
            <a>{{ room.name }}</a>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RoomModal from "../components/rooms/roomModal.vue";
export default {
  data: () => ({
    rooms: [],
    route: "/projects/",
  }),
  created() {
    this.route = this.route + this.$route.params.id;
  },
  async fetch() {
    await this.startLoading();
    await this.onGetRooms();
    await this.finishLoading();
  },
  methods: {
    startLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.start();
        });
      }
    },
    finishLoading() {
      if (process.client) {
        this.$nextTick(() => {
          this.$nuxt.$loading.finish();
        });
      }
    },
    async onGetRooms() {
      const loadedRooms = await this.$api.room.getRooms(this.$route.params.id);
      this.rooms = loadedRooms;
      console.log(JSON.stringify(this.rooms, null, 2));
    },
  },
  components: { RoomModal },
};
</script>
  