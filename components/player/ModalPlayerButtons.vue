<template>
  <div class="grid grid-cols-5 grid-flow-col" :key="update">

    <div  v-if="!card" class="items-center text-primary hover:text-accent mt-4 col-span-1">
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

    <label class="swap swap-rotate justify-center col-span-1" :class="card ? 'ml-32' : ''">
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
    <div v-if="!card" class="items-center text-primary hover:text-accent mt-4 col-span-1">
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
    card: {
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
  },
};
</script>