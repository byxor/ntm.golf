function createTemplate(that, html) {
	if (!that.shadowRoot) {
		that.attachShadow({ mode: 'open' });
	} else {
		that.shadowRoot.innerHTML = '';
	}
	
	const template = document.createElement('template');
	template.innerHTML = html;

	that.shadowRoot.appendChild(template.content.cloneNode(true));
}
