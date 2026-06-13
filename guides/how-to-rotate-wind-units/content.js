function windReading(strength, direction) {

  const strengthImage = `/assets/wind/wind-strength-${strength}.png`;

  const strengthAltText = `wind strength ${strength}`;

  return `
    <div class="wind-reading-container">
      ${windDirection(direction)}
      ${constrainedImage(strengthImage, strengthAltText, "wind-indicator", false)}
    </div>
  `;
}

function windDirection(direction, extraClasses="") {
  const directionPart = {
    'N': '00-north',
    'N+1': '01-north',
    'NE': '02-northeast',
    'NE+1': '03-east',
    'E': '04-east',
    'E+1': '05-east',
    'SE': '06-southeast',
    'SE+1': '07-south',
    'S': '08-south',
    'S+1': '09-south',
    'SW': '10-southwest',
    'SW+1': '11-west',
    'W': '12-west',
    'W+1': '13-west',
    'NW': '14-northwest',
    'NW+1': '15-north',
  }[direction];

  const directionImage = `/assets/wind/wind-direction-${directionPart}.png`;

  const directionAltText = `wind direction ${direction}`;

  return constrainedImage(directionImage, directionAltText, `wind-indicator ${extraClasses}`, false);
}

const STYLES = `<style>

  .wind-reading-container {
    /*font-size: 0.5em;*/
  }

  @media (pointer: fine) {
  	.wind-indicator {
      height: 35px;
    }
  }

  @media (pointer: coarse) {
    .wind-indicator {
      height: 2em;
    }
  }
	
	.greyscale {
		filter: grayscale(60%);
	}

  .angled-winds {
    /*filter: hue-rotate(90deg);*/
    border: none !important;
    box-shadow: none !important;
  }

  .wind-effect-table {
    padding-top: 10px;
  }

  .wind-effect-table th {
    border: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .wind-effect-table td {
    border: 1px solid black;
  }

  .wind-reading-cell {
    padding: 10px;
  }

  .adjustment-cell {
    text-align: center;
  }

  .padded-adjustment-cell {
    padding-left: 1ch;
    padding-right: 1ch;
  }

  .angled-wind-container {
    font-size: 0px;
    padding-bottom: 20px;
  }

  .math-container {
    text-align: left;
    margin-left: 0;
    margin-right: 0;
  }

  .grey {
    color: #cccccc;
  }

  .image-caption {
    font-style: italic;
    font-size: 0.75em;
    color: #8b8b8b;
  }

  .captioned-image {
    margin-bottom: 7px;
  }

  .wind-effect-table th math {
    font-size: 0.75em;
    font-weight: normal;
    margin-top: 0.25rem;
  }

  .wind-icon-alignment {
    vertical-align: -0.7em;
  }

  .wind-icon-list-spacing {
    margin-bottom: 0.5em;
  }

</style>
`;

const SMALL_WIND_EFFECT_TABLE = `

<table class="wind-effect-table">
  <thead>
    <tr>
      <th>Wind</th>

      <th>
        Horizontal Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>h</mi>
          </msub>
        </math>
      </th>

      <th>
        Vertical Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>v</mi>
          </msub>
        </math>
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td class="wind-reading-cell">${windReading(1, "S")}</td>
      <td class="adjustment-cell grey">-</td>
      <td class="adjustment-cell">Aim 3.5 yards long</td>
    </tr>

    <tr>
      <td class="wind-reading-cell">${windReading(2, "N")}</td>
      <td class="adjustment-cell grey">-</td>
      <td class="adjustment-cell">Aim 7 yards short</td>
    </tr>

    <tr>
      <td class="wind-reading-cell">${windReading(10, "W")}</td>
      <td class="adjustment-cell">30 taps right ⇨</td>
      <td class="adjustment-cell grey">-</td>
    </tr>

    <tr>
      <td class="wind-reading-cell">${windReading(15, "E")}</td>
      <td class="adjustment-cell">45 taps left ⇦</td>
      <td class="adjustment-cell grey">-</td>
    </tr>
  </tbody>
</table>
`;

