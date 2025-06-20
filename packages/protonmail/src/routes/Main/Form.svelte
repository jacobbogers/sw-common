<form name="loginForm" data-testid="login-form" method="post">
  <div
    aria-hidden="true"
    class="absolute z-[1] top-custom left-custom invisible"
    style="--left-custom: -1000px; --top-custom: -1000px;"
  ></div>
  <!--
          <iframe
            tabindex="-1"
            src="https://account-api.proton.me/challenge/v4/html?Type=0&amp;Name=login"
            sandbox="allow-scripts allow-same-origin allow-popups"
            aria-hidden="true"
            class="absolute z-[1] top-custom left-custom"
            style="--left-custom: -1000px; --top-custom: -1000px;"
          ></iframe>
      -->
  <div class="field-two-container field-two--bigger">
    <label
      for="username"
      class="field-two-label-container flex justify-between flex-nowrap items-end gap-2"
      ><span class="field-two-label">Email or username</span></label
    >
    <div class="field-two-input-container relative">
      <div
        class="input flex flex-nowrap items-stretch flex-1 relative"
        data-testid="input-root"
      >
        <div class="flex flex-wrap flex-1">
          <input
            autocomplete="username"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            aria-invalid="false"
            data-testid="input-input-element"
            id="username"
            aria-describedby="id-4"
            class="input-element w-full"
            value="jkfbogers"
          />
        </div>
      </div>
    </div>
    <div class="field-two-assist flex flex-nowrap items-start" id="id-4"></div>
  </div>
  <div class="field-two-container field-two--bigger mt-2">
    <label
      for="password"
      class="field-two-label-container flex justify-between flex-nowrap items-end gap-2"
      ><span class="field-two-label">Password</span></label
    >
    <div class="field-two-input-container relative">
      <div
        class="input flex flex-nowrap items-stretch flex-1 relative"
        data-testid="input-root"
      >
        <div class="flex flex-wrap flex-1">
          <input
            autocomplete="current-password"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            aria-invalid="false"
            data-testid="input-input-element"
            id="password"
            aria-describedby="id-5"
            type="password"
            class="input-element w-full"
            value="Amsterdam2018@me"
          />
        </div>
        <div
          class="input-adornment mr-2 flex items-center shrink-0 flex-nowrap gap-2"
        >
          <button
            class="button button-for-icon button-small button-ghost-weak inline-flex shrink-0"
            tabindex="-1"
            aria-busy="false"
            type="button"
            title="Reveal password"
            aria-label="Reveal password"
            ><svg
              viewBox="0 0 16 16"
              class="w-4 w-4 h-4 m-auto"
              role="img"
              focusable="false"
              aria-hidden="true"><use xlink:href="#ic-eye"></use></svg
            ></button
          >
        </div>
      </div>
    </div>
    <div class="field-two-assist flex flex-nowrap items-start" id="id-5"></div>
  </div>
  <div class="flex flex-wrap flex-row items-start">
    <label for="staySignedIn" class="checkbox-container relative mt-2 mr-2"
      ><input
        id="staySignedIn"
        type="checkbox"
        class="checkbox-input"
        checked
      /><span class="checkbox-fakecheck"
        ><svg
          viewBox="0 0 16 16"
          class="w-4 h-4 checkbox-fakecheck-img"
          role="img"
          focusable="false"
          aria-hidden="true"
        >
          <use xlink:href="#ic-checkmark"> </use>
        </svg>
      </span>
    </label>
    <div class="flex-1">
      <label for="staySignedIn" class="label flex flex-wrap items-center"
        >Keep me signed in</label
      >
      <div class="color-weak">
        Recommended on trusted devices. <a
          href="https://proton.me/support/keep-me-signed-in"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="text-inherit inline-block link-focus">Why?</a
        >
      </div>
    </div>
  </div>
  <button
    class="button w-full button-large button-solid-norm mt-6"
    aria-busy="false"
    type="submit">Sign in</button
  >
  <div class="text-center mt-4">
    New to Proton? <a class="link-focus text-nowrap" href="/mail/signup"
      >Create account</a
    >
  </div>
  <hr class="my-4" />
  <div class="text-center">
    <button
      type="button"
      class="support-dropdown-button relative color-primary mx-auto link link-focus"
      aria-expanded="false"
      aria-describedby="dropdown-6">Trouble signing in?</button
    >
  </div>
</form>
