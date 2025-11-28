function subtleHr() {
  return `<p class="subtle-hr"></p>`;
}

function subtlerHr() {
  return `<p class="subtler-hr"></p>`;
}

function newTabLink(href, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
}

function os(src) {
  return `<img class="os" src="${src}"></img>`;
}

function windows() {
  return os("/assets/platforms/windows.svg");
}

function mac() {
  return os("/assets/platforms/apple.svg");
}

function linux() {
  return os("/assets/platforms/linux.svg");
}

function sourceCode() {
  return os("/assets/github/github-mark.svg")
}

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

let _panelId = 0;

function cautionPanel(contents) {
	return genericPanel(
		"⚠️",
		"#403717",
		"#e0ce90",
		contents
	);
}

function infoPanel(contents) {
	return genericPanel(
		"ℹ",
		"#1d1740ff",
		"#dce5ffff",
		contents
	);
}

function successPanel(contents) {
	return genericPanel(
		"✅",
		"#275731",
		"#bbfac9",
		contents
	);
}

function successPanel2(contents) {
	return genericPanel(
		"✅",
		"white",
		"#275731",
		contents
	);
}

function genericPanel(emoji, textColor, backgroundColor, contents) {
		_panelId++;
		return `
<style>
	.caution-panel-${_panelId} {
		color: ${textColor};
		background-color: ${backgroundColor};
		border: 1px solid ${textColor};
		border-radius: 4px;
		padding: 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
<div class="caution-panel-${_panelId}">
	${emoji} ${contents}
</div>`;
}

function markdownToHtml(markdown) {
	const converter = new showdown.Converter();
	const html = converter.makeHtml(markdown);
	return html;
}