<template>
  <div class="grid">
    <div
      v-if="this.message.user.id == this.$auth.user.id"
      class="flex justify-end mt-2 mr-2"
    >
      <div class="bg-accent rounded-lg w-5/6 p-2 drop-shadow-md">
        <a class="text-base-300 font-semibold"> Yo </a>
        <div class="font-medium">{{ message.text }}</div>
      </div>
    </div>
    <div v-else class="flex justify-start mt-2 ml-2">
      <div class="bg-primary rounded-lg w-5/6 p-2 drop-shadow-md">
        <a class="text-base-300 font-semibold">{{ message.user.name }}</a>
        <div class="font-medium">{{ message.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      text: "",
      user: {
        name: "user",
        avatar: "",
        id: "",
      },
    },
  },
};
</script>