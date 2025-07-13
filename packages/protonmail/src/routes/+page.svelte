<script lang="ts">
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import Main from "./Main/index.svelte";
  import VersionInfo from "./VersionInfo.svelte";
  import HelpBtn from "./HelpBtn.svelte";
  import Spotlight from "./Spotlight.svelte";
</script>

<div
  class="flex min-size-auto>* flex-nowrap flex-col h-full overflow-auto relative sign-layout-bg"
>
  <Header />
  <Main />
  <Footer />
  <HelpBtn />
  <VersionInfo />
  <Spotlight />
</div>
