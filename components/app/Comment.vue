<template>
  <div
    class="
      card
      w-full
      mt-4
      bg-base-100
      shadow-xl
      border border-primary
      text-primary
    "
  >
    <div class="card-body">
      <RequirementCardDropdown class="absolute right-2 top-2" />
      <h2 class="card-title">{{ userName }}</h2>
      <p>{{ commentContent }}</p>
      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>

<script>
import RequirementCardDropdown from "../requirements/RequirementCardDropdown.vue";
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
    async onCreateComment(comment) {
      await this.$api.comment.createComment(comment);
      this.$emit("updateArray");
    },
  },
  components: { RequirementCardDropdown },
};
</script>
