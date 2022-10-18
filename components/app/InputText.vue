<template>
  <div>
    <label v-if="label.length > 0" class="label">
      <span
        class="
          block
          mb-2
          text-md
          font-medium
          text-gray-900
          dark:text-gray-300
          font-semibold
        "
        :class="onError ? 'text-error' : ''"
        >{{ label }}</span
      >
    </label>
    <div class="flex justify-between gap-1 items-center">
      <slot class="pointer-events-none" name="icon"></slot>
      <input
        v-model.trim="localValue"
        :type="type"
        :placeholder="placeholder"
        :maxlength="[maxLength]"
        :required="required"
        class="input input-bordered input-primary w-full w-full p-2.5"
        :class="
          onError
            ? 'border border-error text-error focus:ring-red-500 focus:border-red-500'
            : ''
        "
      />
    </div>
    <div
      class="flex -mb-2"
      :class="onError ? 'justify-between' : 'justify-end'"
    >
      <p v-if="onError" class="mt-1 ml-1 text-sm text-error">
        {{ errorMessages[0] }}
      </p>
      <p
        v-if="counter > 0"
        class="text-right text-sm mr-1 mt-1 p-0"
        :class="onError ? 'text-error' : ''"
      >
        {{ localValue.length }}/{{ counter }}
      </p>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
    },
    minlength: {
      type: String,
      default: "0",
    },
    maxLength: {
      type: Number,
      default: 135,
    },
    counter: {
      type: Number,
      default: 0,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localValue: this.value,
    };
  },
  computed: {
    onError() {
      return this.errorMessages.length > 0;
    },
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
  