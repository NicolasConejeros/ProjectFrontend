<template>
  <div class="grid grid-cols-5 grid-flow-col" :key="update">
    <div class="items-center text-primary hover:text-accent mt-4 col-span-1">
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        @click="prevAudio"
      >
        <path
          d="M2.75 20a1 1 0 1 0 2 0V4a1 1 0 1 0-2 0v16ZM20.75 19.053c0 1.424-1.612 2.252-2.77 1.422L7.51 12.968a1.75 1.75 0 0 1 .075-2.895l10.47-6.716c1.165-.748 2.695.089 2.695 1.473v14.223Z"
          fill="evenodd"
        />
      </svg>
    </div>

    <label class="swap swap-rotate justify-center col-span-1">
      <input type="checkbox" />
      <div
        class="
          swap-on
          h-12
          w-12
          border border-accent
          rounded-full
          flex
          justify-center
          text-accent
        "
        @click="toggleAudio"
      >
        <svg
          width="24"
          height="24"
          class="mt-3"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 9.246 3h-3.5ZM14.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 18.246 3h-3.5Z"
            fill="evenodd"
          />
        </svg>
      </div>
      <div
        class="
          swap-off
          h-12
          w-12
          border-2 border-primary
          rounded-full
          flex
          justify-center
          text-primary
        "
        @click="toggleAudio"
      >
        <svg
          width="24"
          height="24"
          fill="currentColor"
          class="mt-3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z"
            fill="evenodd"
          />
        </svg>
      </div>
    </label>
    <div class="items-center text-primary hover:text-accent mt-4 col-span-1">
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        @click="nextAudio"
      >
        <path
          d="M21 4a1 1 0 1 0-2 0v16a1 1 0 1 0 2 0V4ZM3 4.947c0-1.424 1.612-2.252 2.77-1.422l10.47 7.507a1.75 1.75 0 0 1-.075 2.895l-10.47 6.716C4.53 21.39 3 20.554 3 19.17V4.947Z"
          fill="evenodd"
        />
      </svg>
    </div>
    <div class="items-center text-accent hover:text-base-300 mt-4 col-span-1">
      <div class="dropdown dropdown-right">
        <label tabindex="0" class="">
          <svg
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click="colorDropdown = true"
          >
            <path
              d="M3 3.747a.75.75 0 0 1 .75-.75h16.504a.75.75 0 0 1 .6 1.2L16.69 9.748l4.164 5.552a.75.75 0 0 1-.6 1.2H4.5v4.749a.75.75 0 0 1-.648.743L3.75 22a.75.75 0 0 1-.743-.648L3 21.249V3.747Z"
              fill="evenodd"
            />
          </svg>
        </label>

        <ul
          v-if="colorDropdown"
          tabindex="0"
          class="
            dropdown-content
            menu
            p-2
            shadow
            bg-base-300
            text-accent
            rounded-box
            w-40
            h-20
            grid grid-cols-3
            gap-y-1 gap-x-1
          "
        >
          <div
            class="rounded-lg p-1" style="background-color: #8b5cf6"
            @click="addMarker('#8b5cf6')"
          ></div>
          <div
            class="rounded-lg p-1" style="background-color: #36D399"
            @click="addMarker('#36D399')"
          ></div>
          <div
            class="rounded-lg bg-error p-1" style="background-color: #F87272"
            @click="addMarker('#F87272')"
          ></div>
          <div
            class="rounded-lg bg-warning p-1" style="background-color: #FBBD23"
            @click="addMarker('#FBBD23')"
          ></div>
          <div
            class="rounded-lg bg-primary-content p-1" style="background-color:#3ABFF8"
            @click="addMarker('#3ABFF8')"
          ></div>
          <div
            class="rounded-lg  p-1" style="background-color: #D926A9"
            @click="addMarker('#D926A9')"
          ></div>
        </ul>
      </div>
    </div>
    <div class="mt-4">
      <label class="swap">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" />

        <!-- sun icon -->
        <svg
          width="24"
          height="24"
          class="swap-on fill-current"
          @click="bookmarkToggle"
          xmlns="http://www.w3.org/2000/svg"
          id="mdi-eye"
          viewBox="0 0 24 24"
        >
          <path
            d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
          />
        </svg>

        <!-- moon icon -->
        <svg
          width="24"
          height="24"
          class="swap-off text-base-300"
          @click="bookmarkToggle"
          xmlns="http://www.w3.org/2000/svg"
          id="mdi-eye-off"
          viewBox="0 0 24 24"
        >
          <path
            d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z"
          />
        </svg>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    next: {
      type: Boolean,
      default: false,
    },
    prev: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    update: 0,
    colorDropdown: true,
  }),
  methods: {
    toggleAudio() {
      this.$emit("toggleAudio");
    },
    nextAudio() {
      this.update += 1;
      this.$emit("nextAudio");
    },
    prevAudio() {
      this.update += 1;
      this.$emit("prevAudio");
    },
    addMarker(color) {
      this.colorDropdown = false;
      this.$emit("bookmark", color);
    },
    bookmarkToggle(){
      this.$emit("bookmarkToggle");
    }
  },
};
</script>