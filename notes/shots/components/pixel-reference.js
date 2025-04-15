class PixelReferenceComponent extends HTMLElement {

    #smallestOffset;
    #largestOffset;
    #offsets;
    #distance;

    init(offsetOrOffsets, distance) {
        this.#offsets = offsetOrOffsets.split(",").map(x => parseInt(x));
        this.#offsets.sort((a, b) => a - b);
        console.log(this.#offsets);
        this.#distance = distance;

        this.#largestOffset = 0;
        for (let i = 0; i < this.#offsets.length; i++) {
            const offset = this.#offsets[i];
            if (Math.abs(offset) > Math.abs(this.#largestOffset)) {
                this.#largestOffset = offset;
            }
        }
    }

    connectedCallback() {
        this.#render();
    }

    // TODO: draw a yellow flag in the canvas.
    // can use the distance to determine number of vertical pixels.
    // need to make sure it's at the right height though relative to the horizon
    #render() {
        const unscaledWidth = 304;
        const unscaledHeight = 93 + 1;
        const scale = 4;

        const scaledWidth = unscaledWidth * scale;
        const scaledHeight = unscaledHeight * scale;

        const zeroColumn = 135;

        const horizonRow = 6;
        const largestFlagColumn = this.#largestOffset + zeroColumn;
        const flagColumns = this.#offsets.map(offset => offset + zeroColumn);

        const offsetText = this.#offsets.length > 1 ? this.#offsets.join(", ") : this.#largestOffset > 0 ? `+${this.#largestOffset}`: this.#largestOffset;

        createTemplate(this, `
            <style>
                .container {
                    overflow: hidden;
                    width: 720px;
                    border: 1px solid black;
                    border-radius: 3px;
                }

                .canvas {
                    position: relative;
                    left: -${((largestFlagColumn - 105) * scale)}px;

                    width: ${scaledWidth}px;
                    image-rendering: pixelated;
                }
            </style>
           
            <div class="container" title="${offsetText} pixels">
                <canvas class="canvas" width=${scaledWidth} height=${scaledHeight}>
                </canvas>
            </div>
        `);

        const canvas = this.shadowRoot.querySelector(".canvas");
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = false;

        const skyColour = "black";
        const groundColour = "#443b6b";

        const [flagTop, flagBottom] = (() => {
            if (this.#distance <= 124) {
                return [horizonRow-2, horizonRow+4];
            } else if (this.#distance >= 125) {
                return [horizonRow-1, horizonRow+4];
            } else if (this.#distance >= 146) {
                return [horizonRow-2, horizonRow+3];
            }
        })();
        const flagHeight = flagBottom - flagTop;

        const drawSky = () => {
            context.fillStyle = skyColour;
            context.fillRect(0, 0, scaledWidth, scaledHeight);
        };
    
        const drawGround = () => {
            context.fillStyle = groundColour;
            context.fillRect(0, horizonRow * scale, scaledWidth, scaledHeight);
        };

        const drawPutterPixelIndicator = () => {
            context.fillStyle = "white";
            context.globalAlpha = 0.05;
            context.fillRect(zeroColumn * scale, (horizonRow - 5) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow - 2) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow + 1) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow + 4) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow + 7) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow + 10) * scale, scale, 2 * scale);
            context.fillRect(zeroColumn * scale, (horizonRow + 13) * scale, scale, 2 * scale);
            context.globalAlpha = 1.0;
        };

        const drawHorizontalWidthIndicator = () => {
            context.fillStyle = "white";

            const startColumn = (largestFlagColumn < zeroColumn ? largestFlagColumn : zeroColumn) + 1;
            const endColumn = largestFlagColumn > zeroColumn ? largestFlagColumn : zeroColumn;
            for (let x = startColumn; x < endColumn; x++) {
                if (x % 2 !== 0) {
                    context.globalAlpha = 0.05;
                } else {
                    context.globalAlpha = 0.0;
                }
                context.fillRect(x * scale, (horizonRow + 3) * scale, scale, scale);        
            }
            context.globalAlpha = 1.0;
        };

        const drawVerticalIndicators = () => {
            for (let i = 0; i < flagColumns.length; i++) {
                const flagColumn = flagColumns[i];
    
                let temp = Math.abs(this.#largestOffset);
                const limit = 6;
                if (temp > limit) {
                    temp = limit;
                }
                const brightness = 255 - (temp * 20);
                context.fillStyle = `rgba(0, ${brightness}, 0, 1)`;
                context.globalAlpha = 0.4;
                for (let i = 0; i < 100; i+=3) {
                     // (weak attempt to improve visibility when multiflagreferences are bunched together)
                    const extraOffset = (() => {
                        if (this.#offsets.length <= 1) {
                            return 0;
                        }
                        return (flagColumn % 2 == 0 ? 0 : -2);
                    })();
                    context.fillRect(flagColumn * scale, (horizonRow + 1 + i + extraOffset) * scale, scale, 2 * scale);
                }
                context.fillRect((flagColumn * scale), flagTop * scale, scale, scaledHeight);
                context.globalAlpha = 1.0;
            }
        };

        const drawFlags = () => {
            for (let i = 0; i < flagColumns.length; i++) {
                const flagColumn = flagColumns[i];

                context.fillStyle = "yellow";
                
                // (weak attempt to improve visibility when multiflagreferences are bunched together)
                // if (this.#offsets.length > 1 && flagColumn % 2 != 0) {
                    // context.fillStyle = "gold";
                // }

                // maybe shade them depending on how far out they are (sorted by absolute value)
                // or by how far of a gap they have

                context.fillRect((flagColumn * scale), flagTop * scale, scale, flagHeight * scale);
            }
        };

        drawSky();
        drawGround();

        drawPutterPixelIndicator();
        drawHorizontalWidthIndicator();
        drawVerticalIndicators();

        drawFlags();

        // draw reference image
        const pixelOffsetsImage = document.querySelector(".pixel-offsets");
        context.drawImage(pixelOffsetsImage, 0, scale, scaledWidth, scaledHeight-(scale));

        // draw offset text
        const spacedOffsetText = this.#largestOffset === 0 ? " " + offsetText : offsetText;
        let xPos = 243 * scale;
        if (spacedOffsetText.length > 2) {
            xPos -= 4.8 * scale;
        }
        context.fillStyle = "#900000";
        context.font = "40px verdana";
        context.fillText(spacedOffsetText, xPos, 74 * scale);
    }

}

customElements.define('pixel-reference', PixelReferenceComponent);