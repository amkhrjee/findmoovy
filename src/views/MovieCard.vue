<script setup>
import { RouterLink } from "vue-router";

defineProps({
    movieList: Array
})
</script>
<template>
    <div class="movie-list">
        <ul>
            <li v-for="movie in movieList" :key="movie.imdbID">
                <RouterLink :to="'/movies/' + movie.imdbID">
                    <img class="poster" :src="movie.Poster" :alt="movie.Title + ' Poster'" />
                </RouterLink>
                <div class="type">{{ movie.Type }}</div>
                <h3>{{ movie.Title }}</h3>
            </li>
        </ul>
    </div>
</template>
<style>
ul {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}
li {
    background: #3c3c3b;
    position: relative;

    border-radius: 12px;

    height: auto;
    overflow: hidden;
    color: #fff;
}
.poster {
    height: 18rem;
    display: block;
    object-fit: cover;
    object-position: center;
}
li h3 {
    padding: 1rem;
    color: #ebebd3;
}

li h4 {
    padding: 1rem;
    color: #ebebd3;
}

.type {
    position: absolute;
    left: 0;
    top: 1rem;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    text-transform: capitalize;
    border-radius: 0 10px 10px 0;
    padding: 0.5rem;
    font-weight: 600;
    backdrop-filter: blur(5px);
}
</style>