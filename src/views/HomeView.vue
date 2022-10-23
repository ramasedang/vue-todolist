<template>
  <div class="container">
    <div class="home d-flex flex-row">
      <div class="p-2 m-2">
        <h1 class="font-weight-bold">Activity</h1>
      </div>
      <div class="p-3 m-2">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#newactivityCategory"
        >
          + tambah
        </button>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-content-xl-center">
      <CardActivity
        v-for="(item, index) in data"
        :key="index"
        :title="item.category"
        :date="item.createdAt"
        @delete="deleteActivity"
      />
    </div>

    <div
      class="modal fade"
      id="newactivityCategory"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Tambah activity
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="p-3">
              <input
                v-model="category"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Masukan task"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="tambahKategori()"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardActivity from '../components/CardActivity.vue';
import { db, getData } from '@/firebase/index';

export default {
  name: 'HomeView',
  components: {
    CardActivity,
  },
  data() {
    return {
      category: '',
      createdAt: '',
      data: [],
    };
  },
  methods: {
    deleteActivity() {
      getData().then((data) => {
        this.data = data;
      });
    },
    tambahKategori() {
      console.log(this.category);
      this.createdAt = new Date().toISOString().slice(0, 10);
      const activity = {
        category: this.category,
        createdAt: this.createdAt,
      };
      db.collection('activity').add(activity);
      getData().then((data) => {
        this.data = data;
      });
    },
    routerGo(path) {
      this.$router.push(path);
    },
  },
  mounted() {},

  created() {
    getData().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }
};
</script>
<style>
.home {
  margin-left: 8%;
}
</style>
