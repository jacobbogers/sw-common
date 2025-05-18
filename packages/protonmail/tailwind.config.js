/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,svelte,js,ts}'],
    plugins: [
        function({ addVariant, /*addUtilities*/ }) {
            addVariant('lang-en', '&:lang(en)');
            addVariant('blk-full', '&.block-size-full');
            /*addUtilities({
                '.block-size-full': {
                   'block-size': '100%',
                },
            });*/
        }
    ]
  };
  