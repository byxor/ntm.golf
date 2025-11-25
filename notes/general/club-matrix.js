class Fuck {
    constructor(
        crossWind = NaN, // The amount of crosswind covered by the tip of the green arrow (at 3x hook/slice)
        headWind = NaN,  // The yardage lost by headwind (by 5 headwind? idk)

        backSpinDelta = NaN, // The yardage delta (relative to the club) when backspin is applied (in 0 wind) (on the green)
        noSpinDelta = NaN,   // The yardage delta (relative to the club) when no spin is applied  (in 0 wind) (on the green)
        topSpinDelta = NaN,  // The yardage delta (relative to the club) when topspin is applied  (in 0 wind) (on the green)
    ) {
        this.crossWind = crossWind;
        this.headWind = headWind;
        this.backSpinDelta = backSpinDelta;
        this.noSpinDelta = noSpinDelta;
        this.topSpinDelta = topSpinDelta;
    }
}

const CLUB_WIND_DATA = {
    "280y": {
        "99%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        }
    },
    "260y": {
        "99%": {
            "low": new Fuck(NaN, NaN, NaN, -3, NaN),
            "nice": new Fuck(NaN, NaN, NaN, -5, NaN),
            "high": new Fuck(NaN, NaN, NaN, -7, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, NaN, 15, NaN),
            "nice": new Fuck(NaN, NaN, NaN, 15, NaN),
            "high": new Fuck(NaN, NaN, NaN, 14, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, NaN, 44, NaN),
            "nice": new Fuck(NaN, NaN, NaN, 42, NaN),
            "high": new Fuck(NaN, NaN, NaN, 40, NaN),
        }
    },
    "250y": {
        "99%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        }
    },
    "240y": {
        "99%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        }
    },
    "220y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -10, NaN, NaN),
            "nice": new Fuck(NaN, NaN, -8, NaN, NaN),
            "high": new Fuck(NaN, NaN, -14, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, 6, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 6, NaN, NaN),
            "high": new Fuck(NaN, NaN, 3, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 28, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 26, NaN, NaN),
            "high": new Fuck(NaN, NaN, 21, NaN, NaN),
        }
    },
    "210y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -9, NaN, NaN),
            "nice": new Fuck(NaN, NaN, -9, NaN, NaN),
            "high": new Fuck(NaN, NaN, -13, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, 7, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 7, NaN, NaN),
            "high": new Fuck(NaN, NaN, 1, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 29, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 25, NaN, NaN),
            "high": new Fuck(NaN, NaN, 19, NaN, NaN),
        }
    },
    "200y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -10, NaN, NaN),
            "nice": new Fuck(NaN, NaN, -10, NaN, NaN),
            "high": new Fuck(NaN, NaN, -12, NaN, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, 4, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 4, NaN, NaN),
            "high": new Fuck(NaN, NaN, 2, NaN, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 26, NaN, NaN),
            "nice": new Fuck(NaN, NaN, 21, NaN, NaN),
            "high": new Fuck(NaN, NaN, 18, NaN, NaN),
        }
    },
    "190y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -10, -4, NaN),
            "nice": new Fuck(NaN, NaN, -10, -3, NaN),
            "high": new Fuck(NaN, NaN, -13, -4, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, 4, 10, NaN),
            "nice": new Fuck(NaN, NaN, 3, 11, NaN),
            "high": new Fuck(NaN, NaN, 0, 9, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 22, 29, NaN),
            "nice": new Fuck(NaN, NaN, 19, 28, NaN),
            "high": new Fuck(NaN, NaN, 16, 25, NaN),
        }
    },
    "180y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -11, -5, NaN),
            "nice": new Fuck(NaN, NaN, -12, -4, NaN),
            "high": new Fuck(NaN, NaN, -13, -5, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(NaN, NaN, 2, 8, NaN),
            "nice": new Fuck(NaN, NaN, 3, 11, NaN),
            "high": new Fuck(NaN, NaN, -2, 7, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 19, 26, NaN),
            "nice": new Fuck(NaN, NaN, 18, 27, NaN),
            "high": new Fuck(NaN, NaN, 13, 22, NaN),
        }
    },
    "170y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -10, -4, NaN),
            "nice": new Fuck(NaN, NaN, -11, -2, NaN),
            "high": new Fuck(NaN, NaN, -15, -5, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(12.1, NaN, 0, 7, NaN),
            "nice": new Fuck(10.0, NaN, 1, 10, NaN),
            "high": new Fuck(8.9, NaN, -4, 6, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 18, 26, NaN),
            "nice": new Fuck(NaN, NaN, 16, 25, NaN),
            "high": new Fuck(NaN, NaN, 11, 22, NaN),
        }
    },
    "160y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -10, -3, NaN),
            "nice": new Fuck(NaN, NaN, -12, -4, NaN),
            "high": new Fuck(NaN, NaN, -15, -5, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "105%": {
            "low": new Fuck(10.9, NaN, 1, 9, NaN),
            "nice": new Fuck(9.1, NaN, -1, 8, NaN),
            "high": new Fuck(8.0, NaN, -3, 7, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(NaN, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 16, 25, NaN),
            "nice": new Fuck(NaN, NaN, 13, 23, NaN),
            "high": new Fuck(NaN, NaN, 8, 20, NaN),
        }
    },
    "140y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -12, -3, NaN),
            "nice": new Fuck(NaN, NaN, -13, -3, NaN),
            "high": new Fuck(NaN, NaN, -18, -5, NaN),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, 4, NaN),
            "nice": new Fuck(NaN, NaN, NaN, 3, NaN),
            "high": new Fuck(6.9, NaN, NaN, 1, NaN),
        },
        "105%": {
            "low": new Fuck(8.9, NaN, -1, 8, NaN),
            "nice": new Fuck(7.4, NaN, -3, 7, NaN),
            "high": new Fuck(6.2, NaN, -9, 5, NaN),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(6.1, NaN, NaN, NaN, NaN),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 11, 21, NaN),
            "nice": new Fuck(NaN, NaN, 6, 19, NaN),
            "high": new Fuck(NaN, NaN, 1, 16, NaN),
        }
    },
    "120y": {
        "99%": {
            "low": new Fuck(NaN, NaN, -14, -3, NaN),
            "nice": new Fuck(NaN, NaN, -16, -3, NaN),
            "high": new Fuck(NaN, NaN, -19, -5, 3),
        },
        "101%": {
            "low": new Fuck(NaN, NaN, NaN, 2, NaN),
            "nice": new Fuck(NaN, NaN, NaN, 2, NaN),
            "high": new Fuck(5.1, NaN, -17, 0, 8),
        },
        "105%": {
            "low": new Fuck(7.0, NaN, -6, 6, NaN),
            "nice": new Fuck(6.0, NaN, -9, 5, NaN),
            "high": new Fuck(5.2, NaN, -15, 3, 11),
        },
        "max-1%": {
            "low": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "nice": new Fuck(NaN, NaN, NaN, NaN, NaN),
            "high": new Fuck(5, NaN, -12, 6, 14),
        },
        "max%": {
            "low": new Fuck(NaN, NaN, 4, 16, NaN),
            "nice": new Fuck(NaN, NaN, 1, 15, NaN),
            "high": new Fuck(NaN, NaN, -7, 13, 21),
        }
    }
}

