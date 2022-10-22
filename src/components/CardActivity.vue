<template>
    <div class="p-2 m-2">
        <div class="card" style="width: 18rem">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p>{{date}}</p>
                <div class="row">
                    <button @click="routerGo('/activity/'+title)" type="button"
                        class="m-3 col btn btn-secondary btn-sm">
                        Watch
                    </button>
                    <button type="button" @click="deleteActivity()" class="m-3 col btn btn-danger btn-sm">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase/index'
export default {
    name: "CardActivity",
    props: [
        "title",
        "date"
    ],
    data() {
        return {

        };
    },
    methods: {
        routerGo(path) {
            this.$router.push(path)
        },
        deleteActivity() {
            db.collection('activity').where('category', '==', this.title).get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    db.collection('activity').doc(doc.id).delete()
                })
            })
        }
    },

}
</script>

<style>

</style>