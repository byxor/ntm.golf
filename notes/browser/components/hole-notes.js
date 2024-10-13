

class HoleNotesComponent extends HTMLElement {

    #navigationController;
    #notes = [];

    init(navigationController) {
        this.#navigationController = navigationController;

        this.#navigationController.onHoleChanged(hole => {
            this.#notes = hole?.notes || [];
            this.#render();
        });
    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style>
                .container {
                    padding-top: 10px;
                    ${this.#notes.length === 0 ? "display: none" : ""}
                }
                .details {
                    user-select: none;
                }
                .summary {
                    cursor: pointer;
                    width: fit-content;
                    padding-right: 100px;
                    font-size: 20px;
                }
                .notes {
                    border-radius: 6px;
                    background-color: #efefef;
                }
                .image {
                    width: 600px;
                    border-radius: 4px;
                    border: 1px solid black;
                }
                .text {
                    padding-top: 10px;
                    padding-left: 10px;
                    padding-bottom: 10px;
                }
                .hidden {
                    display: none;
                }
            </style>
            <div class="container">
                <details open class="details">
                    <summary class="summary">Hole Notes:</summary>
                    <div class="notes">
                    </div>
                </details>
            </div>
        `);

        const container = this.shadowRoot.querySelector(".container");

        const notesContainer = this.shadowRoot.querySelector(".notes");

        this.#notes.forEach(note => {
            if (note instanceof TextHoleNote) {
                const textNote = document.createElement('li');
                textNote.innerHTML = note.text;
                textNote.setAttribute('class', 'text');
                notesContainer.appendChild(textNote);
            } else {
                const imageNote = document.createElement('img');
                imageNote.setAttribute('src', `/assets/references/${note.image}.png`);
                imageNote.setAttribute('class', 'image hidden');
                imageNote.setAttribute('draggable', 'false');
                imageNote.addEventListener('load', () => {
                    imageNote.setAttribute('class', 'image');
                });
                notesContainer.appendChild(imageNote);
            }
        });
    }
}

customElements.define('hole-notes', HoleNotesComponent);