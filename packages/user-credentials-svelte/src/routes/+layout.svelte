<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="app">
	<navbar>
		this is a navbar
	</navbar>
	<siderbar>
		this is a sidebar
	</siderbar>		
	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			this is a footer
		</p>
	</footer>
</div>

<style>
	.app {
		height: 100%;
		display: grid;
		grid-template: 
		   "navbar navbar" auto
		   "siderbar content"  1fr
		   "footer footer" auto
		   / auto 1fr
	}

	:global(footer) {
		grid-area: footer
	}

	:global(main) {
		grid-area: content;
		place-self: stretch;
		height: 100%;
		border: 4px solid blue;
		
	}

	:global(navbar) {
		grid-area: navbar;
	}

	:global(siderbar) {
		grid-area: siderbar;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px
	}
	
	@media (min-width: 480px) {
		footer {
			padding: 12px 0
		}
	}
</style>
