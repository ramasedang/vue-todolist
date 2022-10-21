<template>
    <div class="p-2 m-2">
        <div class="card" style="width: 18rem">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p>27-oktober-2021</p>
                <div class="row">
                    <button  @click="routerGo('/activity/'+title)" type="button" class="m-3 col btn btn-secondary btn-sm">
                        Watch
                    </button>
                    <button type="button" class="m-3 col btn btn-danger btn-sm">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardActivity",
    props: [
        "title"
    ],
    data() {
    return {
      
    };
  },
  methods: {
    routerGo (path) {
      this.$router.push(path)
    }
  },

}
</script>

<style>

</style>