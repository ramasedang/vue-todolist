<template>
  <div class="container">
    <div class="m-3 row justify-content-between">
      <div class="col-4">
        <div class="row row-cols-3">
          <div class="col">
            <router-link class="previous round" to="/">&#8249;</router-link>
          </div>
          <div class="col">
            <h1>{{ $route.params.id }}</h1>
          </div>
          <div class="p-2">
            <button class="btn btn-primary text-white btn-circle" type="button" data-bs-toggle="modal"
              data-bs-target="#editnameActivity">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="col-4">
        <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#newtaskModal">
          + tambah
        </button>
      </div>
    </div>
    <div>
      <h3>Task List</h3>
    </div>
    <div v-if="bg_hide == false">
      <img src="https://devcode-simple-todo-list.vercel.app/img/todo-empty-state.2aa44541.svg" alt="" />
    </div>

    <div v-else>
      <CardTask />
      <CardTask />
    </div>

    <div class="modal fade" id="newtaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Tambah task
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="p-3">
              <label for="exampleInputEmail1" class="form-label">New Task</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Masukan task" />
            </div>
            <div class="m-3">
              <label for="selectPriority">Priority</label>
              <select class="form-select" aria-label="Default select example">
                <option selected disabled>Prioritas</option>
                <option value="1">Very High</option>
                <option value="2">High</option>
                <option value="3">Normal</option>
                <option value="3">Low</option>
                <option value="3">Very Low</option>
              </select>
            </div>
            <div class="m-3">
              <label for="selectCategory">Activity Category</label>
              <select class="form-select" aria-label="Default select example">
                <option selected disabled>Category activity</option>
                <option v-for="(data,index) in dataCategory" :key="index" value="data.category">{{data.category}}
                </option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editnameActivity" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sport</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="p-3">
              <label for="exampleInputEmail1" class="form-label">Nama baru</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="..." />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTask from '../components/CardTask.vue';
import { db } from '@/firebase/index';

export default {
  name: 'ActivityView',
  components: {
    CardTask,
  },
  data() {
    return {
      activities: ['1'],
      bg_hide: false,
      dataCategory: [],
      tasks: [],
      task: {
        name: '',
        priority: '',
        category: '',
        status: false,
      },
    };
  },
  methods: {
    getData() {
      db.collection('activity')
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.dataCategory.push(doc.data());
          });
        });
      console.log(this.dataCategory);
    }
  },
  mounted() {
    if (this.activities.length == 0) {
      this.bg_hide = false;
    } else {
      this.bg_hide = true;
    }
    console.log(this.bg_hide);
  },
  created() {
    this.getData();
  },
};
</script>

<style>
a {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

.previous {
  background-color: #818597;
  color: black;
}

.next {
  background-color: #ffffff;
  color: white;
}

.round {
  border-radius: 50%;
}

.btn-circle.btn-xl {
  width: 70px;
  height: 70px;
  padding: 10px 16px;
  border-radius: 35px;
  font-size: 24px;
  line-height: 1.33;
}

.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
</style>
