<template>
  <div class="p-2 d-flex justify-content-center">
    <div class="card w-50 border border-success border-4">
      <div class="card-body">
        <div :class="{ selesai: task.status }">
          <div class="d-flex">
            <div class="p-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                  @change="taskDone()" v-model="task.status" />
              </div>
            </div>
            <div class="p-2">{{ task.priority }}</div>
            <div class="p-2 flex-grow-1">{{ task.name }}</div>
            <div class="p-2">
              <button class="btn btn-sm bg-primary text-white" type="button" data-bs-toggle="modal"
                data-bs-target="#edittaskModal" @click="getCategory()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </button>
              <button class="ms-2 btn btn-sm bg-danger text-white" @click="delTask()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                  viewBox="0 0 16 16">
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z">
                  </path>
                  <path fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="edittaskModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Edit Task
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="p-3">
              <label for="exampleInputEmail1" class="form-label">Task</label>
              <input type="text" v-model="task.name" class="form-control" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Masukan task" />
            </div>
            <div class="m-3">
                            <select class="form-select" aria-label="Default select example">
                                <option selected disabled>Prioritas</option>
                                <option value="1">Very High</option>
                                <option value="2">High</option>
                                <option value="3">Normal</option>
                                <option value="3">Low</option>
                                <option value="3">Very Low</option>
                            </select>
                        </div>
            <p v-for="(data, index) in oldCategory" :key="index">{{ data[index] }}</p>
            <div v-for="(data, index) in dataCategory" :key="index" class="m-1">
              <input class="form-check-input" type="checkbox" :value="data.category" v-model="newCategory"
                id="flexCheckDefault">
              {{ data.category }}
            </div>
            <h1>{{ newCategory }}</h1>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTaskdetail()">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, deleteTask, getDataTask, db } from '@/firebase/index';
export default {
  props: ['nameTask', 'priorityTask', 'categoryTask', 'statusTask'],
  data() {
    return {
      dataCategory: [],
      oldCategory: [],
      newCategory: [],
      oldName: '',
      tasks: [],
      task: {
        name: this.nameTask,
        priority: this.priorityTask,
        category: this.categoryTask,
        status: this.statusTask,
      },
    };
  },
  methods: {
    async getCategory() {
      await getData('category').then((data) => {
        this.dataCategory = data;
      });

    },
    async delTask() {
      deleteTask(this.nameTask)
        .then(() => {
          this.$emit('deleteTask');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getTask() {
      await getDataTask(this.$route.params.id).then((data) => {
        this.tasks = data;
      }).then(() => {
        this.tasks.forEach((data) => {
          this.oldCategory.push(data.category);
          this.oldName = data.name;
        });
      });
    },

    async change(event) {
      this.task.status = event.target.value
      
    },
    async taskDone() {
      console.log(this.task.status)
      
         db
        .collection("task")
        .where("name", "==", this.task.name)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            doc.ref.update({
              status: this.task.status,
            });
          });
        });
      
    },
    async updateTaskdetail() {
      const task = {
        name: this.task.name,
        priority: this.task.priority,
        category: this.newCategory,
        status: this.task.status,
      };
      await db.collection('task').where("name", "==", this.oldName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update(task);
        });
      });
    },
  },
  created() {
    this.getCategory();
    this.getTask();
  },

};
</script>

<style>
.selesai {
  text-decoration: line-through;
  color: darkgray;
}
</style>