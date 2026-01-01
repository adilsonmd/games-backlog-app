<script setup></script>
<style scoped>
.section-sidebar {
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #4c4c4c;
}

.sidebar-list {
    display: flex;
    flex-direction: column;
}

.sidebar-item {
    list-style: none;
    padding: 0.25rem;
    margin-block: 0.15rem;
    cursor: pointer;
    border-radius: 0.25rem;

    a {
        display: block;
        color: #4c4c4c;
        text-decoration: none;
        width: 100%;

        &:hover {
            color: #698cad;
        }
    }
}

.sidebar-item:hover {
    background-color: #e2efff;
    color: #e2efff;
}
</style>
<template>

    <nav id="sidebar">

        <div>
            <div>
                <router-link to="/">Meu App</router-link>
            </div>
            <ul class="sidebar-list">
                <li class="sidebar-item">
                    <router-link to="/play">Jogar</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/gamemanager">Game</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/cronograma">Cronograma</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/steam">Steam Library</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/psn">Playstation Library</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/setting">Settings</router-link>
                </li>
            </ul>
        </div>
    </nav>

</template>