<template>
  <v-row justify="center">
    <v-btn color="green" dark @click="dialog = true"> Update Profile</v-btn>
    <v-dialog v-model="dialog" persistent max-width="600px" max-height="600px">
      <v-card>
        <v-card-title class="text-h5">
          <v-card>
            <v-card-title>
              <span class="text-h5">Update Information</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="User Name" 
                    v-model="$store.state.CURRUNT_USER_OBJ.employeeName"
                    required>
                    
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="NIC"
                      v-model="$store.state.CURRUNT_USER_OBJ.Nic"
                      hint="example of helper text only on focus"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Address"
                      v-model="$store.state.CURRUNT_USER_OBJ.address"
                      hint="please update clearly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Phone Number"
                      v-model="$store.state.CURRUNT_USER_OBJ.phone"
                      hint="please update clearly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      :items="['Male', 'Female']"
                      label="Gender"
                      v-model="$store.state.CURRUNT_USER_OBJ.gender"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Birth date"
                      required
                      v-model="$store.state.CURRUNT_USER_OBJ.birthData"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      v-model="$store.state.CURRUNT_USER_OBJ.password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*please update initial password</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                style="width: 50%"
                class=""
                color="success"
                @click="update()"
              >
                Update
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-title>
      </v-card>
      <Loader v-if="Isloading" />
    </v-dialog>
    
  </v-row>
</template>

<script>
import UserAPI from '../../services/userService'
import Loader from '../../components/Notification/Loading.vue' 
export default {
  data() {
    return {
      dialog: false,
      user : "",
      Isloading:false
    };
  },
  components:{
    Loader
  },
  methods:{
    async update(){
        this.Isloading = true;
        const IsUpdate = await UserAPI.updateEmployee(this.$store.state.CURRUNT_USER_OBJ,this.$store.state.CURRUNT_USER_OBJ._id)
        console.log(IsUpdate)
        if(IsUpdate){
             this.dialog = false
             this.Isloading = false
        }
        // alert(this.$store.state.CURRUNT_USER_OBJ.EmployeeName)
     }
  },
  created(){
    this.user = this.$store.state.CURRUNT_USER_OBJ
  }
};
</script>

