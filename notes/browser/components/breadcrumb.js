class BreadcrumbComponent extends HTMLElement {
	init(text, onClick) {
		this.text = text;
		this.onClick = onClick;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		createTemplate(this, `
			<a class="text" href="javascript:void(0);">${this.text}</a>
		`);

		const text = this.shadowRoot.querySelector(".text");
		text.addEventListener('click', () => this.onClick());
	}
}

customElements.define('breadcrumb-', BreadcrumbComponent);