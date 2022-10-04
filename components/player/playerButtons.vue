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
            class="rounded-lg bg-primary p-1"
            @click="addMarker('primary')"
          ></div>
          <div class="rounded-lg bg-success p-1" @click="addMarker('primary')"></div>
          <div class="rounded-lg bg-error p-1" @click="addMarker('error')"></div>
          <div class="rounded-lg bg-warning p-1" @click="addMarker('warning')"></div>
          <div class="rounded-lg bg-primary-content p-1" @click="addMarker('primary-content')"></div>
          <div class="rounded-lg bg-base-content p-1" @click="addMarker('base-content')"></div>
        </ul>
      </div>
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
  },
};
</script>