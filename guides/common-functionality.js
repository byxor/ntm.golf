function githubLogo() {
    return `<img
      src="/assets/github/github-mark.svg"
      alt="GitHub Logo"
      style="height: 1em; vertical-align: -0.125em;"
    >`;
}

function constrainedImage(src, alt="", classes="", fullscreen=true) {
	if (fullscreen) {
		classes += "constrained-image-pointer";
	}
	const html = `<img
		src="${src}"
		alt="${alt}"
		${fullscreen ? `onclick="this.requestFullscreen({navigationUI: 'show'})"` : ""} class="constrained-image ${classes}"
		draggable="false"
	>
	</img>`
	return html;
}

function title(title) {
    return `<div class="header">
        <a href="/" class="home-link">⬅ Back</a>
        <h1>${title}</h1>
    </div>`;
}

function markdownToHtml(markdown) {
	const converter = new showdown.Converter();
	const html = converter.makeHtml(markdown);
	return html;
}