<script setup>
import { onMounted, ref } from 'vue';

const listOfGames = ref([]);
const selectedGame = ref(null);
const selectedMonth = ref(null);
const cronograma = ref([
    { mes: "Janeiro", title: "", time: "" },
    { mes: "Fevereiro", title: "", time: "" },
    { mes: "Março", title: "", time: "" },
    { mes: "Abril", title: "", time: "" },
    { mes: "Maio", title: "", time: "" },
    { mes: "Junho", title: "", time: "" },
    { mes: "Julho", title: "", time: "" },
    { mes: "Agosto", title: "", time: "" },
    { mes: "Setembro", title: "", time: "" },
    { mes: "Outubro", title: "", time: "" },
    { mes: "Novembro", title: "", time: "" },
    { mes: "Dezembro", title: "", time: "" },
]);


const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const SelectGame = () => {
    let obj = listOfGames.value.find(x => x.id === selectedGame.value);
    if (obj) {
        let objMes = cronograma.value.findIndex(x => x.mes === selectedMonth.value);

        if (objMes !== -1) {
            cronograma.value[objMes].title = obj.title;
            cronograma.value[objMes].time = obj.time;
            cronograma.value[objMes].purchased = obj.purchased;

            localStorage.setItem("CRONOGRAMA", JSON.stringify(cronograma.value));
        }
    }
}

onMounted(() => {
    listOfGames.value = JSON.parse(localStorage.getItem("GAMELIST")) ?? [];
    let item = JSON.parse(localStorage.getItem("CRONOGRAMA")) ?? null;
    if (item === null) {
        item = cronograma.value;
        localStorage.setItem("CRONOGRAMA", JSON.stringify(cronograma.value));
    }

    cronograma.value = item;
})

</script>

<template>

    <div class="container">


        <div>
            <form class="form" @submit.prevent="SelectGame">

                <select class="form-control" v-model="selectedMonth" name="" id="">
                    <template v-for="month in months">
                        <option :value="month">{{ month }}</option>
                    </template>
                </select>
                <select class="form-control" v-model="selectedGame" name="" id="selected-game">
                    <option :value="null">Selecione</option>
                    <template v-for="(game, index) in listOfGames">
                        <option :value="game.id">{{ game.title }}</option>
                    </template>
                </select>

                <button class="btn btn-secondary" type="submit">Selecionar</button>
            </form>
        </div>


        <table class="table">
            <thead>
                <tr>

                    <th>Mês</th>
                    <th>Game</th>
                    <th>Tempo médio</th>
                    <th>Tempo Jogado</th>
                    <th>Comprado</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in cronograma">
                    <td><b>{{ item.mes }}</b></td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.time }}</td>
                    <td>0h</td>
                    <td>{{ item.purchased ? "SIM" : "NAO" }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>