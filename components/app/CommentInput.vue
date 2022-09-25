<template>
  <div class="card w-full bg-base-100 shadow-xl">
    <div class="card-body">
      <input
        type="text"
        v-model="content"
        placeholder="Type here"
        class="input input-bordered input-primary w-full"
      />
      <label
        class="btn btn-primary w-full"
        @click="onCreateComment(id)"
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
    id: {
      type: String,
      default: "",
    },
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
    async onCreateComment(id) {
        console.log(this.id);
      const newComment = { requirementId: id, content: this.content };
      await this.$api.comment.createComment(newComment);
      this.$emit("updateComments");
    },
  },
};
</script>
  