const BIG_WIND_EFFECT_TABLE = `
<table class="wind-effect-table">
  <thead>
    <tr>
      <th>Wind</th>

      <th>
        Horizontal Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>h</mi>
          </msub>
          <mo>&times;</mo>
          <mi>sin</mi>
          <mo>&ApplyFunction;</mo>
          <mi>&theta;</mi>
        </math>
      </th>

      <th>
        Vertical Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>v</mi>
          </msub>
          <mo>&times;</mo>
          <mi>cos</mi>
          <mo>&ApplyFunction;</mo>
          <mi>&theta;</mi>
        </math>
      </th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td class="wind-reading-cell">
        ${windReading(10, "N")}
        <br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>0</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>

      <td class="adjustment-cell grey">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>0&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>0</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>0</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        <span class="grey">-</span>

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>0&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>35</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        Aim 35 yards short

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windReading(10, "N+1")}
        <br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>22.5</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>22.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>0.38</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>11</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        11 taps left ⇦

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>22.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>0.92</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>32</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        Aim 32 yards short

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windReading(10, "NE")}
        <br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>45</mn>
          <mo>&#176;</mo>
          <mo>)</mo>
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>45&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>0.71</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>21</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        21 taps left ⇦

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>45&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>0.71</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>25</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        Aim 25 yards short

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windReading(10, "NE+1")}
        <br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>67.5</mn>
          <mo>&#176;</mo>
          <mo>)</mo>
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>67.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>0.92</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>28</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        28 taps left ⇦

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>67.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>0.38</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>13</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        Aim 13 yards short

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    
    <tr>
      <td class="wind-reading-cell">
        ${windReading(10, "E")}
        <br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>90</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>

      <td class="adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>90&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>30</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        30 taps left ⇦

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>

      <td class="adjustment-cell grey">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>10</mi>
                <mo>&times;</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>90&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>0</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>0</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        No Adjustment.

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

  </tbody>
</table>
`;

const PRECALCULATED_TABLE = `
<table class="wind-effect-table">
  <thead>
    <tr>
      <th>Wind</th>

      <th>
        Horizontal Unit
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <msub>
            <mi>unit</mi>
            <mi>h</mi>
          </msub>
          <mo>&times;</mo>
          <mi>sin</mi>
          <mo>&ApplyFunction;</mo>
          <mi>&theta;</mi>
        </math>
      </th>

      <th>
        Vertical Unit
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <msub>
            <mi>unit</mi>
            <mi>v</mi>
          </msub>
          <mo>&times;</mo>
          <mi>cos</mi>
          <mo>&ApplyFunction;</mo>
          <mi>&theta;</mi>
        </math>
      </th>
    </tr>
  </thead>

  <tbody>
 <tbody>

    <tr>
      <td class="wind-reading-cell">
        ${windDirection("N")}${windDirection("S")}
        <br><br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>0</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>
      <td class="adjustment-cell grey padded-adjustment-cell">
        <span class="grey">-</span>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>0&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>3.5</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        +/- 3.5 yards per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windDirection("NW+1")}${windDirection("N+1")}
        <br>
        ${windDirection("S+1")}${windDirection("SE+1")}
        <br><br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>22.5</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>22.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>0.38</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>1.14</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        ←/→ &nbsp;1.1 taps per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>22.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>0.92  </mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>3.22</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        +/- 3.2 yards per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windDirection("NW")}${windDirection("NE")}
        <br>
        ${windDirection("SW")}${windDirection("SE")}
        <br><br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>45</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>45&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>0.71</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>2.13</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        ←/→ &nbsp;2.1 taps per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>45&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>0.71</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>2.485</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        +/- 2.5 yards per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windDirection("W+1")}${windDirection("NE+1")}
        <br>
        ${windDirection("SW+1")}${windDirection("E+1")}
        <br><br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>67.5</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>67.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>0.92</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>2.76</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        ←/→ &nbsp;2.8 taps per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>67.5&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>3.5</mi>
                <mo>&times;</mo>
                <mi>0.38</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>1.33</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        +/- 1.3 yards per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

    <tr>
      <td class="wind-reading-cell">
        ${windDirection("W")}${windDirection("E")}
        <br><br>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>=</mo>
          <mn>90</mn>
          <mo>&deg;</mo>
          <mo>)</mo>
        </math>
      </td>
      <td class="adjustment-cell padded-adjustment-cell">
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable>
            <mtr>
              <mtd>
                <mspace height="1em" />
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>90&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
                <mo>=</mo>
                <mi>3</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>
            <mtr>
              <mtd>
              <mo>=</mo>
              <mi>3</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>
        <br>
        ←/→ &nbsp;3 taps per wind.
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
      <td class="adjustment-cell grey padded-adjustment-cell">
        <span class="grey">-</span>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

  </tbody>
</table>

`;

