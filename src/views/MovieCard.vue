<script setup>
import { RouterLink } from "vue-router";

defineProps({
    movieList: Array
})
</script>
<template>
    <div v-if="movieList" class="movie-list">
        <div class="sort-by">
            <button class="all">🍿 All</button>
            <button class="movies">🎬 Movies</button>
            <button class="series">🎞️ Series</button>
            <button class="games">🎮 Games</button>
        </div>
        <ul v-if="movieList">
            <li v-for="movie in movieList" :key="movie.imdbID">
                <RouterLink :to="'/movies/' + movie.imdbID">
                    <img class="poster" :src="movie.Poster" :alt="movie.Title + ' Poster'" />
                </RouterLink>
                <div class="type">{{ movie.Type }}</div>
                <h3>{{ movie.Title }}</h3>
            </li>
        </ul>
        <h2 style="color: wheat;" v-else>No results</h2>
    </div>
</template>
<style>
button {
    text-decoration: none;
    border: none;
    appearance: none;
    margin: 0;
    padding: 0;
    box-sizing: content-box;
}
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

.sort-by {
    display: flex;
    padding: 1rem;
    justify-content: center;
}
.all {
    color: #fff;
    margin-right: 1rem;
    background-color: #e07c24;
    border-radius: 12px;
    padding: 0.5rem;
    border: solid 2px #e07c24;
}
.all:focus {
    border: solid 2px red;
}
.movies {
    color: #fff;

    margin-right: 1rem;
    background-color: #d82e2f;
    border-radius: 12px;
    padding: 0.5rem;
    border: solid 2px #d82e2f;
}
.movies:focus {
    border: 2px solid #e07c24;
}
.series {
    color: #fff;

    margin-right: 1rem;
    background-color: #5a20cb;
    border-radius: 12px;
    padding: 0.5rem;
    border: solid 2px #5a20cb;
}
.series:focus {
    border: 2px solid #bf3312;
}
.games {
    color: #fff;

    margin-right: 1rem;
    background-color: #8d3daf;
    border-radius: 12px;
    padding: 0.5rem;
    border: solid 2px #8d3daf;
}
.games:focus {
    border: 2px solid #bf3312;
}
</style>