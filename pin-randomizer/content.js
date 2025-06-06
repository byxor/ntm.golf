function subtleHr() {
  return `<p class="subtle-hr"></p>`;
}

function subtlerHr() {
  return `<p class="subtler-hr"></p>`;
}

function newTabLink(href, text) {
  return `<a href="${href}" target="_blank">${text}</a>`;
}

function os(src) {
  return `<img class="os" src="${src}"></img>`;
}

function windows() {
  return os("/assets/platforms/windows.svg");
}

function mac() {
  return os("/assets/platforms/apple.svg");
}

function linux() {
  return os("/assets/platforms/linux.svg");
}

function sourceCode() {
  return os("/assets/github/github-mark.svg")
}

const CONTENT = `
  <style>
    .note {
      /* color:rgb(190, 190, 190); */
    }

    .subtle {
      color: grey;
      font-size: 14px;
    }

    .subtle-hr {
      border-top: 1px solid rgb(230, 210, 189);
      border-bottom: 1px solid rgb(136, 136, 136, 0.2);
    }

    .subtler-hr {
      border-top: 1px solid rgb(230, 210, 189);
      border-bottom: 1px solid rgb(136, 136, 136, 0.2);
      margin-right: 15%;
    }

    .squeeze {
      margin-left: 2%;
      margin-right: 2%;
    }

    .disclaimer {
      font-size: 13px;
    }

    .padding-hack * {
      margin-top: 0px;
    }

    .os {
      height: 2em;
      vertical-align: -0.6em;
      padding-right: 4px;
    }

    h5 {
      margin-bottom: 0px;
    }

  .embla {
    overflow: hidden;
    width: 100%;
    max-width: 600px;
    margin: auto;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .embla__slide img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
    box-shadow: -10px 10px 15px rgba(0, 0, 0, 0.0) !important;
    border-radius: 7px;
  }

  .embla__dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .embla__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ccc;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .embla__dot--selected {
    background: #333;
  }

  </style>

${title("NTM Pin Randomizer (ROM Hack) 💾")}


<div class="squeeze">

<div class="embla">
  <div class="embla__container">
    <div class="embla__slide">${constrainedImage("images/demo-1.png")}</div>
    <div class="embla__slide">${constrainedImage("images/demo-2.png")}</div>
    <div class="embla__slide">${constrainedImage("images/demo-3.png")}</div>
    <div class="embla__slide">${constrainedImage("images/demo-5.png")}</div>
  </div>
</div>
<div class="embla__dots"></div>

<h2>Overview</h2>

${markdownToHtml(`

${subtleHr()}


This ROM Hack generates new pin positions for every hole in the game (MVS/AES version).

<div class="padding-hack">Useful for:
${markdownToHtml(`
- Introducing some variety to the gameplay.
- Balancing the game against excessive setups.
`)}
</div>
**Note:** The ROM only has 576 pin positions, which are all hardcoded into the course data. You'll see some repetition after a few replays, but you can regenerate the ROM with a new seed to get an entirely fresh set of pins.

`)}

${subtleHr()}

${markdownToHtml(`
**Compatible with:**

<div>
${markdownToHtml(`
- ✅ Arcade version (AES/MVS).
    - Works on Fightcade (if both players have the same ROM).
        - <span class="subtle">⚠ Spectating games or viewing replays with the original ROM will result in desyncs.</span>
`)}
</div>
- ❌ Neo Geo CD version.
    - Not compatible.
    - Scotland would be a fun challenge, so maybe I'll add this later.
`)}
<br>
${subtleHr()}

${markdownToHtml(`
**Disclaimer:**

<span class="subtle">_(At the time of writing)_</span> <span class="disclaimer">I must give some credit to StiNKz, who's currently also working on a pin randomizer, and other more ambitious ROM Hacks which I'm eager to play. <s>Unfortunately, their randomizer hasn't been released yet, so please excuse me for making one in the meantime.</s></span>

<span class="disclaimer">EDIT: StiNKz just released their first version as I was writing this!</span> 🎉 <span class="disclaimer">I recommend giving their version a try at some point too.</span>

<span class="disclaimer">Thankfully there's a lot of potential to get creative with the pin placements, so there's plenty of room for variety &amp; improvement.</span>



