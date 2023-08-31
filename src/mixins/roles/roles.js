export default {
    data() {
        return {
            roles: [],
            permissions: [],
            info: [],
        };
    },
    mounted() {
        this._getRoles();
        this._getPermissions();
        this._getInfoUserLogued();
    },
    computed: {
        //2023-02-28 | fg | rol team leader: acceso a reportes,...
        $isTeamLeader: function() {
            return this.roles.some(
                e =>
                e.rol === "Supervisor Ventas" ||
                e.rol === "Supervisor Marketing" ||
                e.rol === "Supervisor Operaciones"
            );
        },
        $isVendedor: function() {
            return this.roles.some(
                e => e.rol === "Colaborador Ventas" || e.rol === "Supervisor Ventas"
            );
        },
        $isOperador: function() {
            return this.roles.some(
                e =>
                e.rol === "Colaborador Operaciones" ||
                e.rol === "Supervisor Operaciones"
            );
        },
        $isAdministrador: function() {
            return this.roles.some(e => e.rol === "Supervisor Administrativo" ||
            e.rol === "SuperAdministrador");
        },
        $isAdministradorTarifas: function() {
            return this.roles.some(e => e.rol === "Administrador Tarifas" );
        },
        $loggedUserId: function() {
            return this.info.id;
        },
        $loggedUserName: function() {
            return this.info.title;
        }
    },
    methods: {
        async _getInfoUserLogued() {
            if (Boolean(this.$store.getters.currentUser)) {
                this.info = await this.$store.getters.currentUser;
            }
        },
        async _getRoles() {
            // console.log(
            //     "Current user: " + JSON.stringify(this.$store.getters.currentUser)
            // );
            if (Boolean(this.$store.getters.currentUser))
                this.roles = await this.$store.getters.currentUser.roles;
        },
        async _getPermissions() {
            if (Boolean(this.$store.getters.currentUser))
                this.permissions = await this.$store.getters.currentUser.permissions[0];
        }
    }
};
