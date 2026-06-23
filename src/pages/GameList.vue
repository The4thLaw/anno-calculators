<template>
	<div class="p-GameList">
		<router-link v-for="(game, key) in games" :key="key" :to="`/games/${key}`">
			<div class="card">
				<div class="card-image">
					<figure class="image is-4by3"
						:style="`background-image: url('${baseUrl}img/${game.value.id}/art.jpg');`">
					</figure>
				</div>
				<div class="card-content">
					{{ game.value.name }}
				</div>
			</div>
		</router-link>
	</div>

	<!--
	TODO: credits
	Calculator Icon by Elegantthemes on <a href="https://icon-icons.com/authors/103-elegantthemes">Icon-Icons.com</a>
	Bulma
	-->
</template>

<script setup lang="ts">
import games from '@/data'
const baseUrl = import.meta.env.BASE_URL
</script>

<style lang="scss">
.p-GameList {
	padding: 3em;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	gap: 2em;

	a {
		display: block;
		width: 15em;
	}

	.card-image .image {
		background-size: cover;
		background-position: 50% 50%;
	}

	.card-content {
		font-size: 150%;
		text-align: center;
	}
}
</style>
