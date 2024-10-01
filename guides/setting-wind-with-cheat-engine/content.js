function constrainedImage(src, alt="", classes="") {
	return `<img src="${src}" alt="${alt}" onclick="this.requestFullscreen({navigationUI: 'show'})" class="constrained-image ${classes}"></img>`
}

// TODO: Alt text on all images.
// TODO: Better fullscreen UX.

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

	.interactive-wind-direction * {
		display: inline-block;
	}
	.wind-direction-container {
		box-shadow: 0 0 0 rgba(204,169,44, 0.4);
 		animation: pulse 2s infinite;
	}
	.wind-value-container {
		padding-left: 18px;
	}
	@media (pointer: coarse) {
		.wind-value-container {
			font-size: 30px;
		}
	}
	@media (pointer: coarse) {
		.content hr {
			margin-top: 25px;
			margin-bottom: 25px;
		}
		.content h2 {
			margin-top: 40px;
		}
		.content h3 {
			margin-top: 40px;
		}
	}
	@-webkit-keyframes pulse {
		0%   { -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4); }
		70%  { -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0); }
		100% { -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0); }
	}
	@keyframes pulse {
		0% {
			-moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
			box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
		}
		70% {
			-moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
			box-shadow: 0 0 0 10px rgba(204,169,44, 0);
		}
		100% {
			-moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
			box-shadow: 0 0 0 0 rgba(204,169,44, 0);
		}
	}
</style>

