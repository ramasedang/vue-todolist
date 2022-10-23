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
        <CardTask v-for="(data, index) in tasks" :key="index" :nameTask="data.name" :priorityTask="data.priority"
          :categoryTask="data.category" :statusTask="data.status" @deleteTask="triggerDelete" />
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
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  v-model="task.name" placeholder="Masukan task" />
              </div>
              <div class="m-3">
                <label for="selectPriority">Priority</label>
                <select class="form-select" aria-label="Default select example" v-model="task.priority">
                  <option selected disabled>Prioritas</option>
                  <option value="Very High">Very High</option>
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                  <option value="Very Low">Very Low</option>
                </select>
              </div>
              <div v-for="(data, index) in dataCategory" :key="index" class="m-1">
                <input class="form-check-input" type="checkbox" :value="data.category" v-model="categoryChecked" id="flexCheckDefault">
                  {{ data.category }}
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="newTask()">
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
              <h5 class="modal-title" id="exampleModalLabel">{{ $route.params.id }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="p-3">
                <label for="exampleInputEmail1" class="form-label">Nama baru</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="..." v-model="newNameActivity" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="updateCategoryName(newNameActivity)"
                data-bs-dismiss="modal">
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
  import { getDataTask, getData, addTask, updateCategory } from '@/firebase/index';

  export default {
    name: 'ActivityView',
    components: {
      CardTask,
    },
    data() {
      return {
        bg_hide: false,
        dataCategory: [],
        newNameActivity: '',
        categoryChecked: [],
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
      async triggerDelete() {
        this.getTask(this.$route.params.id);
      },
      async newTask() {
        addTask(
          this.task.name,
          this.task.priority,
          this.categoryChecked,
          this.task.status
        );
        this.getTask(this.$route.params.id);
      },
      async getData() {
        getData().then((data) => {
          this.dataCategory = data;
        });
      },
      async getTask(category) {
        getDataTask(category).then((data) => {
          this.tasks = data;
          console.log(this.tasks);
        });
      },
      addTask() {
        console.log(this.task);
      },
      async updateCategoryName(newName) {
        await updateCategory(this.$route.params.id, newName);
        this.$router.replace("/activity/" + newName);
        await this.getData();
      },

    },
    mounted() {

    },
    created() {
      this.getData();
      this.getTask(this.$route.params.id).then(() => {
        setInterval(() => {
          if (this.tasks.length == 0) {
            this.bg_hide = false;
          } else {
            this.bg_hide = true;
          }
        }, 100);
      });
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
