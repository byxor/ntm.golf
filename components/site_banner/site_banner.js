(async function injectSiteBanner() {
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/components/site_banner/site_banner.css';
    document.head.appendChild(cssLink);

    const res = await fetch('/components/site_banner/site_banner.html');
    const html = await res.text();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.prepend(wrapper);

    const link = document.getElementById('homepage-link');
    if (window.location.pathname === link.pathname) {
        link.setAttribute("title", "Welcome home.");
    }
})();