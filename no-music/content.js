youtubeScale = 1.13;

const CONTENT = `

<style>
    .os {
      height: 2em;
      vertical-align: -0.6em;
      padding-right: 4px;
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

    .bullet-padding {
      font-size: 5px;
    }
</style>

${title("NTM No Music (ROM Hack) 💾")}

## Overview

${subtleHr()}

There's no denying Neo Turf Masters has an incredible soundtrack by an outstanding composer. Takushi Hiyamuta delivered a soundtrack that stood the test of time (and will remain standing) for decades. With that said, after thousands of games, it can occasionally be nice to enjoy a round of golf in silence or with your own background music.

This ROM Hack disables the in-game music for the the MVS/AES version of Neo Turf Masters, keeping sound effects and voice lines in-tact.

<div class="squeeze">
${markdownToHtml(`
<br>
  - [Download(s)](#download)
      - [v0.0.0 (latest)](#v0.0.0)
  - [How to Apply the Patch](#how-to-apply-the-patch)
      - [Requirements](#requirements)
      - [Instructions](#instructions)
  - [Technical Details (coming soon)](#technical-details)
  - [Special Thanks](#special-thanks)
<br>
  <!--- [Technical Details](#technical-details)
      - [How are sounds played in NTM?](#how-sound-works-in-NTM)
      - [How is music disabled?](#how-music-is-disabled)-->
<br>
`)}
</div>

### In appreciation of the soundtrack:

There's a great segment from [Pixelated Audio](https://www.youtube.com/@Pixelatedaudio) where the OST is dissected track-by-track, channel-by-channel, even featuring an interview with Hiyamuta himself. It's a very entertaining listen and does an excellent job paying homage to the composer:

<div>
<iframe width="${560/youtubeScale}" height="${315/youtubeScale}" src="https://www.youtube.com/embed/v9Sz10QvMU4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>  
<br>
<div style="font-size:5px;"><br></div>
<span class=" serif italic">"Neo Turf Masters Music with Takushi Hiyamuta – Episode 69"<br><span class="subtle">© PixelatedAudio</span></span>
</div>

<div class="bullet-padding"><br></div>

---

<br>

<div id="download"></div>
## Download(s)

<div id="v0.0.0"></div>
#### v0.0.0 (Latest):

- ${windows()} ${newTabLink("/no-music/releases/v0.0.0/NTM-no-music-v0.0.0-windows.zip", "Download (ZIP) — Windows 64-bit")}.
- ${mac()} ${    newTabLink("/no-music/releases/v0.0.0/NTM-no-music-v0.0.0-macos.zip", "Download (ZIP) — macOS (Universal)")}.
- ${linux()} ${  newTabLink("/no-music/releases/v0.0.0/NTM-no-music-v0.0.0-linux-x64.zip", "Download (ZIP) — Linux (x86_64)")}.
- ${linux()} ${  newTabLink("/no-music/releases/v0.0.0/NTM-no-music-v0.0.0-linux-arm64.zip", "Download (ZIP) — Linux (ARM64 / Raspberry Pi)")}.
- ${sourceCode()} ${newTabLink("/no-music/releases/v0.0.0/NTM-no-music-v0.0.0-source.zip", "Source Code  — Python 3 (Portable)")}.

<span class="subtle-black">If you have any trouble downloading or running the patcher, please let me know.</span>
<span class="subtle-black">I've only tested it on Windows, so it could be broken on other systems...</span>

##### Release Date:
- 28th November 2025.

##### Changes:

- Initial release.

##### Known Issues:

- Desyncs. This hack can only be played online when both players have the same ROM.
    - This happens because the hack changes CPU instructions in \`200-p1.p1\`.

        - Hopefully this can be fixed in a future release by editing the sound data in a way that doesn't change the CPU logic. I believe (though haven't confirmed) this might allow you to play online or view replays without requiring players to share the same ROM.

<div class="padding-hack">
<ul>
    <li>Buggy voice lines and sound effects play instead of music. e.g.</li>
    <ul>
        <li><span class="serif italic">"Eagle, 346 yards"</span></li>
        <li><span class="serif italic">"Birdie, 138 yards"</span></li>
        <li><span class="serif italic">"Hole in 478 yards"</span></li>
        <li><span class="italic">Oh Steve...</span></li>
        <li>(putter sound when viewing scoreboard)</li>
        <li>Hopefully this can all be fixed in a future release.</li>
    </ul>
</ul>
</div>



<br>

---

<br>

<div id="how-to-apply-the-patch"></div>

## How To Apply the Patch

<div id="requirements"></div>
#### Requires:

- 📚 A copy of the game's ROM: \`turfmast.zip\`.
<!-- - 🐍 ${newTabLink("https://www.python.org/downloads/release/python-380/", "Python 3.8+")} (installed). -->

<div id="instructions"></div>
#### Instructions:

<div class="padding-hack">
<ol>
    <li>Download & run the ROM patcher for your operating system. <div class="bullet-padding"><br></div><div class="bullet-padding"><br></div> </li>
    <li>Open <code>turfmast.zip</code>. <div class="bullet-padding"><br></div><div class="bullet-padding"><br></div> </li>
    <li>Save the new ROM to your ROMs folder. <div class="bullet-padding"><br></div> </li>
    <ul>
        <li>e.g. <span class="subtle"><code>turfmast.no-music_v0.0.0.zip</code></span>. <div class="bullet-padding"><br></div><div class="bullet-padding"><br></div> </li>
    </ul>
    <li>Replace <code>turfmast.zip</code> (in your ROMs folder) with the new ROM.</li>
</ol>

</div>

<br>

**Note:** The original ROM will be backed up to \`turfmast.backup.zip\`.

Now you can launch turfmast.zip and you'll be playing the mod.


<br>

---

<br>

<div id="technical-details"></div>

## Technical Details

${infoPanel(`&nbsp;Coming soon. Need to investigate further...
<br>
<br>
<b>TL;DR</b>:
<ul>
    <li>There's a ~32 byte sound queue at address $10ECB6.</li>
    <br>
    <li>Sounds effects, music and voice lines are pushed onto this queue before they get sent to the sound chip.</li>
    <br>
    <li>Each sound is represented by a single byte.</li>
    <br>
    <li>This hack overwrites music bytes with $FF before they get pushed onto the queue. <i>(Not the best approach, but it's better than nothing and can be improved later).</i></li>
</ul>
`)}

<br>

---

<br>


<!--
## Technical Details

This is a ROM Hack for the MVS/AES version of Neo Turf Masters.

<div id="how-pin-selection-works-in-NTM"></div>
### How does sound work in NTM?

<div class="padding-hack">
${markdownToHtml(`
In this version of the game...
- The ROM has 576 pins total.
- Every hole has 8 pins. <span class="subtle">(e.g. screenshot of USA 12 pins - by LithyV)</span>

    - ${constrainedImage("/assets/pins/U.S.A/U.S.A12detailed.png", "All default pin positions on U.S.A 12")}
<br><br>
`)}
</div>

- _During gameplay... <span class="subtle">(roughly speaking...)</span>_
    - A subset of 6 pins is available per hole
        - <span class="subtle">(Note: There are 6 possible pins on Level 8, though this may vary for other difficulty levels. Not 100% sure yet).</span>
    - This set is determined by the difficulty level.
        - <span class="subtle">NAZCA did this by design, so easier pins are granted on easier levels, and harder pins are granted on harder levels.</span>
    - When the hole loads, 1 of the 6 pins is selected at random.
    - These pins are distributed non-uniformly, meaning some pins are more likely to appear than others.<br><br>
- This is better documented in Mountainmanjed's disassembly.
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

<hr>

-->



<div id="special-thanks"></div>

## Special Thanks ⭐

- Mountainmanjed - _for teaching me how to map memory addresses to offsets in the program ROM._

<br>

---

_(Last updated: 28th November 2025)_
<br><br>

If you have any questions, suggestions or concerns, contact **@byxor** on Discord.

`;