`)}
<br>
</div>
<hr>
<div class="squeeze">
${markdownToHtml(`

  - [Download(s)](#download)
      - [v0.0.0 (Latest)](#v0.0.0)
  - [How to Apply the Patch](#how-to-apply-the-patch)
      - [Requirements](#requirements)
      - [Instructions](#instructions)
  - [Technical Details](#technical-details)
      - [How does pin selection work in NTM?](#how-pin-selection-works-in-NTM)
      - [How are the pins randomized in this hack?](#how-the-pins-are-randomized)
  - [Special Thanks](#special-thanks)
<br>

<div id="download"></div>

<br>
`)}

</div>

---

<br>

## Download(s)

Unfortunately, for legal reasons, I can't link a copy of the ROM.

<span class="subtle">_(If you contact the right people, they'll be able to help you find a copy_ 😇_)._</span>

Once you have a copy of the game (\`turfmast.zip\`), you can apply a patch to get a modified copy of the ROM.

<span class="subtle">An advantage to patching the ROM yourself is the ability to regenerate the pin positions with different seeds. Every seed will produce a fresh new set of pins.</span>

⚠ broken links, work in progress.

${subtlerHr()}

<div id="v0.0.0"></div>
#### v0.0.0 (Latest):

- ${windows()} ${newTabLink("www.com", "Download (patcher.exe) — Windows 64-bit")}.
- ${mac()} ${newTabLink("www.com", "Download (patcher) — macOS (Universal)")}.
- ${linux()} ${newTabLink("www.com", "Download (patcher) — Linux (x86_64)")}.
- ${linux()} ${newTabLink("www.com", "Download ? — Linux (ARM64 / Raspberry Pi)")}.


- ${sourceCode()} ${newTabLink("www.com", "Source Code  — (Portable)")}.

##### Release Date:
- 5th June 2025.

##### Changes:
- First release.


<br>

<span class="subtle">If you have any trouble downloading or running the patcher, please let me know.</subtle>


---

<br>

<div id="how-to-apply-the-patch"></div>

## To Apply the Patch

<div id="requirements"></div>
#### You need:

- 📚 A copy of the original \`turfmast.zip\` ROM.
<!-- - 🐍 ${newTabLink("https://www.python.org/downloads/release/python-380/", "Python 3.8+")} (installed). -->

<div id="instructions"></div>
#### Steps:

1. Make a backup of the original \`turfmast.zip\` (so you can revert it later).<br><br>
2. Drag the original \`turfmast.zip\` onto the patcher.<br><br>
3. A new ROM will be created in the same folder.
    - e.g. <span class="subtle">\`turfmast.pin_randomizer_v0_0_0_._1749095404.zip\`</span>.
    - Note: <span class="subtle">the filename includes the version of the patcher and the seed used to generate the pins.</span><br><br>
4. Copy or move the new ROM into your ROMs folder.<br><br>
5. Replace \`turfmast.zip\` with the new ROM.

<br>
(GIF of ROM being patched)

<div id="technical-details"></div>

<br>

---

<br>

## Technical Details

This is a ROM Hack for the MVS/AES version of Neo Turf Masters.

<div id="how-pin-selection-works-in-NTM"></div>
### How does pin selection work in NTM?

<div class="padding-hack">
${markdownToHtml(`
In this version of the game...
- The ROM has 576 pins total.
- Every hole has 8 pins. <span class="subtle">(e.g. screenshot of USA 12 pins - by LithyV)</span>

    - ${constrainedImage("/assets/pins/U.S.A/U.S.A12detailed.png", "All default pin positions on U.S.A 12")}
<br><br>
`)}
</div>

- _During gameplay..._
    - A subset of 6 pins is available per hole.
    - This set is determined by the difficulty level.
        - <span class="subtle">NAZCA did this by design, so easier pins are granted on easier levels, and harder pins are granted on harder levels.</span>
    - When the hole loads, 1 of the 6 pins is selected at random.
    - These pins are distributed non-uniformly, meaning some pins are more likely to appear than others.<br><br>
- This is well documented in Mountainmanjed's disassembly.
    - See: ${newTabLink("https://github.com/mountainmanjed/BTG-Dasm/blob/462ac494c5cba2ef69ddb3fb4b2bca118a528bc9/m68k/banks/bank05.68k#L6055", githubLogo() + "&nbsp;&nbsp;mountainmanjed/BTG-dasm&nbsp;&nbsp;<code>(bank05.68k: Pin_Spawn)</code>")}.

<br>
_**Note:** <span class="note">The Neo Geo CD release has extra pin positions in its "Grand Slam" gamemode. These are unavailable on the MVS/AES release._</span>
<br><br>
<div id="how-the-pins-are-randomized"></div>
### How are the pins randomized in this hack?

This ROM Hack randomizes the pins with a very primitive algorithm.

For each hole, the patcher will...
1. Draw a rectangular boundary around the existing pin positions.
2. Expand the rectangle by a fixed amount in all directions (to allow for more pins near the outer edges of the green).
3. Randomly place all 8 pins within this boundary.

This means the pins can sometimes be positioned off the green, or on top of hazards, which may not be ideal.

**Note:** The game physics don't check for chip-ins when the ball bounces outside the green. This is an optimization by the developers to reduce unnecessary checks during normal gameplay. Unfortunately, this makes these rogue pins rather difficult to hit, as the ball must come to a stop directly on the hole to go in.

Additionally, this approach also has a high chance of placing pins on flat parts of the green. Difficulty can fluctuate wildly between each hole, which is fun, but could definitely be improved.

I intend to update/improve this algorithm in future releases.


<br>
<div id="special-thanks"></div>

---


## Special Thanks ⭐

- Mountainmanjed - _for the ${newTabLink("https://github.com/mountainmanjed/BTG-Dasm", "disassembly")}._
- StiNKz - _for teaching me how to patch Neo Geo ROMs._
- LithyV - _for the ${newTabLink("https://drive.google.com/drive/folders/1cIc8o-PyDO2J1ZwrOSWSzFLURBgv0gWZ", "pin images")} & testing the ROM on a flash cart._

<br>

---

_(Last updated: 5th June 2025)_
<br><br>

If you have any questions, suggestions or concerns, contact **@byxor** on Discord.

`;