<template>
  <div class="card w-full mt-4 bg-base-100 shadow-xl border border-primary">
    <div class="card-body">
      <RequirementCardDropdown class="absolute right-2 top-2" :for-modal-c="'confirmationModalC'"/>
      <h2 class="card-title">{{ userName !==  "guest" ? userName : user }}</h2>
      <p>{{ commentContent }}</p>
      <div class="card-actions justify-end"></div>
    </div>
    <ConfirmationModal
      :id="id"
      :for-modal="'confirmationModalC'"
      @updateComments="updateComments"
    />
  </div>
</template>

<script>
import RequirementCardDropdown from "../requirements/RequirementCardDropdown.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
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
    user: {
      type: String,
      default: "guest",
    },
    commentContent: {
      type: String,
      default: "placeholder",
    },
  },
  methods: {
    updateComments(){
      this.$emit("updateComments");
    }
  },
  components: { RequirementCardDropdown, ConfirmationModal },
};
</script>
