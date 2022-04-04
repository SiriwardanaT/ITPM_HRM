<template>
<div position="absolute"
     top="20px"
  >
  <v-simple-table
   position="absolute"
    fixed-header
    height="300px"
   
     top="20%"
   
  >
 
            <DeleteAlert/>
    <template v-slot:default>
         
      <thead>
        <tr>
          <th class="text-left">
            Leave Name
          </th>
          <th class="text-left">
           Numbers(Annual)
          </th>
           <th class="text-left">
           Numbers(Monthly)
          </th>
           <th class="text-left">
          Description
          </th>
             <th class="text-left">
          Deduction
          </th>
             <th class="text-left">
         Applicable people
          </th>
           <th class="text-left">
        Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.annual }}</td>
           <td>{{ item.monthly }}</td>
            <td>{{ item.description }}</td>
             <td>{{ item.deduction }}</td>
              <td>{{ item.people }}</td>
              <td>
                  <v-icon color="orange"> mdi-pencil</v-icon>  
                   <v-icon color="red" v-on:click="OnDelete">  mdi-delete</v-icon>  </td>

           
        </tr>
      </tbody>
     
    </template>
  </v-simple-table>
   </div>
</template>
<script>
//import DeleteAlert from '../../components/Notification/DeleteNotification.vue'
  export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
          {
           name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
          {
             name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
          {
            name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
          {
            name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
          {
            name: 'Frozen Yogurt',
            annual: 159,
            monthly:23,
            description:'asds sdsd sdddddd sd   ds dsd sdsd sd sd d',
            deduction:'yes',
            people:'interns'
          },
         
        ],
      }
    },
   
   
  }
</script>