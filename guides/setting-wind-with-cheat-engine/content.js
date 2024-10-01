function constrainedImage(src, alt="", classes="") {
	return `<img src="${src}" alt="${alt}" onclick="this.requestFullscreen()" class="constrained-image ${classes}"></img>`
}

const CONTENT = `
<style>
	@media (pointer: fine) {
		.constrained-image {
			max-width: 100%;
		}
	}
	@media (pointer: coarse) {
		.constrained-image {
			max-width: 80%;
		}
	}
	.constrained-image {
		height: auto;
		border: 1px solid grey;
		border-radius: 5px;
		box-shadow: -2px 2px #888888;
		cursor: pointer;]
	}

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

	.die {
		width: 18px;
		height: 18px;
	}

	.wind-indicator {
		height: 70px;
	}

	@media (pointer: fine) {
		.direction-table {
			font-size: 18px;
		}
	}
	@media (pointer: coarse) {
		.direction-table {
			font-size: 34px;
		}
	}
	.direction-table th {
		background-color: #e3e3e3;
	}
	.direction-table th, .direction-table td {
		padding-left: 10px;
		padding-right: 10px;
	 	border: 1px solid black;
	}
	.direction-table .center {
		text-align: center;
	}
	.direction-table .right {
		text-align: right;
	}
	.direction-table .left {
		text-align: left;
	}
	.direction-table .direction {
	}
	.direction-table .value {
	}
</style>

# Setting Wind in NTM

In Neo Turf Masters, the wind is controlled by random numbers.

On each shot, the game generates:
- The wind strength (16 possible values).
- The wind direction (16 possible values).

<div>
	${constrainedImage("../../assets/wind/wind-direction-01-north.png", "wind direction north +1", "wind-indicator")}
	${constrainedImage("../../assets/wind/wind-strength-15.png", "wind strength 15", "wind-indicator")}
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

This guide explains how to manually set the wind strength and direction on PC, for any emulator such as Fightcade FBNeo, Raine, MAME etc.

_(Requires the use of Cheat Engine)._

---

## Disclaimer

This guide is for the purpose of practice and study.
Thankfully this method of modifying memory cannot affect other players, so Fightcade is immune to these types of cheats.
If you try this online, you'll just desync, so there's no need to worry about cheaters.

---

1. [Installing Cheat Engine](#installing-cheat-engine)
2. [Opening The Tools](#opening-the-tools)
3. [Finding The Wind In Memory](#finding-the-wind-in-memory)
4. [Setting The Wind](#setting-the-wind)
5. [Additional Notes](#additional-notes)

---

<div id="installing-cheat-engine"></div>
## 1. Installing Cheat Engine
![](./cheatengine-logo.png =32x32)

Cheat Engine is an open-source tool for Windows. It lets you select a process on your machine, read its memory, and write to it.
For this reason, it is often flagged by AntiVirus tools as a potentially unsafe program, as this is the sort of thing a virus might do.

This may sound concerning, but we are in complete control of the processes we select, the memory we scan, and the values we modify.

To the best of my knowledge, Cheat Engine is not a virus, but it's still important to tread with caution. For legality's sake: I am not responsible for any effects this program has on your PC.

The source code is available on <a href="https://github.com/cheat-engine/cheat-engine" target="_blank" rel="noopener">GitHub</a> if you'd like to check it out first.

### Download

- **DO NOT download Cheat Engine from an unofficial website,** as it may include malicious changes.

- **Be careful with the installer,** don't install any extra junk it tries to suggest.

- The official website is: <a href="https://cheatengine.org/" target="_blank" rel="noopener">https://cheatengine.org/</a>.

### Installation

1. Run the installer.

	- <img src="./installer-2-welcome.png" alt="Installer step 1: welcome" onclick="this.requestFullscreen()" class="constrained-image"></img>

2. **Decline all unwanted suggestions.**

	- <img src="./installer-3-decline-red.png" alt="Installer step 2: decline all unwanted suggestions" onclick="this.requestFullscreen()" class="constrained-image"></img>

3. **Finish.**

	- <img src="./installer-4-finished.png" alt="Installer step 3: finish" onclick="this.requestFullscreen()" class="constrained-image"></img>

---

<div id="opening-the-tools"></div>
## 2. Opening The Tools

- Open your emulator of choice. I'm using FBNeo for demonstration.

	- <img class="constrained-image" src="./fbneo-title-screen.png" onclick="this.requestFullscreen()"></img>

- Open Cheat Engine.

	- <img class="constrained-image" src="./cheatengine-1-open.png" onclick="this.requestFullscreen()"></img>

- Select the emulator process in Cheat Engine.

	- ${constrainedImage("./cheatengine-2-open-process.png")}

	- ${constrainedImage("./cheatengine-3-process-select.png")}

- You're now ready to scan the game's memory.

---

<div id="finding-the-wind-in-memory"></div>
## 3. Finding The Wind In Memory

Before we can set the wind, we need to find the relevant addresses in memory.

### Finding The Strength

- Before starting the scan, set the **Value Type** to **Byte**.

	- ${constrainedImage("./cheatengine-4-value-type-byte.png")}

- Begin a game.

	- ${constrainedImage("./fbneo-1st-shot.png")}

	- Here we can see that the **wind has a strength of 0**.

	- Enter **0** into Cheat Engine and click **First Scan**.

	- ${constrainedImage("./cheatengine-5-first-scan.png")}

	- Cheat Engine will show us all bytes that have a value of **0**.

	- ${constrainedImage("./cheatengine-6-first-scan-results.png")}

	- There are over 26 million possible addresses! We need to narrow our results with more scans.

- Continue scanning.

	- In-game, go to the next shot (to re-roll the wind).

	- ${constrainedImage("./fbneo-2nd-shot.png")}

	- Here we can see that the **wind has a strength of 3**.

	- Enter **3** into Cheat Engine and click **Next Scan**.

	- ${constrainedImage("./cheatengine-7-second-scan.png")}

	- ${constrainedImage("./cheatengine-8-second-scan-results.png")}

	- Now there are only 2000 possible addresses.

	- Continue repeating this process until there's only 1 address left.

- After a few more scans, there will only be 1 address left.

	- ${constrainedImage("./cheatengine-9-one-address-left.png")}

	- Select the address and click the red arrow to add it to the address list.

	- ${constrainedImage("./cheatengine-10-address-added-to-list.png")}

	- Once the address is in the list, you can edit the description to something meaningful like *"Wind Strength"*.

	- ${constrainedImage("./cheatengine-11-name-wind-strength.png")}

### Finding The Direction

- Now that we know the memory address for the wind strength, it's easy to find the address of the wind direction.

- If you only care about 0 wind setups, you can skip this step.

- The address of the wind direction will be the **address of the wind strength + 2**.

- In this case, the **wind strength** is at address **0x0ED6B028** (hexadecimal).

- Adding 2 to this address (in hexadecimal) gives us **0x0ED6B02A**, which is the address of the wind direction.

- ${constrainedImage("./cheatengine-12-add-address-manually.png")}

- Click "Add Address Manually" and enter the relevant details (address, description, type).

- ${constrainedImage("./cheatengine-13-add-wind-direction.png")}

- ${constrainedImage("./cheatengine-14-got-both-addresses.png")}

- Now you should be able to see the wind strength and direction in your address list.

### Note

- These **addresses will change** every time you open the emulator.

- If you re-open the emulator, you'll need to re-open the process in Cheat Engine and repeat the scanning process.

- Someone with more experience with Cheat Engine might know a faster way of finding these addresses. Please get in touch if you know how.

---

<div id="setting-the-wind"></div>
## 4. Setting The Wind

- Now that you've got the addresses, you can double click the value in Cheat Engine to assign a new value.

	- (screenshot of setting new value)

- The **wind strength** can be any number between **0** and **15**.
	
	- _(You can increase it up to 19 if you want a challenge, but this will never happen during regular gameplay)._

- The **wind direction** can be any number between **0** and **15**.

    - TODO: turn this table into a more compact image?

	- <table class="direction-table">
		<thead>
			<tr>
				<th>Direction</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-00-north.png", "wind direction north", "wind-indicator")}</td>
				<td>0</td>
	  		</tr>
			<tr>
			    <td>${constrainedImage("../../assets/wind/wind-direction-01-north.png", "wind direction north+1", "wind-indicator")}</td>
			    <td>1</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-02-northeast.png", "wind direction northeast", "wind-indicator")}</td>
				<td>2</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-03-east.png", "wind direction northeast+1", "wind-indicator")}</td>
				<td>3</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-04-east.png", "wind direction east", "wind-indicator")}</td>
				<td>4</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-05-east.png", "wind direction east+1", "wind-indicator")}</td>
				<td>5</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-06-southeast.png", "wind direction southeast", "wind-indicator")}</td>
				<td>6</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-07-south.png", "wind direction southeast+1", "wind-indicator")}</td>
				<td>7</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-08-south.png", "wind direction south", "wind-indicator")}</td>
				<td>8</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-09-south.png", "wind direction south+1", "wind-indicator")}</td>
				<td>9</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-10-southwest.png", "wind direction southwest", "wind-indicator")}</td>
				<td>10</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-11-west.png", "wind direction southwest+1", "wind-indicator")}</td>
				<td>11</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-12-west.png", "wind direction west", "wind-indicator")}</td>
				<td>12</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-13-west.png", "wind direction west+1", "wind-indicator")}</td>
				<td>13</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-14-northwest.png", "wind direction northwest", "wind-indicator")}</td>
				<td>14</td>
			</tr>
			<tr>
				<td>${constrainedImage("../../assets/wind/wind-direction-15-north.png", "wind direction northwest+1", "wind-indicator")}</td>
				<td>15</td>
			</tr>
		</tbody>
	</table>
















(explanation of max wind being 19)

(direction table)

(how to lock the values)

---

<div id="additional-notes"></div>

## Additional Notes

<working ram error etc>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

---

_(Last updated: 30th September 2024)_
<br/>
<br/>
If you have any questions, suggestions or concerns, contact **@byxor** on Discord.
`;