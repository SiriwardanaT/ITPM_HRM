<template>
  
    <v-container>
      <v-form ref="form">
        <v-row >
        <v-text-field
          v-model="leave.leaveName"
           :rules="leaveName_rule"
          label="Leave Type"
          outlined
          dense
         
        ></v-text-field>
        </v-row>
        <v-row>
        <v-col>
        <v-text-field
          v-model="leave.annualLeaveNumber"
           :rules="annualLeaveNumber_rule"
          type="number"
          :min="1"
          :max="30"
          label="Number of leaves (Annual)"
          inline
          controls
          outlined
          dense
        >
          <!-- <v-tooltip bottom class="toolTip">
            <v-icon color="primary" dark v-bind="attrs" v-on="on">
              mdi-home
            </v-icon>

            <span>Tooltip</span>
          </v-tooltip>
          append-outer-icon="mdi-info"
          inline
          controls
        >
          <v-icon color="primary" dark v-bind="attrs" v-on="on">
            mdi-home
          </v-icon> -->
        </v-text-field>

        </v-col>
        <v-col>
        <v-text-field
          v-model="leave.monthLeaveNumber"
           :rules="monthLeaveNumber_rule"
          type="number"
          :min="1"
          :max="10"
          label="Number of leaves (Monthly)"
          append-outer-icon="mdi-map-marker"
          inline
          controls
          outlined
          dense
        >
        </v-text-field>
        </v-col>
        </v-row>
        <v-row>
          <v-col>
       <v-select
          v-model="leave.salaryDeduction"
           :rules="salaryDeduction_rule"
          :items="yesNo"
          attach
          label="Is Salary Deduct"
          outlined
          dense
        ></v-select>
          </v-col>
          <v-col>
        <v-select
          v-model="leave.applicablePeople"
           :rules="applicablePeople_rule"
          :items="items"
          label="Applicable People"
          multiple
          outlined
          dense
        ></v-select>
        </v-col>
        </v-row>
        <v-row>
         <v-textarea
         v-model="leave.description"
          :rules="description_rule"
          solo
          name="input-7-4"
          label="Montion key Description about the leave"
          outlined
          dense
        ></v-textarea>
        </v-row>
        <v-row>
          <v-col>
           
            <v-btn v-if="this.$route.path =='/leave/add'" @click="addLeave()" class="teal lighten-2 white--text" large style="width: 60%">
              save changes
            </v-btn>
              
             <v-btn  v-if="this.$route.path =='/leave/update'" @click="updateLeave()" class="teal lighten-2 white--text" large style="width: 60%">
              Update Changes
            </v-btn> 
            

          </v-col>
          <v-col>
            <v-btn class="red lighten-2 white--text " large style="width: 60%">
              Clear
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
       <Loader v-if="Isloading" />
    <ErrorMsg :msg="Errormsg" v-if="ErrActive" />
    <SuccessMsg :msg = "Successmsg" v-if="SuccessActive"/>
    </v-container>
 
</template>
<script>
import ins from '../../Interceptors/axios'
import Loader from '../../components/Notification/Loading.vue';
import ErrorMsg from '../../components/Notification/Error.vue';
import SuccessMsg from '../../components/Notification/Success.vue';
export default {
  data() {
    return {
       Isloading: false,
       Errormsg:"Already Created User",
      ErrActive :false,
      SuccessActive:false,
      Successmsg :"Employee Created",
      items: ["Interns", "Permanants", "All"],
      yesNo:["Yes","No"],
      leave:{

      },
       leaveName_rule : [v=> !! v  || "Leave Name is Required", v=>v && v.length > 2 || "Please Enter valid leave type name"],
       annualLeaveNumber_rule: [v=> !! v || "Annual leave numbers are required" ],
       monthLeaveNumber_rule: [v=> !! v || "Monthly leave numbers are required"],
       salaryDeduction_rule : [v=> !! v || "Select a option"],
       applicablePeople_rule :[ v=>v && v.length >= 1 || "Please select at least one person"],
       description_rule :[v=> !! v || "Please mention about leave key points" ]
    };
  },
  components:{
Loader,
ErrorMsg,
SuccessMsg
  },
  methods:{
   async addLeave(){
      this.SuccessActive = false;
      this.ErrActive = false;
      this.$refs.form.validate();
      if(this.$refs.form.validate()){
        //  this.Isloading = true;
         if(this.$route.path =='/leave/add'){
            // this.Isloading = true;
            const addLeaveType = await ins.post('leaveType/addLeave',this.leave)
            console.log("add",addLeaveType)
            if(addLeaveType){
              
              //  this.Isloading = false;
              this.$router.push({ path: '/leave' })
               this.SuccessActive = true;
            }else{
               this.ErrActive = true
                // this.Isloading = false;
            }
         }else{
            // this.Isloading = true;
            const updateLeaveType = await ins.put('leaveType/updateLeave',this.leave._id,this.leave)
             console.log("add",updateLeaveType)
            if(updateLeaveType){
              //  this.Isloading = false;
                  this.SuccessActive = true;
                  this.Successmsg = "Updated SuccessFully"
              this.$router.push({ path: '/leave' })
            }else{
               this.ErrActive = true
                // this.Isloading = false;
            }
         }
        
      }

    }
  }
};
</script>
