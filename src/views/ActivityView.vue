<template>
    <div class="container">
        <div class="m-3 row justify-content-between">
            <div class="col-4">

                <div class="row row-cols-3">
                    <div class="col">
                        <router-link class="previous round" to="/">&#8249;</router-link>
                    </div>
                    <div class="col">
                        <h1>{{$route.params.id}}</h1>
                    </div>
                </div>

            </div>
            <div class="col-4">
                <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">+
                    tambah</button>
            </div>
        </div>
        <div>
            <h3>Task List</h3>
        </div>
        <div v-if="bg_hide == false">
            <img src="https://devcode-simple-todo-list.vercel.app/img/todo-empty-state.2aa44541.svg" alt="">
        </div>

        <div v-else>
            <CardTask />
            <CardTask />
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Tambah task</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="p-3">
                            <label for="exampleInputEmail1" class="form-label">New Task</label>
                            <input type="email" class="form-control" id="exampleInputEmail1"
                                aria-describedby="emailHelp" placeholder="Masukan task">
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

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CardTask from '../components/CardTask.vue'

export default {
    name: "ActivityView",
    components: {
        CardTask
    },
    data() {
        return {
            activities: ["1"],
            bg_hide: false,

        };
    },
    methods: {

    },
    mounted() {
        if (this.activities.length == 0) {
            this.bg_hide = false;
        }
        else {
            this.bg_hide = true;
        }
        console.log(this.bg_hide);
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
</style>