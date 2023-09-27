<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header h3 titulo_atc">
                        {{ item.titulo }}
                    </div>

                    <div class="card-body">
                        <div
                            class="row"
                            v-if="Boolean(item.adjunto) && !Boolean(item.descripcion)"
                        >
                            <div class="col-lg-12 align-self-start">
                            <center>
                                <a
                                    class="nav-link"
                                    @click="toggle"
                                    data-toggle="tooltip" data-placement="top" title="Haz click aquí para ampliar la imagen"
                                    style="cursor:pointer;"
                                >
                                    <fullscreen
                                        ref="fullscreen"
                                        @change="fullscreenChange"
                                        style="height: 100% !important; text-align:center"
                                    >
                                        <img
                                        :src="getUrl(item.adjunto)"
                                        class="img-fluid"
                                        style=" height: 100% !important; text-align:center"
                                    />
                                    </fullscreen>
                                </a>
                            </center>

                            </div>
                        </div>
                        <div
                            class="row"
                            v-if="Boolean(item.adjunto) && Boolean(item.descripcion)"
                        >
                            <div
                                class="col-lg-4  text-justify"
                                v-html="item.descripcion"
                            ></div>
                            <div class="col-lg-8 align-self-start">

                                <a
                                    class="nav-link"
                                    @click="toggle"
                                    data-toggle="tooltip" data-placement="top" title="Haz click aquí para ampliar la imagen"
                                    style="cursor:pointer;"
                                >
                                    <fullscreen
                                        ref="fullscreen"
                                        @change="fullscreenChange"
                                        style="height: 100% !important; text-align:center"
                                    >
                                        <img
                                            :src="getUrl(item.adjunto)"
                                            class="img-fluid"
                                            style=" height: 100% !important; text-align:center"
                                        />
                                    </fullscreen>
                                </a>
                            </div>
                        </div>
                        <div
                            class="row"
                            v-if="!Boolean(item.adjunto) && Boolean(item.descripcion)"
                        >
                            <div
                                class="col-lg-12  text-justify"
                                v-html="item.descripcion"
                            ></div>
                        </div>

                        <div class="row">
                            <div class="col-lg-10 mt-3">
                                <small class="mr-4"
                                    ><i class="far fa-calendar-alt"></i>
                                    {{ formatDate(item.date) }}</small
                                >
                                <small class="mr-4"
                                    ><i class="fas fa-tag"></i>
                                    {{ item.nombreCategoria }}</small
                                >
                                <small
                                    ><i class="fas fa-user-edit"></i
                                    >{{ item.autor }}</small
                                >
                            </div>
                            <div class="col-lg-2 mt-3">
                                <small class="mr-4">
                                    <button
                                        class="btn btn-outline-success btn-xs text-center border-0 p-1"
                                        type="button"
                                        :disabled="infoDislikesUser > 0"
                                        :class="{
                                            'text-muted': infoDislikesUser > 0
                                        }"
                                        data-toggle="modal"
                                        data-target="#basicExampleModal"
                                        @click="addLike()"
                                        data-placement="top"
                                        title="'Me gusta'"
                                    >
                                        <i
                                            class="fa fa-thumbs-up"
                                            aria-hidden="true"
                                        ></i>
                                        {{ likes > 0 ? likes : 0 }}
                                    </button>
                                </small>

                                <small class="mr-4">
                                    <button
                                        class="btn btn-outline-primary btn-xs text-center  border-0 p-1"
                                        :disabled="infoLikesUser > 0"
                                        :class="{
                                            'text-muted': infoLikesUser > 0
                                        }"
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#basicExampleModal"
                                        @click="addDisLike()"
                                        data-placement="top"
                                        title="'No me gusta'"
                                    >
                                        <i
                                            class="fa fa-thumbs-down"
                                            aria-hidden="true"
                                        ></i>
                                        {{ dislikes > 0 ? dislikes : 0 }}
                                    </button>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/* *** SERVICES *** */
import MuroServices from "../../../../../services/profiles/muro/MuroServices";
import ReaccionesMuroServices from "../../../../../services/profiles/reaccionesmuro/ReaccionesMuroServices"
import moment from "moment";
Vue.use(require("vue-moment"));
import fullscreen from "vue-fullscreen";
Vue.use(fullscreen);
/* *** SERVICES *** */

export default {
    name: "DeparturesSlots",
    props: ["item", "users_id"],
    data() {
        return {
            urlImagen: MuroServices.urlImagenMuro,
            likes: [],
            dislikes: [],
            infoLikesUser: [],
            infoDislikesUser: [],
            fullscreen: false
        };
    },
    watch: {
        item: {
            deep: true,
            handler(val) {
                if (Boolean(val)) {
                    this.getReaccionesPorMuroId();
                }
            }
        }
    },
    methods: {
        formatDate(fecha) {
            return moment(fecha).format("MMMM Do, YYYY,  h:mm a");
        },
        getUrl(adjunto) {
            return this.urlImagen + adjunto;
        },
        addLike() {
            let data = {
                muro_id: this.item.id,
                users_id: this.users_id
            };

            ReaccionesMuroServices.addLike(data)
                .then(response => {
                    this.getReaccionesPorMuroId();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    //this.displayLikeMessage()
                });
        },
        addDisLike() {
            let data = {
                muro_id: this.item.id,
                users_id: this.users_id
            };
            ReaccionesMuroServices.addDisLike(data)
                .then(response => {
                    this.getReaccionesPorMuroId();
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    //this.displayDislikeMessage()
                });
        },
        getReaccionesPorMuroId() {
            if (Boolean(this.item.id)) {
                ReaccionesMuroServices.getReaccionesPorMuroId(this.item.id)
                    .then(response => {
                        var totalLikes = response.data.data;

                        this.likes = totalLikes.reduce((total, item) => {
                            return total + item.likes;
                        }, 0);
                        this.dislikes = totalLikes.reduce((total, item) => {
                            return total + item.dislikes;
                        }, 0);
                    })
                    .catch(error => {
                        console.log("errores: " + error);
                    })
                    .finally(() => this.getReaccionesPorUsersId());
            }
        },
        getReaccionesPorUsersId() {
            if (Boolean(this.item.id)) {
                ReaccionesMuroServices.getReaccionesPorUsersId(
                    this.item.id,
                    this.users_id
                )
                    .then(response => {
                        var totalLikes = response.data.data;

                        this.infoLikesUser = totalLikes.reduce(
                            (total, item) => {
                                return total + item.likes;
                            },
                            0
                        );
                        this.infoDislikesUser = totalLikes.reduce(
                            (total, item) => {
                                return total + item.dislikes;
                            },
                            0
                        );
                    })
                    .catch(error => {
                        console.log("errores: " + error);
                    });
            }
        },
        displayLikeMessage() {
            this.$bvToast.toast(`Gracias por tu opinión`, {
                title: "Diste like",
                autoHideDelay: 1500,
                variant: "success",
                solid: true
            });
        },
        displayDislikeMessage() {
            this.$bvToast.toast(`Gracias por tu opinión`, {
                title: "Diste dislike",
                autoHideDelay: 1500,
                variant: "info",
                solid: true
            });
        },
        toggle() {
            this.$refs["fullscreen"].toggle(); // recommended
            // this.fullscreen = !this.fullscreen // deprecated
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen;
        }
    },
    async mounted() {
        await this.getReaccionesPorMuroId();
        //await this.getReaccionesPorUsersId();
    }
};
</script>

<style lang="scss" scoped></style>
