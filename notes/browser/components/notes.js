class NotesComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					position: relative;
					text-shadow: 0 0 3px red, 0 0 5px blue;
				}

				.list {
					position: absolute;
					left: -30px;
					list-style: none;
				}

				.item {
					color: white;
					font-size: 14px;
				}

				.item::before {
					content: '\\2022    ';
				}

				.item:not(:first-child) {
					margin-top: ${this.notes.length >= 5 ? 10 : 12}px;
				}
			</style>
			<div class="container">
				<ul class="list">
				</ul>
			</div>
		`);

		const notesList = this.shadowRoot.querySelector(".list");
		this.notes.forEach(note => {
			const item = document.createElement("li");
			item.setAttribute("class", "item");
			item.innerHTML = note;
			notesList.appendChild(item);
		});
	}

	init(notes) {
		this.notes = notes;
	}
}

customElements.define('notes-', NotesComponent);