const THE_FORMULAS = `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    <mtable columnalign="left center left">
        <mtr>
            <mtd><msub><mi>effect</mi><mi>h</mi></msub></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
                <mi>sin</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>&theta;</mi>
                <mo>)</mo>
            </mtd>
        </mtr>
        <mtr>
            <mtd><msub><mi>effect</mi><mi>v</mi></msub></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
                <mi>cos</mi>
                <mo>&ApplyFunction;</mo>
                <mo>(</mo>
                <mi>&theta;</mi>
                <mo>)</mo>
            </mtd>
        </mtr>
    </mtable>
</math>

Where:

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    <mtable columnalign="left center left">
        <mtr>
            <mtd><msub><mi>effect</mi><mi>h</mi></msub></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd><mtext>Horizontal effect (Between 0 &ndash; 1)</mtext></mtd>
        </mtr>
        <mtr>
            <mtd><msub><mi>effect</mi><mi>v</mi></msub></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd><mtext>Vertical effect (Between 0 &ndash; 1)</mtext></mtd>
        </mtr>
        <mtr>
            <mtd><mi>θ</mi></mtd>
            <mtd><mo>=</mo></mtd>
            <mtd>
              <mtext>Wind angle (</mtext>
              <mstyle mathvariant="italic">
                  <mtext>0° = North</mtext>
              </mstyle>
              <mtext>)</mtext>
            </mtd>
        </mtr>
    </mtable>
</math>`;

const CONTENT = `
${STYLES}

${title("How To Rotate Wind Units")}
<!--${title("Wind Units (And How To Rotate Them)")}-->


${cautionPanel(`
  <b>Disclaimer:</b>

  <br><br>

  Most people will understand this concept intuitively. To those people, I encourage you not to read into this as it may only cause confusion.

  <br><br>

  The purpose of this guide isn't to encourage excessive calculation during play,
  but instead to offer mathematical insights into how wind works at different angles.
  
  <br><br>

  You only have <b>30 seconds per shot</b>, so make your time count.


`, '')
}

${constrainedImage('./images/slow-play-2.png', 'in-game hurry-up slow-play warning', 'fit-width', false)}

Contents:
- [Wind Units & Formulas](#wu)
- [&nbsp;Optimisation: Memorising values of sin/cos](#o1)
- [&nbsp;Optimisation: The 10% Trick](#o2)
- [&nbsp;Optimisation: Pre-Calculating Wind Units](#o3)
- [&nbsp;Optimisation: Cardinal Alignment](#o4)
- [Examples & Calculations](#example-calculations)

---

<div id="wu"></div>

**Wind units** are a quick way to predict/control the ball flight.

e.g.

- **Horizontal unit:**&nbsp;&nbsp; ←/→ &nbsp;&nbsp;\`3\` taps per wind.
- **Vertical unit:**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +/- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`3.5\` yards per wind.

${infoPanel(`&nbsp; These units were chosen arbitrarily.
  
  Units will vary based on:
<ul>
  <li>Club</li>
  <li>Power</li>
  <li>Height</li>
</ul>

Ultimately, the longer the ball is in the air, the more it will be affected by wind.
`)}

${SMALL_WIND_EFFECT_TABLE}

These units are effective when the wind is aligned North/East/South/West...

But how can we apply them when the wind is angled?

${constrainedImage('./images/angled-winds-5.png', 'Various wind directions', 'fit-width angled-winds', false)}

We can calculate our wind units as normal, then multiply by some number between 0 and 1 to handle rotation.

But how much do we multiply?


${cautionPanel(`
<b>Common misconception:</b>
<p>
You might think that diagonal wind would have 50% of the horizontal effect, and 50% of the vertical effect, but this is <b>false</b>.
</p>

Instead, it has <b>71%</b> of the horizontal effect, and <b>71%</b> of the vertical effect.
`)
}

---

<br>

The secret is:

${THE_FORMULAS}

<br>


_(\`sin\` / \`cos\` tell us how much to multiply):_

${constrainedImage('./images/sin_cos_example_2.png', 'sin/cos illustration', 'fit-width', false)}

<!--
${constrainedImage('./images/Circle_cos_sin.gif', 'Circle sin/cos animation', 'captioned-image fit-width', false)}
<span class="image-caption">Diagram: measuring horizontal & vertical components with sin & cos.</span>
-->


- In the example above, we can multiply our horizontal unit by **0.9** (90%), and our vertical unit by **0.43** (43%).

- It can be tricky to calculate these in your head within the time limit.

- You can speed up calculation with some optimisations below:
    - _Note: Some optimisations might not make sense at first, but should hopefully become clear once you've seen the full calculations at the end._

<br><br>

---

<div id="o1"></div>

## Optimisation: Memorising values of sin/cos

${infoPanel(`
  &nbsp;You can memorise pairs of sin/cos (e.g. the 16 cardinal wind directions) for speed.
  <br><br>
  Some people can figure it out intuitively for any angle, but memorisation is a decent compromise if you're unable.
