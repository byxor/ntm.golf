CONTENT = `
<style>
	@media (pointer: fine) {
		.probability-table {
			font-size: 18px;
		} 
	}

	@media (pointer: coarse) {
		.probability-table {
			font-size: 34px;
		}
	}

	.probability-table th {
		background-color: #e3e3e3;
	}

	.probability-table th, .probability-table td {
		padding: 10px;
	 	border: 1px solid black;
	}

	.probability-table .center {
		text-align: center;
	}

	.probability-table .right {
		text-align: right;
	}

	.probability-table .left {
		text-align: left;
	}

	.probability-table .holes {
		min-width: 80px;
	}

	.probability-table .maxwind {
		min-width: 100px;
	}

	.recurring {
		text-decoration: overline;
	}

	.grey {
		color: #bebebe;
	}

	.greyscale {
		filter: grayscale(60%);
	}

	.die {
		width: 18px;
		height: 18px;
	}

	.wind-indicator {
		height: 50px;
	}

	@media (pointer: fine) {
		.control-table {
			font-size: 18px;
		} 
	}

	@media (pointer: coarse) {
		.control-table {
			font-size: 34px;
		}
	}

	.control-table th {
		background-color: #e3e3e3;
	}

	.control-table th, .control-table td {
		padding: 10px;
	 	border: 1px solid black;
	}

	.control-table .center {
		text-align: center;
	}

	.control-table .right {
		text-align: right;
	}

	.control-table .left {
		text-align: left;
	}

</style>

${title("Setting Wind in NTM (With UniBIOS)")}

${successPanel(`
&nbsp;This is the latest recommended method.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i><small>(Thanks @mountainmanjed for sharing)</small></i>
`)}
${cautionPanel(`
&nbsp;An older guide can be found here:<br>
<a href="/guides/setting-wind-with-cheat-engine">Setting Wind in NTM with Cheat Engine 🐕‍🦺</a>
`)}

In Neo Turf Masters, the wind is controlled by random numbers.

On each shot, the game generates:
- The wind strength (16 possible values).
- The wind direction (16 possible values).

<div>
	${constrainedImage("../../assets/wind/wind-direction-01-north.png", "wind direction north +1", "wind-indicator greyscale", false)}
	${constrainedImage("../../assets/wind/wind-strength-15.png", "wind strength 15", "wind-indicator", false)}
</div>

The exact probabilities are as follows:

<table class="probability-table">
	<thead>
		<tr>
			<th class="right holes">Hole(s)</th>
			<th class="center maxwind">Max Wind</th>
			<th class="left">Chance of zero-wind<br/><img class="die" src="../../assets/dice/die.png" alt="6-sided die"></th>
			<th class="left">Chance of non-zero wind &amp; direction<br/><img class="die" src="../../assets/dice/die.png" alt="6-sided die"></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="right">1 &rarr; 2</td>
			<td class="center">3</td>
			<td class="left">25 &nbsp;&nbsp;&nbsp;&nbsp;%</td>
			<td class="left">1.56<span class="grey">25</span> &nbsp;&nbsp;&nbsp;&nbsp;%</td>
		</tr>
		<tr>
			<td class="right">3</td>
			<td class="center">5</td>
			<td class="left">16.<span class="recurring">6</span> &nbsp;%</td>
			<td class="left">1.04<span class="grey">1<span class="recurring">6</span></span> &nbsp;&nbsp;&nbsp;&nbsp;%</td>
		</tr>
		<tr>
			<td class="right">4</td>
			<td class="center">8</td>
			<td class="left">11.<span class="recurring">1</span> &nbsp;%</td>
			<td class="left">0.69<span class="grey"><span class="recurring">4</span></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%</td>
		</tr>
		<tr>
			<td class="right">5 &rarr; 18</td>
			<td class="center">15</td>
			<td class="left">6.25 &nbsp;%</td>
			<td class="left">0.39<span class="grey">0625</span> %</td>
		</tr>
	</tbody>
</table>

On later holes, this means you have a **~6.25% chance** of getting **zero** wind, or a **~0.39% chance** of getting the **non-zero** strength and direction you're looking for. This quickly becomes **time consuming** for learning setups.

This guide explains how to manually set the wind strength and direction on any system using UniBIOS. Unlike the cheat engine approach, this method works on real hardware.

---

1. [Applying UniBIOS](#applying-unibios)
2. [Launching the Game](#launching-the-game)
3. [Enabling Wind Control](#enabling-wind-control)
4. [Controlling the wind](#controlling-the-wind)


---

<div id="applying-unibios"></div>
## 1. Applying UniBIOS

Setup will vary depending on which emulator or hardware you're using.

### Fightcade (FBNeo) setup

1. Launch FBNeo:

    ${constrainedImage("./images/1-fightcade-1-launch-fbneo.png")}

2. Go to \`Input\` → \`Set dipswitches...\` :

    ${constrainedImage("./images/1-fightcade-2-input-dipswitches.png")}

3. Set the "BIOS" to "Universe BIOS ver. 4.0":

    ${constrainedImage("./images/1-fightcade-3-set-unibios.png")}

4. Press "OK".

### MAME setup

Launch MAME from the command-line (e.g. Terminal/Command Prompt/Powershell) with the following arguments:
\`\`\`
mame turfmast -bios unibios40
\`\`\`

You can create a shortcut for this so you don't need to type it each time.

### Other emulators/hardware

For other emulators or official hardware please refer to the emulator documentation or the <a href="http://unibios.free.fr/" target="_blank" rel="noopener">Official UniBIOS Website</a>.




<div id="launching-the-game"></div>
## 2. Launching the Game

After a reset/reboot, if UniBIOS is configured, you'll see the splash screen before the game loads:

${constrainedImage("./images/2-unibios-splash-screen.png")}
${constrainedImage("./images/2-neogeo-eye-catcher.png")}

If you don't see this splash screen, you're somehow running a different BIOS.


<div id="enabling-wind-control"></div>
## 3. Enabling Wind Control

1. Once the game loads, press "coin"+"start" at the same time to open the UniBIOS menu:

    ${constrainedImage("./images/3-1-unibios-menu.png")}

2. Go to "Debug Dip Settings" and enable DIP2 bit 2:

    ${constrainedImage("./images/3-2-unibios-debug-dips.png")}

3. Press "C" twice to exit the UniBIOS menu.

Now you're ready to control the wind.






<div id="controlling-the-wind"></div>
## 4. Controlling the Wind

You can control the wind with Player 2's inputs.


<table class="control-table">
	<thead>
		<tr>
			<th class="right">P2 Control</th>
			<th class="center">Purpose</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="center">⇧ / ⇩</td>
			<td class="center">Adjust the wind strength.</td>
		</tr>
		<tr>
			<td class="center">⇦ / ⇨</td>
			<td class="center">Adjust the wind direction.</td>
		</tr>
	</tbody>
</table>



${constrainedImage("./images/wind-control.gif")}


That's it! Have fun learning new setups!


<br/>
<br/>
<br/>
<br/>
<br/>

---

_(Last updated: 25th November 2025)_  
<br/>
<br/>
If you have any questions, suggestions or concerns, contact **@byxor** on Discord.
`;