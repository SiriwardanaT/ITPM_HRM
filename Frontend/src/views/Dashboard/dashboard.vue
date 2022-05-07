<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col>
        <StatCardView
          :color="'#26c6da'"
          :icon="'mdi-account-multiple-check'"
          :title="'Total Memebers'"
          :description="'1002'"
        />
      </v-col>
      <v-col>
        <StatCardView
          :color="'#2980B9'"
          :icon="'mdi-clipboard-account'"
          :title="'Total Project'"
          :description="'405'"
        />
      </v-col>
      <v-col>
        <StatCardView
          :color="'#154360 '"
          :icon="'mdi-currency-usd'"
          :title="'Income'"
          :description="'$ 30423.00'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 style="color: gray">Sales Summery</h2>
        <v-sparkline
          :value="value"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :type="type"
          :auto-line-width="autoLineWidth"
          auto-draw
        ></v-sparkline>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StatCardView from "../../components/CardView/StatCard.vue";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  data: () => ({
    color: "#00897",
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
    selected: [2],
    items: [
      {
        action: "15 min",
        headline: "Brunch this weekend?",
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: "Ali Connors",
      },
      {
        action: "2 hr",
        headline: "Summer BBQ",
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: "me, Scrott, Jennifer",
      },
      {
        action: "6 hr",
        headline: "Oui oui",
        subtitle: "Do you have Paris recommendations? Have you ever been?",
        title: "Sandra Adams",
      },
      {
        action: "12 hr",
        headline: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?",
        title: "Trevor Hansen",
      },
      {
        action: "18hr",
        headline: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        title: "Britta Holt",
      },
    ],
  }),
  components: {
    StatCardView,
  },
};
</script>


<style>
</style>