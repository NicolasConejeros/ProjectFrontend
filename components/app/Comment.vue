<template>
  <div class="card w-full mt-4 bg-base-100 shadow-xl border border-primary">
    <div class="card-body">
      <RequirementCardDropdown class="absolute right-2 top-2" :for-modal-c="'confirmationModalC'"/>
      <h2 class="card-title">{{ userName }}</h2>
      <p>{{ commentContent }}</p>
      <div class="card-actions justify-end"></div>
    </div>
    <ConfirmationModalC
      :id="id"
      @updateComments="updateComments"
    />
  </div>
</template>

<script>
import RequirementCardDropdown from "../requirements/RequirementCardDropdown.vue";
import ConfirmationModalC from "./ConfirmationModalC.vue";
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
    async onCreateComment(comment) {
      await this.$api.comment.createComment(comment);
    },
    updateComments(){
      this.$emit("updateComments");
    }
  },
  components: { RequirementCardDropdown, ConfirmationModalC },
};
</script>