class ClubMatrixComponent extends HTMLElement {
    
    init() {

    }

    connectedCallback() {
        this.#render();
    }

    #render() {
        createTemplate(this, `
            <style type="text/css">
            .club-label {
                color: #7e7e7e;
                font-style: italic;
                width: 100%;
                display: block;
                text-align: right;
            }

            .club-image {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
                vertical-align: middle;
            }

            .height-image {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
                vertical-align: middle;
                width: 20px;
                height: 90px;
                overflow: hidden;
                object-fit: cover;
                object-position: -7px center;
                border-radius: 10px;
                opacity: 0.08;
            }

            .power-image {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
                vertical-align: middle;
                width: 70px;
                height: 20px;
                overflow: hidden;
                object-fit: cover;
                object-position: top;
                border-radius: 10px;
            }

            .power-header {
                width: 70px;
            }

            .club-row > td {
                border-top: 1px solid black;
            }

            .lowHighXYZ {
                border-left: 1px solid black;
            }

            /* ------------------- */

            .centered {
                text-align: center;
                vertical-align: middle;
            }


            .invisible {
                opacity: 0 !important;
            }

            /* ------------------- */

            .icon-wrapper {
                position: relative;
                display: inline-block;
                width: 28px;
                height: 28px;
            }

            .icon {
                width: 28px;
            }

            .icon-label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                pointer-events: none;
                -webkit-text-stroke: 0.5px black;
            }

            .icon-wrapper .icon {
                display: block;
                width: 100%;
                height: auto;
            }

            /* ------------------- */

            .wind img {
                filter: hue-rotate(90deg) saturate(4);
            }

            .backspin img {
                filter: hue-rotate(300deg) saturate(0.7);
            }

            .topspin img {
                filter: saturate(4);
            }

            .high.wind img {
                opacity: 0.2;
            }
            
            .nice.wind img {
                opacity: 0.12;
            }

            .low.wind img {
                opacity: 0.07;
            }

            .backspin {
                transform: skew(0.182rad);
            }

            .nospin {
                transform: skew(0.052rad);
            }

            .high.backspin .icon {
                opacity: 0.1;
            }

            .nospin .icon {
                opacity: 0;
            }

            .topspin {
                transform: skew(-0.182rad);
            }

            .high.topspin .icon {
                transform: rotate(180deg);
                opacity: 0.1;
            }

            .nice.topspin .icon {
                opacity: 0.06;
            }

            .low.topspin .icon {
                opacity: 0.04;
            }

            .nice.backspin .icon {
                opacity: 0.06;
            }

            .low.backspin .icon {
                opacity: 0.04;
            }




            .low.wind .icon-label {
                font-size: 11px;
            }

            .nice.wind .icon-label {
                font-size: 15px;
            }

            .high.wind .icon-label {
                font-size: 19px;
            }


            
            .low.delta .icon-label {
                /*font-size: 7px;*/
                /*font-family: Arial Narrow, sans-serif;*/
            }

            .nice.delta .icon-label {
                /*font-size: 9px;*/
                /*font-family: Arial Narrow, sans-serif;*/
            }

            .high.delta .icon-label {
                /*font-size: 15px;*/
                /*font-family: Arial Narrow, sans-serif;*/
            }




            .high.backspin .icon-label {
            
            }

            .high.nospin .icon-label {
            
            }

            .high.topspin .icon-label {
            
            }


            .delta .icon-label {
                color: #9e9e9e;
            }

            .high .icon {
                // filter: saturate(4);
            }

            /*.low .icon {
                opacity: 0.0 !important;
            }

            .nice .icon {
                opacity: 0.0 !important;
            }*/

            </style>
            <table class="tg"><thead>
            <tr>
                <th class="club-header">Club</th>
                <!--${this.#powerHeader('98')}
                ${this.#powerHeader('101')}
                ${this.#powerHeader('max-1')}
                ${this.#powerHeader('max')}
                <th class="height-header"></th>-->
                <th>Crosswind</th>
                <th>Headwind</th>
                <th>Backspin Δ</th>
                <th>No spin Δ</th>
                <th>Topspin Δ</th>
                <!--
                    carry distance?
                    1x hook angle?
                    2x hook angle?
                    3x hook angle?
                    1x hook Δ?
                    2x hook Δ?
                    3x hook Δ?
                -->
            </tr></thead>
            <tbody>
            ${this.#clubRow2("280y")}
            ${this.#clubRow2("260y")}
            ${this.#clubRow2("250y")}
            ${this.#clubRow2("240y")}
            ${this.#clubRow2("220y")}
            ${this.#clubRow2("210y")}
            ${this.#clubRow2("200y")}
            ${this.#clubRow2("190y")}
            ${this.#clubRow2("180y")}
            ${this.#clubRow2("170y")}
            ${this.#clubRow2("160y")}
            ${this.#clubRow2("140y")}
            ${this.#clubRow2("120y")}
            </tbody>
            </table>
        `);
    }

    #powerHeader(power) {
        return `<th class="power-header"><img class="power-image" src="/assets/meter/powers/${power}.png"></img></th>`
    }

    #clubRow2(club) {
        return `
            <tr class="club-row">
                <td class="">${this.#clubImage(club)}</td>
                ${this.#daCell(club, "crosswind")}
                ${this.#daCell(club, "headwind")}
                ${this.#daCell(club, "backspin")}
                ${this.#daCell(club, "nospin")}
                ${this.#daCell(club, "topspin")}
                <!--<td class="">&nbsp;${this.#heightImage(club)}</td>-->
            </tr>
        `; 
    }

    #daCell(club, kind) {
        let innerHTML = "";


        if (kind === "crosswind") {

            const row = (crossWinds, height) => {
                let crossWindClasses = `centered wind ${height}`;

                const crossWindColor = (crossWind) => {
                    const lowColor = "#ff0000ff";
                    const highColor = "#1feb30ff";
                    const crossWindT = (parseFloat(crossWind) - 4) / (12 - 4);
                    return `color:${this.#interpolateColor(lowColor, highColor, crossWindT)}`;
                }

                const crossWindText = n => isNaN(n) ? "" : n.toFixed(1);

                return `
                <tr>
                <td class="${crossWindClasses} ">${this.#iconWithText(crossWindText(crossWinds[0]), "/assets/wind/wind-direction-12-west.png", crossWindColor(crossWinds[0]))}</td>
                <td class="${crossWindClasses} ">${this.#iconWithText(crossWindText(crossWinds[1]), "/assets/wind/wind-direction-12-west.png", crossWindColor(crossWinds[1]))}</td>
                <td class="${crossWindClasses} ">${this.#iconWithText(crossWindText(crossWinds[2]), "/assets/wind/wind-direction-12-west.png", crossWindColor(crossWinds[2]))}</td>
                </tr>
                `
            }

            const lowCrossWinds = [
                CLUB_WIND_DATA[club]["99%"]["low"].crossWind,
                CLUB_WIND_DATA[club]["105%"]["low"].crossWind,
                // CLUB_WIND_DATA[club]["101%"]["low"].crossWind,
                // CLUB_WIND_DATA[club]["max-1%"]["low"].crossWind,
                CLUB_WIND_DATA[club]["max%"]["low"].crossWind,
            ];

            const niceCrossWinds = [
                CLUB_WIND_DATA[club]["99%"]["nice"].crossWind,
                CLUB_WIND_DATA[club]["105%"]["nice"].crossWind,
                // CLUB_WIND_DATA[club]["101%"]["nice"].crossWind,
                // CLUB_WIND_DATA[club]["max-1%"]["nice"].crossWind,
                CLUB_WIND_DATA[club]["max%"]["nice"].crossWind,
            ];

            const highCrossWinds = [
                CLUB_WIND_DATA[club]["99%"]["high"].crossWind,
                CLUB_WIND_DATA[club]["105%"]["high"].crossWind,
                // CLUB_WIND_DATA[club]["101%"]["high"].crossWind,
                // CLUB_WIND_DATA[club]["max-1%"]["high"].crossWind,
                CLUB_WIND_DATA[club]["max%"]["high"].crossWind,
            ];

            innerHTML = `
                ${row(lowCrossWinds, "low")}
                ${row(niceCrossWinds, "nice")}
                ${row(highCrossWinds, "high")}
            `;
        } else if (kind === "headwind") {

            const row = (headWinds, height) => {
                let headWindClasses = `centered wind ${height}`;

                const headWindColor = (headWind) => {
                    const lowColor = "#ff0000ff";
                    const highColor = "#1feb30ff";
                    const headWindT = (parseFloat(headWind) - 4) / (12 - 4);
                    return `color:${this.#interpolateColor(lowColor, highColor, headWindT)}`;
                }

                const headWindText = n => isNaN(n) ? "" : this.#round(n);

                return `
                <tr>
                <td class="${headWindClasses} ">${this.#iconWithText(headWindText(headWinds[0]), "/assets/wind/wind-direction-08-south.png", headWindColor(headWinds[0]))}</td>
                <td class="${headWindClasses} ">${this.#iconWithText(headWindText(headWinds[1]), "/assets/wind/wind-direction-08-south.png", headWindColor(headWinds[1]))}</td>
                <td class="${headWindClasses} ">${this.#iconWithText(headWindText(headWinds[2]), "/assets/wind/wind-direction-08-south.png", headWindColor(headWinds[2]))}</td>
                </tr>
                `
            }

            const lowHeadWinds = [
                CLUB_WIND_DATA[club]["99%"]["low"].headWind,
                CLUB_WIND_DATA[club]["105%"]["low"].headWind,
                // CLUB_WIND_DATA[club]["101%"]["low"].headWind,
                // CLUB_WIND_DATA[club]["max-1%"]["low"].headWind,
                CLUB_WIND_DATA[club]["max%"]["low"].headWind,
            ];

            const niceHeadWinds = [
                CLUB_WIND_DATA[club]["99%"]["nice"].headWind,
                CLUB_WIND_DATA[club]["105%"]["nice"].headWind,
                // CLUB_WIND_DATA[club]["101%"]["nice"].headWind,
                // CLUB_WIND_DATA[club]["max-1%"]["nice"].headWind,
                CLUB_WIND_DATA[club]["max%"]["nice"].headWind,
            ];

            const highHeadWinds = [
                CLUB_WIND_DATA[club]["99%"]["high"].headWind,
                CLUB_WIND_DATA[club]["105%"]["high"].headWind,
                // CLUB_WIND_DATA[club]["101%"]["high"].headWind,
                // CLUB_WIND_DATA[club]["max-1%"]["high"].headWind,
                CLUB_WIND_DATA[club]["max%"]["high"].headWind,
            ];

            innerHTML = `
                ${row(lowHeadWinds, "low")}
                ${row(niceHeadWinds, "nice")}
                ${row(highHeadWinds, "high")}
            `;
        } else if (kind === "backspin") {

            const row = (backSpins, height) => {
                let backSpinClasses = `centered backspin delta ${height}`;

                const shouldShowSpin = ["120y", "140y", "160y", "170y", "180y", "190y", "200y", "210y", "220y"].indexOf(club) > -1;
                if (!shouldShowSpin) {
                    backSpinClasses += ' invisible';
                }

                const backSpinText = n => isNaN(n) ? "" : this.#round(n);

                const fontSize = delta => {
                    let absDelta = Math.min(Math.abs(delta), 20);

                    const minDelta = 0;
                    const maxDelta = 20;
                    const deltaDelta = maxDelta - minDelta;

                    const fontSizeA = 9;
                    const fontSizeB = 19;
                    const fontSizeDelta = fontSizeB - fontSizeA;

                    // Normalize and apply exponential curve
                    let t = absDelta / deltaDelta; // normalized 0..1
                    // t = 1 - t; // hack to flip the scaling?
                    const exponent = 0.7; // try 1.5–3 for different curves
                    const curved = Math.pow(t, exponent);

                    const size = fontSizeA + curved * fontSizeDelta;

                    return `font-size:${size}px`;
                };

                const fontColor = delta => {
                    let colorA, colorB;

                    const absLower = 0;
                    const absUpper = 20;
                    let absDelta = Math.abs(delta);

                    if (delta < 0) {
                        colorA = "#ffffff";
                        colorB = "#ff0000ff";
                        if (absDelta < (0-absUpper)) {
                            absDelta = 0 - absUpper;
                        }
                    } else {
                        colorA = "#ffffff";
                        colorB = "#1feb30ff";
                        if (absDelta > absUpper) {
                            absDelta = absUpper;
                        }
                    }

                    const t = absDelta / absUpper;

                    const fontColor = this.#interpolateColor(colorA, colorB, t);

                    return `color:${fontColor}`;
                }

                return `
                <tr>
                <td class="${backSpinClasses} ">${this.#iconWithText(backSpinText(backSpins[0]), "/assets/spins/backspin-4.png", `margin-top: 3.5px;${fontSize(backSpins[0])};${fontColor(backSpins[0])}`)}</td>
                <td class="${backSpinClasses} ">${this.#iconWithText(backSpinText(backSpins[1]), "/assets/spins/backspin-4.png", `margin-top: 3.5px;${fontSize(backSpins[1])};${fontColor(backSpins[1])}`)}</td>
                <td class="${backSpinClasses} ">${this.#iconWithText(backSpinText(backSpins[2]), "/assets/spins/backspin-4.png", `margin-top: 3.5px;${fontSize(backSpins[2])};${fontColor(backSpins[2])}`)}</td>
                </tr>
                `
            }

            const lowBackSpins = [
                CLUB_WIND_DATA[club]["99%"]["low"].backSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["low"].backSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["low"].backSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["low"].backSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["low"].backSpinDelta,
            ];

            const niceBackSpins = [
                CLUB_WIND_DATA[club]["99%"]["nice"].backSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["nice"].backSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["nice"].backSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["nice"].backSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["nice"].backSpinDelta,
            ];

            const highBackSpins = [
                CLUB_WIND_DATA[club]["99%"]["high"].backSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["high"].backSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["high"].backSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["high"].backSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["high"].backSpinDelta,
            ];

            innerHTML = `
                ${row(lowBackSpins, "low")}
                ${row(niceBackSpins, "nice")}
                ${row(highBackSpins, "high")}
            `;
        } else if (kind === "nospin") {

            const row = (noSpins, height) => {

                const fontSize = delta => {
                    let absDelta = Math.min(Math.abs(delta), 20);

                    const minDelta = 0;
                    const maxDelta = 20;
                    const deltaDelta = maxDelta - minDelta;

                    const fontSizeA = 9;
                    const fontSizeB = 19;
                    const fontSizeDelta = fontSizeB - fontSizeA;

                    // Normalize and apply exponential curve
                    let t = absDelta / deltaDelta; // normalized 0..1
                    // t = 1 - t; // hack to flip the scaling?
                    const exponent = 0.7; // try 1.5–3 for different curves
                    const curved = Math.pow(t, exponent);

                    const size = fontSizeA + curved * fontSizeDelta;

                    return `font-size:${size}px`;
                };

                const fontColor = delta => {
                    let colorA, colorB;

                    const absLower = 0;
                    const absUpper = 20;
                    let absDelta = Math.abs(delta);

                    if (delta < 0) {
                        colorA = "#ffffff";
                        colorB = "#ff0000ff";
                        if (absDelta < (0-absUpper)) {
                            absDelta = 0 - absUpper;
                        }
                    } else {
                        colorA = "#ffffff";
                        colorB = "#1feb30ff";
                        if (absDelta > absUpper) {
                            absDelta = absUpper;
                        }
                    }

                    const t = absDelta / absUpper;

                    const fontColor = this.#interpolateColor(colorA, colorB, t);

                    return `color:${fontColor}`;
                }

                let noSpinClasses = `centered nospin delta ${height}`;

                const noSpinText = n => isNaN(n) ? "" : this.#round(n);

                return `
                <tr>
                <td class="${noSpinClasses} ">${this.#iconWithText(noSpinText(noSpins[0]), "/assets/spins/backspin-4.png", `margin-top: 2px;${fontSize(noSpins[0])};${fontColor(noSpins[0])}`)}</td>
                <td class="${noSpinClasses} ">${this.#iconWithText(noSpinText(noSpins[1]), "/assets/spins/backspin-4.png", `margin-top: 2px;${fontSize(noSpins[1])};${fontColor(noSpins[1])}`)}</td>
                <td class="${noSpinClasses} ">${this.#iconWithText(noSpinText(noSpins[2]), "/assets/spins/backspin-4.png", `margin-top: 2px;${fontSize(noSpins[2])};${fontColor(noSpins[2])}`)}</td>
                </tr>
                `
            }

            const lowNoSpins = [
                CLUB_WIND_DATA[club]["99%"]["low"].noSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["low"].noSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["low"].noSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["low"].noSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["low"].noSpinDelta,
            ];

            const niceNoSpins = [
                CLUB_WIND_DATA[club]["99%"]["nice"].noSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["nice"].noSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["nice"].noSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["nice"].noSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["nice"].noSpinDelta,
            ];

            const highNoSpins = [
                CLUB_WIND_DATA[club]["99%"]["high"].noSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["high"].noSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["high"].noSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["high"].noSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["high"].noSpinDelta,
            ];

            innerHTML = `
                ${row(lowNoSpins, "low")}
                ${row(niceNoSpins, "nice")}
                ${row(highNoSpins, "high")}
            `;

        } else if (kind === "topspin") {
            const row = (topSpins, height) => {

                const fontColor = delta => {
                    let colorA, colorB;

                    const absLower = 0;
                    const absUpper = 20;
                    let absDelta = Math.abs(delta);

                    if (delta < 0) {
                        colorA = "#ffffff";
                        colorB = "#ff0000ff";
                        if (absDelta < (0-absUpper)) {
                            absDelta = 0 - absUpper;
                        }
                    } else {
                        colorA = "#ffffff";
                        colorB = "#1feb30ff";
                        if (absDelta > absUpper) {
                            absDelta = absUpper;
                        }
                    }

                    const t = absDelta / absUpper;

                    const fontColor = this.#interpolateColor(colorA, colorB, t);

                    return `color:${fontColor}`;
                }

                const fontSize = delta => {
                    let absDelta = Math.min(Math.abs(delta), 20);

                    const minDelta = 0;
                    const maxDelta = 20;
                    const deltaDelta = maxDelta - minDelta;

                    const fontSizeA = 9;
                    const fontSizeB = 19;
                    const fontSizeDelta = fontSizeB - fontSizeA;

                    // Normalize and apply exponential curve
                    let t = absDelta / deltaDelta; // normalized 0..1
                    // t = 1 - t; // hack to flip the scaling?
                    const exponent = 0.7; // try 1.5–3 for different curves
                    const curved = Math.pow(t, exponent);

                    const size = fontSizeA + curved * fontSizeDelta;

                    return `font-size:${size}px`;
                };

                let topSpinClasses = `centered topspin delta ${height}`;

                const shouldShowSpin = ["120y", "140y", "160y", "170y", "180y", "190y", "200y", "210y", "220y"].indexOf(club) > -1;
                if (!shouldShowSpin) {
                    topSpinClasses += ' invisible';
                }

                const topSpinText = n => isNaN(n) ? "" : this.#round(n);

                return `
                <tr>
                <td class="${topSpinClasses} ">${this.#iconWithText(topSpinText(topSpins[0]), "/assets/spins/backspin-4.png", `margin-top: 0px;${fontSize(topSpins[0])};${fontColor(topSpins[0])}`)}</td>
                <td class="${topSpinClasses} ">${this.#iconWithText(topSpinText(topSpins[1]), "/assets/spins/backspin-4.png", `margin-top: 0px;${fontSize(topSpins[1])};${fontColor(topSpins[1])}`)}</td>
                <td class="${topSpinClasses} ">${this.#iconWithText(topSpinText(topSpins[2]), "/assets/spins/backspin-4.png", `margin-top: 0px;${fontSize(topSpins[2])};${fontColor(topSpins[2])}`)}</td>
                </tr>
                `
            }

            const lowTopSpins = [
                CLUB_WIND_DATA[club]["99%"]["low"].topSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["low"].topSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["low"].topSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["low"].topSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["low"].topSpinDelta,
            ];

            const niceTopSpins = [
                CLUB_WIND_DATA[club]["99%"]["nice"].topSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["nice"].topSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["nice"].topSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["nice"].topSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["nice"].topSpinDelta,
            ];

            const highTopSpins = [
                CLUB_WIND_DATA[club]["99%"]["high"].topSpinDelta,
                CLUB_WIND_DATA[club]["105%"]["high"].topSpinDelta,
                // CLUB_WIND_DATA[club]["101%"]["high"].topSpinDelta,
                // CLUB_WIND_DATA[club]["max-1%"]["high"].topSpinDelta,
                CLUB_WIND_DATA[club]["max%"]["high"].topSpinDelta,
            ];

            innerHTML = `
                ${row(lowTopSpins, "low")}
                ${row(niceTopSpins, "nice")}
                ${row(highTopSpins, "high")}
            `;
        }


        return `
        <td class="lowHighXYZ">
        <table style="width: 46px;">
        <tbody>
            ${innerHTML}
        </tbody>
        </table>
        </td>
        `;
    }

    #XYZ2(club, height) {
        const lowColor = "#ff0000ff";
        const highColor = "#1feb30ff";
        const crossWindT = (parseFloat(fuck.crossWind) - 4) / (12 - 4);
        const crossWindTextStyle = `color:${this.#interpolateColor(lowColor, highColor, crossWindT)}`;

        const crossWindText = isNaN(fuck.crossWind) ? "" : this.#round(fuck.crossWind);
        const headWindText = isNaN(fuck.headWind) ? "" : this.#round(fuck.headWind);
        const backSpinText = isNaN(fuck.backSpinDelta) ? "" : this.#withSign(fuck.backSpinDelta);
        const noSpinText = isNaN(fuck.noSpinDelta) ? "" : this.#withSign(fuck.noSpinDelta);
        const topSpinText = isNaN(fuck.topSpinDelta) ? "" : this.#withSign(fuck.topSpinDelta);


        let crossWindClasses = `centered wind ${height}`;
        let headWindClasses =  `centered wind ${height}`;

        let backSpinClasses = `centered backspin ${height} delta`;        
        let noSpinClasses =   `centered nospin ${height} delta`;
        let topSpinClasses =  `centered topspin ${height} delta`;
        
        const shouldShowSpin = ["120y", "140y", "160y", "170y", "180y", "190y", "200y", "210y", "220y"].indexOf(club) > -1;
        if (!shouldShowSpin) {
            backSpinClasses += ' invisible';
            topSpinClasses += ' invisible';
        }

        return `
        <tr>
        <td class="${crossWindClasses}">${this.#iconWithText(crossWindText, "/assets/wind/wind-direction-12-west.png", crossWindTextStyle)}</td>
        <td class="${headWindClasses}" >${this.#iconWithText(headWindText, "/assets/wind/wind-direction-08-south.png")}</td>
        <td>&nbsp;&nbsp;</td>
        <td class="${backSpinClasses}">${this.#iconWithText(backSpinText, "/assets/spins/backspin-4.png", "margin-top: 3.5px")}</td> 
        <td class="${noSpinClasses}"   >${this.#iconWithText(noSpinText, "/assets/spins/backspin-4.png", "margin-top: 2px")}</td>
        <td class="${topSpinClasses}"  >${this.#iconWithText(topSpinText, "/assets/spins/backspin-4.png", "margin-top: 0px")}</td> 
        </tr>
        `;
    }


    #clubRow(club) {
        return `
            <tr class="club-row">
                <td class="">${this.#clubImage(club)}</td>
                ${this.#lowHighXYZ(club, "99%")}
                ${this.#lowHighXYZ(club, "101%")}
                ${this.#lowHighXYZ(club, "max-1%")}
                ${this.#lowHighXYZ(club, "max%")}
                <!--<td class="">&nbsp;${this.#heightImage(club)}</td>-->
            </tr>
        `;
    }

    #lowHighXYZ(club, power) {
        const fuckLow = CLUB_WIND_DATA[club][power]["low"];
        const fuckNice = CLUB_WIND_DATA[club][power]["nice"];
        const fuckHigh = CLUB_WIND_DATA[club][power]["high"];
        return `
        <td class="lowHighXYZ">
        <table style="width: 46px;">
        <tbody>
            ${this.#XYZ(club, "low", fuckLow)}
            ${this.#XYZ(club, "nice", fuckNice)}
            ${this.#XYZ(club, "high", fuckHigh)}
        </tbody>
        </table>
        </td>
        `;
    }

    #XYZ(club, height, fuck) {
        const lowColor = "#ff0000ff";
        const highColor = "#1feb30ff";
        const crossWindT = (parseFloat(fuck.crossWind) - 4) / (12 - 4);
        const crossWindTextStyle = `color:${this.#interpolateColor(lowColor, highColor, crossWindT)}`;

        const crossWindText = isNaN(fuck.crossWind) ? "" : this.#round(fuck.crossWind);
        const headWindText = isNaN(fuck.headWind) ? "" : this.#round(fuck.headWind);
        const backSpinText = isNaN(fuck.backSpinDelta) ? "" : this.#withSign(fuck.backSpinDelta);
        const noSpinText = isNaN(fuck.noSpinDelta) ? "" : this.#withSign(fuck.noSpinDelta);
        const topSpinText = isNaN(fuck.topSpinDelta) ? "" : this.#withSign(fuck.topSpinDelta);


        let crossWindClasses = `centered wind ${height}`;
        let headWindClasses =  `centered wind ${height}`;

        let backSpinClasses = `centered backspin ${height} delta`;        
        let noSpinClasses =   `centered nospin ${height} delta`;
        let topSpinClasses =  `centered topspin ${height} delta`;
        
        const shouldShowSpin = ["120y", "140y", "160y", "170y", "180y", "190y", "200y", "210y", "220y"].indexOf(club) > -1;
        if (!shouldShowSpin) {
            backSpinClasses += ' invisible';
            topSpinClasses += ' invisible';
        }

        return `
        <tr>
        <td class="${crossWindClasses}">${this.#iconWithText(crossWindText, "/assets/wind/wind-direction-12-west.png", crossWindTextStyle)}</td>
        <td class="${headWindClasses}" >${this.#iconWithText(headWindText, "/assets/wind/wind-direction-08-south.png")}</td>
        <td>&nbsp;&nbsp;</td>
        <td class="${backSpinClasses}">${this.#iconWithText(backSpinText, "/assets/spins/backspin-4.png", "margin-top: 3.5px")}</td> 
        <td class="${noSpinClasses}"   >${this.#iconWithText(noSpinText, "/assets/spins/backspin-4.png", "margin-top: 2px")}</td>
        <td class="${topSpinClasses}"  >${this.#iconWithText(topSpinText, "/assets/spins/backspin-4.png", "margin-top: 0px")}</td> 
        </tr>
        `;
    }

    #iconWithText(text, source, spanStyle="") {
        return `
            <div class="icon-wrapper">
                <img class="icon" src="${source}">
                <span class="icon-label" style="${spanStyle}">${text}</span>
            </div>
        `;
    }

    #clubImage(club) {
        return `<span class="club-label">${club.substring(0, club.length - 1)}&nbsp;</span><img class="club-image" src="/assets/clubs/panels/${club}_switch_panel.png"></img>`;
    }

    #heightImage(club) {
        const range = {
            "280y": "e",
            "260y": "e",
            "250y": "e",
            "240y": "e",
            "220y": "d",
            "210y": "c",
            "200y": "c",
            "190y": "c",
            "180y": "b",
            "170y": "b",
            "160y": "b",
            "140y": "a",
            "120y": "a",
        }[club];

        return `<img class="height-image" src="/assets/meter/heights/range-${range}.png"></img>`;
    }

    #hideNan(x) {
        if (isNaN(x)) {
            return "";
        }
        return x;
    }

    #withSign(x) {
        // hack: temporarily disable...
        return x;

        if (x > 0) {
            return `+${x}`;
        }
        
        return x;
    }

    #round(x) {
        return Math.round(x * 2.0) / 2.0;
    }

    #roundToTenth(x) {
        return Math.round(x * 10) / 10;
    }

    #roundToQuarter(x) {
        return Math.round(x * 4) / 4;
    }

    #interpolateColor(color1, color2, t) {
        t = Math.max(0, Math.min(1, t));
        const c1 = [
            parseInt(color1.slice(1, 3), 16),
            parseInt(color1.slice(3, 5), 16),
            parseInt(color1.slice(5, 7), 16)
        ];
        const c2 = [
            parseInt(color2.slice(1, 3), 16),
            parseInt(color2.slice(3, 5), 16),
            parseInt(color2.slice(5, 7), 16)
        ];
        const interp = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
        const hex = interp.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
        return `#${hex}`;
    }

}

customElements.define('club-matrix', ClubMatrixComponent);
