<template>
  <div class="container">
    <div class="home d-flex flex-row">
      <div class="p-2 m-2">
        <h1 class="font-weight-bold">Activity</h1>
      </div>
      <div class="p-3 m-2">
        <button class="btn btn-primary" type="submit">+ tambah</button>
      </div>
    </div>
    <div class="d-flex justify-content-xl-center">
      <CardActivity title="Sport" />
      <CardActivity title="Food" />
      <CardActivity title="ssudo" />
    </div>



  </div>
</template>

<script>
import CardActivity from "../components/CardActivity.vue";

export default {
  name: "HomeView",
  components: {
    CardActivity
  },
  data() {
    return {

    };
  },
  methods: {
    routerGo(path) {
      this.$router.push(path)
    }
  },
};
</script>
<style>
.home {
  margin-left: 8%;
}
</style>
