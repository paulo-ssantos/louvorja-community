export default defineNuxtPlugin({
  setup() {
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-5EH76J8M2K"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-5EH76J8M2K');
    // </script>

    const googleTagManager = document.createElement("script");
    googleTagManager.async = true;
    googleTagManager.src = "https://www.googletagmanager.com/gtag/js?id=G-5EH76J8M2K";
    document.head.appendChild(googleTagManager);

    const googleTagConfig = document.createElement("script");
    googleTagConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5EH76J8M2K');
    `;
    document.head.appendChild(googleTagConfig);
  },
});
