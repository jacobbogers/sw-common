<script lang="ts">
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Main from "./Main/index.svelte";
  import VersionInfo from "./VersionInfo.svelte";
  import HelpBtn from "./HelpBtn.svelte";
</script>

<div
  class="flex min-size-auto>* flex-nowrap flex-col h-full overflow-auto relative sign-layout-bg"
>
  <Header />
  <Main />
  <Footer />
  <HelpBtn />
  <VersionInfo />
  <p
    data-testid="layout-footer:version-text"
    class="block sm:hidden text-center text-sm m-2 mb-4"
  >
    Version 5.0.248.0
  </p>
</div>
