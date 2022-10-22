<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <input
        type="text"
        v-model="content"
        placeholder="Añadir observación"
        :maxlength="130"
        class="input input-bordered input-primary w-full"
      />
      <label
        class="btn btn-primary w-full"
        @click="onCreateComment()"
      >
        Comentar
      </label>
      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: {
    userName: {
      type: String,
      default: "guest",
    },
    commentContent: {
      type: String,
      default: "placeholder",
    },
  },
  data: () => ({
    content: "",
  }),
  methods: {
    async onCreateComment() {
      this.$emit("onCreateComment", this.content);
    },
  },
};
</script>
  