<template>
    <div>
        <h1 class="text-lg-center">Users</h1>
        <v-simple-table dense class="ml-5 mr-5">
            <thead>
            <tr>
                <th class="text-left">User</th>
                <th class="text-left">Export Data</th>
                <th class="text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in this.$store.state.Keystore.users" :key="index" class="mb-4">
                <td>{{user.name}}</td>
                <td>{{user.exportData}}</td>
                <td class="text-right">
                    <v-dialog v-model="exportDialog[user.name]" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark small text v-on="on">Export</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">Export a user</v-card-title>
                            <v-card-text>
                                <v-form>
                                    <v-container fluid>
                                        <v-row>
                                            <v-text-field
                                                    v-model="password"
                                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                    :type="show1 ? 'text' : 'password'"
                                                    name="input-10-1"
                                                    label="Password"
                                                    :rules="[rules.required, rules.min, rules.complexity]"
                                                    hint="At least 8 characters"
                                                    counter
                                                    @click:append="show1 = !show1"
                                            ></v-text-field>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="exportUser(user.name)">Export</v-btn>
                                <v-btn color="green darken-1" text @click="$set(exportDialog, user.name, false)">Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-btn color="primary" dark small text class="ml-1" @click="navigate(user.name)">Accounts</v-btn>
                    <v-dialog v-model="deleteDialog[user.name]" persistent max-width="290">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark small text class="ml-1" v-on="on">Delete</v-btn>
                        </template>
                        <v-card>
                            <v-card-title class="headline">Delete this user on the node ?</v-card-title>
                            <v-form>
                                <v-container fluid>
                                    <v-row>
                                        <v-text-field
                                                v-model="password"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show1 ? 'text' : 'password'"
                                                name="input-10-1"
                                                label="Password"
                                                :rules="[rules.required, rules.min, rules.complexity]"
                                                hint="At least 8 characters"
                                                counter
                                                @click:append="show1 = !show1"
                                        ></v-text-field>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" text @click="deleteUser(user.name)">Delete</v-btn>
                                <v-btn color="green darken-1" text @click="$set(deleteDialog, user.name, false)">Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </td>
            </tr>
            </tbody>
        </v-simple-table>
        <div class="text-md-center mt-5">
            <v-dialog v-model="createDialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark small text v-on="on">Create user</v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">Create a user</v-card-title>
                    <v-form>
                        <v-container fluid>
                            <v-row>
                                <v-text-field
                                        v-model="username"
                                        name="input-10-1"
                                        label="User name"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                        v-model="password"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        :rules="[rules.required, rules.min, rules.complexity]"
                                        label="Password"
                                        hint="At least 8 characters. With upper,lower,numbers and symbols"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="createDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text @click="createUser()">Create</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="importDialog" class="text-md-center" persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark small text v-on="on">Import a user</v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">Import a user</v-card-title>
                    <v-form>
                        <v-container fluid>
                            <v-row>
                                <v-text-field
                                        v-model="username"
                                        name="input-10-1"
                                        label="User name"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                        v-model="userData"
                                        name="input-10-1"
                                        label="User data"
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field
                                        v-model="password"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="Password"
                                        :rules="[rules.required, rules.min, rules.complexity]"
                                        hint="Must be the same as when you created this user !"
                                        counter
                                        @click:append="show1 = !show1"
                                ></v-text-field>
                            </v-row>
                        </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="importDialog = false">Cancel</v-btn>
                        <v-btn color="green darken-1" text @click="importUser()">Import</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data() {
            return {
                createAccountDialog: {},
                exportDialog: {},
                deleteDialog: {},
                createDialog: false,
                importDialog: false,
                password: "",
                username: "",
                privateKey: "",
                userData: "",
                show1: false,
                rules: {
                    required: (value: any) => !!value || 'Required.',
                    min: (v: any) => v.length >= 8 || 'Min 8 characters',
                    complexity: (v: any) => new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{8,}').test(v) || 'Must have Upper, Lower, Numbers and Symbols !',
                }
            }
        },
        methods: {
            navigate(user: string) {
                this.$router.push({path: `/accounts/${user}`})
            },
            exportUser(user: string) {
                this.$set(this.exportDialog, user, false)
                this.$store.dispatch("Keystore/exportUser", {name: user, password: this.password});
                this.password = "";
            },
            deleteUser(user: string) {
                this.$set(this.deleteDialog, user, false)
                this.$store.dispatch("Keystore/deleteUser", {name: user, password: this.password});
                this.password = "";
            },
            createUser() {
                this.createDialog = false;
                this.$store.dispatch("Keystore/createUser", {name: this.username, password: this.password});
                this.password = "";
                this.username = "";
            },
            createAccount() {
                this.createAccountDialog = false;
                console.log(this.username);
                console.log(this.password);
                this.$store.dispatch("PChain/createAccountForUser", {
                    username: this.username,
                    password: this.password,
                    privateKey: ""
                })
                this.password = "";
                this.username = "";
                this.privateKey = "";
            },
            importUser() {
                this.importDialog = false;
                this.$store.dispatch("Keystore/importUser", {
                    name: this.username,
                    password: this.password,
                    exportData: this.userData
                });
                this.password = "";
                this.username = "";
            }
        },
        beforeMount() {
            this.$store.dispatch('Keystore/fetchUsers');
        }
    })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