`)}

${constrainedImage('./images/unit-circle.png', '', 'captioned-image', false)}
<span class="image-caption">Tip: You only need to memorise one quarter of the circle to reconstruct the rest.<br><br>Remember: 0/100, 38/92, 71/71, 92/38, 100/0.</span>

e.g.

<ul>
<li class="wind-icon-list-spacing">${windDirection("N", "wind-icon-alignment")} has <b>0%</b> horizontal effect and <b>100%</b> vertical effect.</li>
<li class="wind-icon-list-spacing">${windDirection("N+1", "wind-icon-alignment")} has <b>38%</b> horizontal effect and <b>92%</b> vertical effect.</li>
<li class="wind-icon-list-spacing">${windDirection("NE", "wind-icon-alignment")} has <b>71%</b> horizontal effect and <b>71%</b> vertical effect.</li>
<li class="wind-icon-list-spacing">${windDirection("NE+1", "wind-icon-alignment")} has <b>92%</b> horizontal effect and <b>38%</b> vertical effect.</li>
<li class="wind-icon-list-spacing">${windDirection("E", "wind-icon-alignment")} has <b>100%</b> horizontal effect and <b>0%</b> vertical effect.</li>
</ul>

<br>

---

<div id="o2"></div>

## Optimisation: The "10%" Trick

${infoPanel(`
&nbsp; You can quickly approximate percentages with the 10% trick.
`)}

A **quick approximation** you can use is to **calculate 10% by moving the decimal place**.
e.g. 10% of 52 is 5.2.

To find 71% of a number, you can find 10% and subtract it three times, to approximate the answer.

To find 38%, you can find 10% and multiply it by 4.

These are only approximations, but the time saved is worth it, for a minimal tradeoff in accuracy.

<br>

---

<div id="o3"></div>

## Optimisation: Pre-Calculating Wind Units At Angles

${infoPanel(`
&nbsp;You can multiply your wind units by sin/cos in advance, rather than doing it in-game every time.  

<br><br>
Let's use the wind units from before:

  <ul>
    <li><b>Horizontal unit:</b>&nbsp;&nbsp; ←/→ &nbsp;&nbsp;<code>3</code> taps per wind.
    <li><b>Vertical unit:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +/- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>3.5</code> yards per wind.
  </ul>
`)}

${PRECALCULATED_TABLE}

${/*`_Note: you don't necessarily need to use a tap system for horizontal units. The same logic is applicable for visual lineups._`*/``}
<br>

---

<div id="o4"></div>

## Optimisation: Cardinal Alignment

${infoPanel(`&nbsp;Position the ball so that it's cardinally-aligned with the flag, to simplify your approach shot.`)}

${constrainedImage('./images/cardinal-positioning-comparison.png', 'On the left: The ball is aligned with the compass (easier shot). On the right: the ball is NOT aligned (harder shot).', 'fit-width', false)}

- This isn't always possible due to course layouts & hazards, but is often beneficial.

<br><br><br>

---

<div id="example-calculations"></div>

# Examples & Calculations

<details>

<summary>Warning: &nbsp;👩‍🏫📐🧮 &nbsp;&nbsp;(click to expand)</summary>

${infoPanel(`
  &nbsp;Let's use the wind units from before:

  <ul>
    <li><b>Horizontal unit:</b>&nbsp;&nbsp; ←/→ &nbsp;&nbsp;<code>3</code> taps per wind.
    <li><b>Vertical unit:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +/- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>3.5</code> yards per wind.
  </ul>


I've written the formulas in full, but you can use the previous optimisations to save time.

  
  
  `)
}


${BIG_WIND_EFFECT_TABLE}

</details>

<br>


<br>



<br>




<br>

---

# Final Notes

- Be mindful that you only have 30 seconds.

- Overcalculation can blind intuition; trust your gut.

- Often the best shots happen when you don't think too much; you can just "feel" the shot.

- I'm not a terribly accurate player yet, so take my advice with a pinch of salt. However, this guide is intended to be objectively mathematical rather than subjective.

- I hope you can internalise this information in some manner, and use it to develop fast & accurate aiming systems.

${cautionPanel(`Please be aware that the wind effect will change as soon as you rotate your aim. Further adjustments are required to compensate for this (which aren't covered here).`)}

<br/>
<br/>
<br/>
<br/>
<br/>

---

_(Last updated: 14th June 2026)_  
<br/>
<br/>
If you have any questions, suggestions or concerns, contact **@byxor** on Discord.
`;