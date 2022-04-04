<template>

  <div>
      <v-container>
         <v-row>
             <v-col>
                  <center><h1 class="mt-15 black--text">Add Leave Type</h1></center>
                  <img :src="img_leave" alt="" height="500" width="500" style="margin-top:10%;margin-left:8%"> 
             </v-col>
             <v-col>
              <Forms/>
             </v-col>
        </v-row>
    </v-container>
 </div>



</template>

<script>
import leaves from '../../assets/leave.png'
import Forms from '../../views/LeaveModule/form.vue'
export default {
   data(){
       return{
            img_leave :leaves,
            
         
   
       }
   },
   components:{
     Forms
   }
}
</script>

<style>

</style>