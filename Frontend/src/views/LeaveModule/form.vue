<template>
     <div>
                   <v-container>
                       <v-form>
                            <v-text-field
                               v-model="title"
                               :rules="rules"
                                hint="Leave Type"
                                label="Leave Type"
                            ></v-text-field>
                            <v-text-field
                            
                              v-model="value1" 
                              type="number"
                              :min="1" 
                              :max="30" 
                              label="Number of leaves (Annual)"
                              
                               append-outer-icon="mdi-info"
                              inline controls>
                              <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          mdi-home
        </v-icon>
                              </v-text-field>
                         
     
                               <v-text-field
                               v-model="value2" 
                                type="number"
                                :min="1" 
                                :max="10" 
                                label="Number of leaves (Monthly)"
                               append-outer-icon="mdi-map-marker"
                              inline controls>
                              </v-text-field>
                            
                                  <div>Is salary deduct ?</div>
                             
                               <v-radio-group
                                v-model="row"
                                row
                               
                                >
                               <v-radio
                             label="Yes"
                            value="radio-1"
                            ></v-radio>
                               <v-radio
                         label="No"
                         value="radio-2"
                         ></v-radio>
                         </v-radio-group>
                          
    <v-textarea
          solo
          name="input-7-4"
          label="Enter Description"
        ></v-textarea>
        <v-select
            v-model="value"
            :items="items"
            attach
            chips
            label="Applicable People"
            multiple
          ></v-select>
          <v-row>
              <v-col>
                   <v-btn class="teal lighten-2 white--text" style="width:60%">
                        save changes
                    </v-btn>
              </v-col>
               <v-col>
                   <v-btn class="red lighten-2 white--text" style="width:60%">
                        Clear
                    </v-btn>
              </v-col>
          </v-row>
                       </v-form>
                   </v-container>
                 </div> 
             
 
</template>
<script>
export default {
   data(){
       return{
           
              items: ['Interns', 'Permanants', 'All'],

              
           value:  ['Interns', 'Permanants', 'All'] ,
          
   
       }
   }
}
</script>