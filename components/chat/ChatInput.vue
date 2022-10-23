<template>
  <div>
    <input
      v-model.trim="localValue"
      class="
        absolute
        bottom-3
        left-4
        w-5/6
        bg-base-200
        p-2
        border border-primary-focus
      "
    />
    <button
      @click="submitButton"
      class="absolute bottom-3 right-2 p-2 text-primary hover:text-accent"
    >
      <svg
        width="30"
        height="30"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m12.815 12.197-7.532 1.256a.5.5 0 0 0-.386.318L2.3 20.728c-.248.64.421 1.25 1.035.943l18-9a.75.75 0 0 0 0-1.342l-18-9c-.614-.307-1.283.304-1.035.943l2.598 6.957a.5.5 0 0 0 .386.319l7.532 1.255a.2.2 0 0 1 0 .394Z"
          fill="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  methods:{
    submitButton(){
      this.$emit("submit");
    }
  },
  watch: {
    localValue(newValue) {
      this.$emit("input", newValue);
    },
    value(newValue) {
      this.localValue = newValue;
    },
  },
};
</script>