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

function windDirection(direction) {
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

  return constrainedImage(directionImage, directionAltText, "wind-indicator", false);
}

const STYLES = `<style>

  .wind-reading-container {
    /*font-size: 0.5em;*/
  }

	.wind-indicator {
		height: 35px;
	}
  
	.greyscale {
		filter: grayscale(60%);
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
    font-size: 14px;
    color: #8b8b8b;
  }

  .captioned-image {
    margin-bottom: 7px;
  }

  .wind-effect-table th math {
    font-size: 0.7em;
    font-weight: normal;
    margin-top: 0.25rem;
  }

</style>
`;

const CONTENT = `
${STYLES}

${title("How To Rotate Wind Units")}
<!--${title("Wind Units (And How To Rotate Them)")}-->

**Disclaimer**:

The purpose of this guide isn't to encourage excessive calculation during play,
but instead to give some insight into how it works.

You only have 30 seconds per shot, so make them count.

${constrainedImage('./images/slow-play-2.png', 'in-game hurry-up slow-play warning', '', false)}

---

Wind units are a quick way to predict/control the ball flight.

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
<table class="wind-effect-table">
  <thead>
    <tr>
      <th>Wind</th>

      <th>
        Horizontal Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mo>(</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>h</mi>
          </msub>
          <mo>)</mo>
        </math>
      </th>

      <th>
        Vertical Adjustment
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mo>=</mo>
          <mo>(</mo>
          <mi>wind</mi>
          <mo>&times;</mo>
          <msub>
            <mi>unit</mi>
            <mi>v</mi>
          </msub>
          <mo>)</mo>
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

These units are effective when the wind is aligned North/East/South/West...

But how can we apply them when the wind is angled?

<div class="angled-wind-container">
${windDirection("N+1")}${windDirection("NE")}${windDirection("NE+1")}${windDirection("E+1")}${windDirection("SE")}${windDirection("SE+1")}${windDirection("S+1")}${windDirection("SW")}${windDirection("SW+1")}${windDirection("W+1")}${windDirection("NW")}${windDirection("NW+1")}
</div>

---

The secret is:

<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
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
</math>

<br>

You can calculate the wind as normal, then multiply by some number between 0 and 1 to handle rotation.

<br>

${constrainedImage('./images/Circle_cos_sin.gif', 'Circle sin/cos animation', 'captioned-image', false)}
<span class="image-caption">Diagram: Measuring the horizontal/vertical offsets of a unit circle with sin/cos.<br><br>Note: &theta; is rotated by 90&deg; in this GIF, so the sin &amp; cos functions are swapped, but the illustration still applies.</span>

---

You might think that diagonal wind would have 50% of the horizontal effect, and 50% of the vertical effect, but this isn't the case.

Instead, it has 71% of the horizontal effect, and 71% of the vertical effect.


${constrainedImage('./images/unit-circle.png', '', 'captioned-image', false)}
<span class="image-caption">Common sin/cos values for the 16 cardinal wind directions (as percentages).<br><br>Tip: You only need to memorise one quarter of the circle to reconstruct the rest.<br><br>Remember: 0/100, 38/92, 71/71, 92/38, 100/0.</span>

<br>



---

<br>

## Examples

Let's re-use our wind units from before:

- **Horizontal unit:**&nbsp;&nbsp; ←/→ &nbsp;&nbsp;\`3\` taps per wind.
- **Vertical unit:**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +/- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\`3.5\` yards per wind.


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
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>)</mo>
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
          <mo>(</mo>
          <mi>&theta;</mi>
          <mo>)</mo>
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
                <mo>≈</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>0</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
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
                <mo>≈</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
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
                <mo>≈</mo>
                <mi>30</mi>
                <mo>&times;</mo>
                <mi>1</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
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
                <mi>0&deg;</mi>
                <mo>)</mo>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
                <mo>≈</mo>
                <mi>35</mi>
                <mo>&times;</mo>
                <mi>0</mi>
              </mtd>
            </mtr>

            <mtr>
              <mtd>
              <mo>≈</mo>
              <mi>0</mi>
              </mtd>
            </mtr>
          </mtable>
        </math>

        <br>

        -

        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mspace height="1.5em" />
        </math>
      </td>
    </tr>

  </tbody>
</table>

<br>

<div class="image-caption">
<b>Tips:</b>
<ul>
  <li>You only need to memorise one quarter circle to reconstruct the rest.</li><br>
  <li>Diagonal wind has equal horizontal and vertical effect (71% each).</li><br>
  <li>You can precompute frequently-used wind units at various angles. This reduces calculation time, but requires more memorisation.
</ul>


</div>


---

# Final Notes

- Once again, please be mindful that you only have 30 seconds.

- I hope you can internalise this information and use it to develop fast & accurate aiming systems. I know I can't...

${cautionPanel(`Please be aware that the wind effect will change as soon as you rotate your aim. Further adjustments are required to compensate for this (which aren't covered here).`)}

<br/>
<br/>
<br/>
<br/>
<br/>

---

_(Last updated: 9th June 2025)_  
<br/>
<br/>
If you have any questions, suggestions or concerns, contact **@byxor** on Discord.
`;