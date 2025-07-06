<script lang="ts">
  import Form from "./Form.svelte";
  import AppIcons from "./AppIcons.svelte";
</script>

<div class="p-0 xs:px-6 flex flex-nowrap flex-col justify-between">
  <main>
    <div
      class="w-full max-w-custom relative sign-layout pt-1 pb-6 xs:p-11 ui-standard px-6 mx-auto sm:shadow-lifted shadow-color-primary"
      style="--max-w-custom: 30rem;"
    >
      <!-- label: sign in-->
      <div class="mb-6">
        <div><h1 class="sign-layout-title">Sign in</h1></div>
        <div class="mt-2 color-weak">To continue to Proton Mail</div>
      </div>
      <!-- form fields -->
      <div class="sign-layout-main-content">
        <Form />
      </div>
    </div>
    <AppIcons />
  </main>
</div>