# Setting Wind in NTM (With Cheat Engine)

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
5. [Final Notes](#final-notes)

---

<div id="installing-cheat-engine"></div>
## 1. Installing Cheat Engine
![](./images/cheatengine-logo.png =32x32)

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

	- <img src="./images/installer-2-welcome.png" alt="Installer step 1: welcome" onclick="this.requestFullscreen()" class="constrained-image"></img>

2. **Decline all unwanted suggestions.**

	- <img src="./images/installer-3-decline-red.png" alt="Installer step 2: decline all unwanted suggestions" onclick="this.requestFullscreen()" class="constrained-image"></img>

3. **Finish.**

	- <img src="./images/installer-4-finished.png" alt="Installer step 3: finish" onclick="this.requestFullscreen()" class="constrained-image"></img>

---

<div id="opening-the-tools"></div>
## 2. Opening The Tools

- Open your emulator of choice. I'm using FBNeo for demonstration.

	- ${constrainedImage("./images/fbneo-title-screen.png", "FBNeo: NTM title screen")}

- Open Cheat Engine.

	- ${constrainedImage("./images/cheatengine-1-open.png", "Cheat Engine: startup screen")}

- Select the emulator process in Cheat Engine.

	- ${constrainedImage("./images/cheatengine-2-open-process.png", "Cheat Engine: opening a process")}

	- ${constrainedImage("./images/cheatengine-3-process-select.png", "Cheat Engine: selecting a process")}

- You're now ready to scan the game's memory.

---

<div id="finding-the-wind-in-memory"></div>
## 3. Finding The Wind In Memory

Before we can set the wind, we need to find the relevant addresses in memory.

### Finding The Strength (1 Byte)

- Before starting the scan, set the **Value Type** to **Byte**.

	- ${constrainedImage("./images/cheatengine-4-value-type-byte.png", "Cheat Engine: setting the value type to byte")}

- Begin a game.

	- ${constrainedImage("./images/fbneo-1st-shot.png", "In-Game: Taking first shot")}

	- Here we can see that the **wind has a strength of 0**.

	- Enter **0** into Cheat Engine and click **First Scan**.

	- ${constrainedImage("./images/cheatengine-5-first-scan.png", "Cheat Engine: first scan")}

	- Cheat Engine will show us all bytes that have a value of **0**.

	- ${constrainedImage("./images/cheatengine-6-first-scan-results.png", "Cheat Engine: first scan results")}

	- There are over 26 million possible addresses! We need to narrow our results with more scans.

- Continue scanning.

	- In-game, go to the next shot (to re-roll the wind).

	- ${constrainedImage("./images/fbneo-2nd-shot.png", "In-Game: Taking second shot")}

	- Here we can see that the **wind has a strength of 3**.

	- Enter **3** into Cheat Engine and click **Next Scan**.

	- ${constrainedImage("./images/cheatengine-7-second-scan.png", "Cheat Engine: second scan")}

	- ${constrainedImage("./images/cheatengine-8-second-scan-results.png", "Cheat Engine: second scan results")}

	- Now there are only 2000 possible addresses.

	- Repeat this process until there's only 1 address left.

- After a few more scans, there will only be 1 address left.

	- ${constrainedImage("./images/cheatengine-9-one-address-left.png", "Cheat Engine: one address left")}

	- Select the address and click the red arrow to add it to the address list.

	- ${constrainedImage("./images/cheatengine-10-address-added-to-list.png", "Cheat Engine: address added to list")}

	- Once the address is in the list, you can edit the description to something meaningful like *"Wind Strength"*.

	- ${constrainedImage("./images/cheatengine-11-name-wind-strength.png", "Cheat Engine: setting address description for wind strength")}

### Finding The Direction (1 Byte)

- Now that we know the memory address for the wind strength, it's easy to find the address of the wind direction.

- If you only care about 0 wind setups, you can skip this step, since direction is meaningless on 0 wind.

- The address of the wind direction will be the **address of the wind strength + 2**.

- In this case, the **wind strength** is at address **0x0ED6B028** (hexadecimal).

- Adding 2 to this address (in hexadecimal) gives us **0x0ED6B02A**, which is the address of the wind direction.

- ${constrainedImage("./images/cheatengine-12-add-address-manually.png", "Cheat Engine: add address manually")}

- Click "Add Address Manually" and enter the relevant details (address, description, type).

- ${constrainedImage("./images/cheatengine-13-add-wind-direction.png", "Cheat Engine: adding wind direction address")}

- ${constrainedImage("./images/cheatengine-14-got-both-addresses.png", "Cheat Engine: got both addresses")}

- Now you should be able to see the wind strength and direction in your address list.

- ${constrainedImage("../../assets/wind/wind-direction-11-west.png", "wind direction north +1", "wind-indicator")}
	${constrainedImage("../../assets/wind/wind-strength-3.png", "wind strength 15", "wind-indicator")}

---

<div id="setting-the-wind"></div>
## 4. Setting The Wind

### Setting Values

- Once you've found the addresses, you can double click the value in Cheat Engine to assign a new value.

	- ${constrainedImage("./images/cheatengine-15-setting-value.png", "Cheat Engine: setting values")}

### Possible Values

- The **wind strength** can be any number between **0** and **15**.
	
	- _(You can increase it up to 19 if you want a challenge, but this will never happen during regular gameplay)._

- The **wind direction** can be any number between **0** and **15**.

    - <div class="interactive-wind-direction"><div class="wind-direction-container"></div><div class="wind-value-container"></div></div>

### Locking Values

- By selecting the "Active" checkbox, you can lock a memory address to maintain a particular value.

	- ${constrainedImage("./images/cheatengine-16-locking-value.png", "Cheat Engine: locking value")}

	- Here the wind strength will be locked to **0** for every shot.

### That's it!

${constrainedImage("./images/japan-6-hole-in-one.gif", "In-Game: Hole-in-one on Japan 6 (Par 4) with Almeida")}

Have fun learning new setups!

---

<div id="final-notes"></div>

## Final Notes

- These **addresses will change** every time you open the emulator.

- If you re-open the emulator, you'll need to select the new process in Cheat Engine and **repeat the scanning process**.

- **You may see this error** when resetting the game if you have any locked values:

	- ${constrainedImage("./images/fbneo-work-ram-error-cropped.png", "In-Game: Work RAM error")}

	- **Unlock the values** in Cheat Engine **and reset** the emulator to fix this.

	- You can lock the values again afterwards.

- Someone with more experience with Cheat Engine might know a faster way of finding these addresses. Please **get in touch** if you know how.

<br/>
<br/>
<br/>
<br/>
<br/>

---

_(Last updated: 1st October 2024)_
<br/>
<br/>
If you have any questions, suggestions or concerns, contact **@byxor** on Discord.
`;