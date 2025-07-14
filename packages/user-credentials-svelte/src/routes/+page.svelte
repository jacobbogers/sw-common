<script lang="ts">
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	 <div>
	 </div>
</section>

<style>
	:global(section) {
		display: grid;
		height: 100%;
		border: 4px solid red;
	}

	:global(section > div) {
		width: 100px;
		height: 100px;
		place-self: center;
		border: 4px solid black;
	}
</style>
