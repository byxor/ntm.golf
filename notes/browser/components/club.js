class ClubComponent extends HTMLElement {
	connectedCallback() {
		createTemplate(this, `
			<style>
				.container {
					overflow: hidden;
					width: 218px;
				}

				.image {
					position: relative;
					left: -90px;

					width: 220px;
				}
			</style>
			<div class="container">
				<img class="image" src="${this.clubImage}" draggable="false">
			</div>
		`);
	}

	init(club) {
		this.club = club;
		this.clubImage = `/assets/clubs/${club.name}.png`;
	}
}

customElements.define('club-', ClubComponent);
