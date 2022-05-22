<template>
  <YearCalendar
    v-model="year"
    :activeDates.sync="activeDates"
    @toggleDate="toggleDate"
    prefixClass="your_customized_wrapper_class"
    :activeClass="activeClass"
  ></YearCalendar>

</template>

<script>
import YearCalendar from 'vue-material-year-calendar'

export default {
    
  data () {
    return {
      
      year: 2022,
      activeDates: [
        
        { date: '2022-01-14', className: 'yellow' },
        { date: '2022-01-17', className: 'green' },
        { date: '2022-02-04', className: 'yellow' },
         { date: '2022-02-16', className: 'green' },
          { date: '2022-03-17', className: 'green' },
           { date: '2022-04-13', className: 'yellow' },
            { date: '2022-04-14', className: 'yellow' },
             { date: '2022-04-16', className: 'green' },
              { date: '2022-05-01', className: 'yellow' },
               { date: '2022-05-15', className: 'yellow' },
                { date: '2022-05-16', className: 'yellow' },
                 { date: '2022-06-14', className: 'yellow' },
                  { date: '2022-07-13', className: 'yellow' },
                   { date: '2022-08-01', className: 'yellow' },
                    { date: '2022-09-10', className: 'yellow' },
                     { date: '2022-10-09', className: 'yellow' },
                      { date: '2022-10-10', className: 'yellow' },
                       { date: '2022-11-07', className: 'yellow' },
                        { date: '2022-12-07', className: 'yellow' },
                         { date: '2022-12-25', className: 'yellow' },
                          { date: '2022-12-26', className: 'yellow' },
      ],
      activeClass: '',
    }
  },
    components: { YearCalendar },
  methods: {
    toggleDate (dateInfo) {
         console.log("heee");
      console.log(dateInfo)  // { date: '2010-10-23', selected: true }
    }
  }
}
</script>

<style lang="stylus">
.your_customized_wrapper_class
  background-color: #0aa
  color: white
  &.red
    background-color: red
    color: white
    &:after
    
      background-size 100% 100%
  &.blue
    background-color: #0000aa
    color: white
  &.your_customized_classname
    background-color: yellow
    color: black

</style>