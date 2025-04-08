/*

// Data recorded from the tee on Germany 1.
// Ball was bouncing on the fairway.
// Wind direction: North (not that it matters, it just means the ball always lands on the fairway, and the ball direction is unaffected)

function windOffsetData(
    club,
    power,
    height,
    distanceAt0Wind,
    distanceAt19Wind
) {
    
    // This correlates with airtime, but as a weird unit.
    const offsetAt19Wind = distanceAt19Wind - distanceAt0Wind;

    // If I calculate the number of frames for a particularly high offset then
    // I might be able to translate all offsetsAt19 into frame counts (if that's useful).

    return {
        from: TEE_SURFACE,
        club,
        power,
        height,
        offsetAt19Wind
    }
}


const WIND_OFFSET_DATA = (() => {
    const _ = windOffsetData;

    return [
        _(CLUB_280Y, "max%", "NT-2", 323, 353),
        _(CLUB_280Y, "max%", "NT-1", 323, 355),
        _(CLUB_280Y, "max%", "NT", 323, 356),
        _(CLUB_280Y, "max%", "N-2", 323, 357),
        _(CLUB_280Y, "max%", "N-1", 322, 357),
        _(CLUB_280Y, "max%", "N", 322, 357),
        _(CLUB_280Y, "max%", "N+1", 317, 353),
        _(CLUB_280Y, "max%", "N+2", 319, 356),
        _(CLUB_280Y, "max%", "NB", 318, 356),
        _(CLUB_280Y, "max%", "NS", 320, 359),
        _(CLUB_280Y, "max%", "NS+1", 318, 358),

        _(CLUB_280Y, "max-1%", "NT-2", 298, 321),
        _(CLUB_280Y, "max-1%", "NT-1", 302, 328),
        _(CLUB_280Y, "max-1%", "NT", 299, 326),
        _(CLUB_280Y, "max-1%", "N-2", 304, 333),
        _(CLUB_280Y, "max-1%", "N-1", 299, 328),
        _(CLUB_280Y, "max-1%", "N", 303, 334),
        _(CLUB_280Y, "max-1%", "N+1", 296, 326),
        _(CLUB_280Y, "max-1%", "N+2", 298, 330),
        _(CLUB_280Y, "max-1%", "NB", 297, 329),
        _(CLUB_280Y, "max-1%", "NS", 299, 334),
        _(CLUB_280Y, "max-1%", "NS+1", 296, 330),

        _(CLUB_280Y, "max-2%", "NT-2", 297, 320),
        _(CLUB_280Y, "max-2%", "NT-1", 298, 323),
        _(CLUB_280Y, "max-2%", "NT", 296, 322),
        _(CLUB_280Y, "max-2%", "N-2", 299, 327),
        _(CLUB_280Y, "max-2%", "N-1", 299, 328),
        _(CLUB_280Y, "max-2%", "N", 299, 329),
        _(CLUB_280Y, "max-2%", "N+1", 296, 326),
        _(CLUB_280Y, "max-2%", "N+2", 299, 330),
        _(CLUB_280Y, "max-2%", "NB", 294, 325),
        _(CLUB_280Y, "max-2%", "NS", 296, 329),
        _(CLUB_280Y, "max-2%", "NS+1", 295, 329),

        _(CLUB_280Y, "max-3%", "NT-2", 295, 318),
        _(CLUB_280Y, "max-3%", "NT-1", 297, 322),
        _(CLUB_280Y, "max-3%", "NT", 294, 319),
        _(CLUB_280Y, "max-3%", "N-2", 296, 323),
        _(CLUB_280Y, "max-3%", "N-1", 295, 322),
        _(CLUB_280Y, "max-3%", "N", 297, 326),
        _(CLUB_280Y, "max-3%", "N+1", 294, 323),
        _(CLUB_280Y, "max-3%", "N+2", 296, 327),
        _(CLUB_280Y, "max-3%", "NB", 292, 322),
        _(CLUB_280Y, "max-3%", "NS", 294, 326),
        _(CLUB_280Y, "max-3%", "NS+1", 292, 325),

        _(CLUB_280Y, "105%", "NT-2", , ),
        _(CLUB_280Y, "105%", "NT-1", , ),
        _(CLUB_280Y, "105%", "NT", , ),
        _(CLUB_280Y, "105%", "N-2", , ),
        _(CLUB_280Y, "105%", "N-1", , ),
        _(CLUB_280Y, "105%", "N", , ),
        _(CLUB_280Y, "105%", "N+1", , ),
        _(CLUB_280Y, "105%", "N+2", , ),
        _(CLUB_280Y, "105%", "NB", , ),
        _(CLUB_280Y, "105%", "NS", , ),
        _(CLUB_280Y, "105%", "NS+1", , ),

        _(CLUB_280Y, "104%", "NT-2", , ),
        _(CLUB_280Y, "104%", "NT-1", , ),
        _(CLUB_280Y, "104%", "NT", , ),
        _(CLUB_280Y, "104%", "N-2", , ),
        _(CLUB_280Y, "104%", "N-1", , ),
        _(CLUB_280Y, "104%", "N", , ),
        _(CLUB_280Y, "104%", "N+1", , ),
        _(CLUB_280Y, "104%", "N+2", , ),
        _(CLUB_280Y, "104%", "NB", , ),
        _(CLUB_280Y, "104%", "NS", , ),
        _(CLUB_280Y, "104%", "NS+1", , ),

        _(CLUB_280Y, "103%", "NT-2", , ),
        _(CLUB_280Y, "103%", "NT-1", , ),
        _(CLUB_280Y, "103%", "NT", , ),
        _(CLUB_280Y, "103%", "N-2", , ),
        _(CLUB_280Y, "103%", "N-1", , ),
        _(CLUB_280Y, "103%", "N", , ),
        _(CLUB_280Y, "103%", "N+1", , ),
        _(CLUB_280Y, "103%", "N+2", , ),
        _(CLUB_280Y, "103%", "NB", , ),
        _(CLUB_280Y, "103%", "NS", , ),
        _(CLUB_280Y, "103%", "NS+1", , ),

        _(CLUB_280Y, "102%", "NT-2", , ),
        _(CLUB_280Y, "102%", "NT-1", , ),
        _(CLUB_280Y, "102%", "NT", , ),
        _(CLUB_280Y, "102%", "N-2", , ),
        _(CLUB_280Y, "102%", "N-1", , ),
        _(CLUB_280Y, "102%", "N", , ),
        _(CLUB_280Y, "102%", "N+1", , ),
        _(CLUB_280Y, "102%", "N+2", , ),
        _(CLUB_280Y, "102%", "NB", , ),
        _(CLUB_280Y, "102%", "NS", , ),
        _(CLUB_280Y, "102%", "NS+1", , ),

        _(CLUB_280Y, "101%", "NT-2", , ),
        _(CLUB_280Y, "101%", "NT-1", , ),
        _(CLUB_280Y, "101%", "NT", , ),
        _(CLUB_280Y, "101%", "N-2", , ),
        _(CLUB_280Y, "101%", "N-1", , ),
        _(CLUB_280Y, "101%", "N", , ),
        _(CLUB_280Y, "101%", "N+1", , ),
        _(CLUB_280Y, "101%", "N+2", , ),
        _(CLUB_280Y, "101%", "NB", , ),
        _(CLUB_280Y, "101%", "NS", , ),
        _(CLUB_280Y, "101%", "NS+1", , ),

        _(CLUB_280Y, "100%", "NT-2", , ),
        _(CLUB_280Y, "100%", "NT-1", , ),
        _(CLUB_280Y, "100%", "NT", , ),
        _(CLUB_280Y, "100%", "N-2", , ),
        _(CLUB_280Y, "100%", "N-1", , ),
        _(CLUB_280Y, "100%", "N", , ),
        _(CLUB_280Y, "100%", "N+1", , ),
        _(CLUB_280Y, "100%", "N+2", , ),
        _(CLUB_280Y, "100%", "NB", , ),
        _(CLUB_280Y, "100%", "NS", , ),
        _(CLUB_280Y, "100%", "NS+1", , ),

        _(CLUB_280Y, "99%", "NT-2", , ),
        _(CLUB_280Y, "99%", "NT-1", , ),
        _(CLUB_280Y, "99%", "NT", , ),
        _(CLUB_280Y, "99%", "N-2", , ),
        _(CLUB_280Y, "99%", "N-1", , ),
        _(CLUB_280Y, "99%", "N", , ),
        _(CLUB_280Y, "99%", "N+1", , ),
        _(CLUB_280Y, "99%", "N+2", , ),
        _(CLUB_280Y, "99%", "NB", , ),
        _(CLUB_280Y, "99%", "NS", , ),
        _(CLUB_280Y, "99%", "NS+1", , ),




        
        _(CLUB_260Y, "max%", "NT-2", , ),
        _(CLUB_260Y, "max%", "NT-1", , ),
        _(CLUB_260Y, "max%", "NT", , ),
        _(CLUB_260Y, "max%", "N-2", , ),
        _(CLUB_260Y, "max%", "N-1", , ),
        _(CLUB_260Y, "max%", "N", , ),
        _(CLUB_260Y, "max%", "N+1", , ),
        _(CLUB_260Y, "max%", "N+2", , ),
        _(CLUB_260Y, "max%", "NB", , ),
        _(CLUB_260Y, "max%", "NS", , ),
        _(CLUB_260Y, "max%", "NS+1", , ),

        _(CLUB_250Y, "max%", "NT-2", , ),
        _(CLUB_250Y, "max%", "NT-1", , ),
        _(CLUB_250Y, "max%", "NT", , ),
        _(CLUB_250Y, "max%", "N-2", , ),
        _(CLUB_250Y, "max%", "N-1", , ),
        _(CLUB_250Y, "max%", "N", , ),
        _(CLUB_250Y, "max%", "N+1", , ),
        _(CLUB_250Y, "max%", "N+2", , ),
        _(CLUB_250Y, "max%", "NB", , ),
        _(CLUB_250Y, "max%", "NS", , ),
        _(CLUB_250Y, "max%", "NS+1", , ),

        _(CLUB_240Y, "max%", "NT-2", , ),
        _(CLUB_240Y, "max%", "NT-1", , ),
        _(CLUB_240Y, "max%", "NT", , ),
        _(CLUB_240Y, "max%", "N-2", , ),
        _(CLUB_240Y, "max%", "N-1", , ),
        _(CLUB_240Y, "max%", "N", , ),
        _(CLUB_240Y, "max%", "N+1", , ),
        _(CLUB_240Y, "max%", "N+2", , ),
        _(CLUB_240Y, "max%", "NB", , ),
        _(CLUB_240Y, "max%", "NS", , ),
        _(CLUB_240Y, "max%", "NS+1", , ),
    ];
})()


// Ignoring hills for simplicity.
function getWindOffsetInYards(club, power, height, windStrength) {

}



windAnalysis()

*/

// ^^^^^^^^ OLD APPROACH

// ------------------------------------------------------

// vvvvvvvv NEW APPROACH

/*




tags (to filter by):
 "ideal" (ideal shot - whatever height stops on the spot or works the best)

 "uphill"
 "downhill"

*/

// maybe just allow auto-filter by shot height
// e.g. >NS || <=L+1


const SHOT_OPTIONS_BY_DISTANCE = (() => {
    const shotOptions = [];

    const _ = (distance, surface, wind, stance, flagOffset, club, powerAndHeight, spin, notes) => {
        const [powerText, heightText] = powerAndHeight.split(" ");
        
        const target = new Target(distance, surface, wind);
        
        const gotNote = (note) => {
            const index = notes.indexOf(note);
            const gotIt = index >= 0;
            if (gotIt) {
                notes.splice(index, 1);
            }
            return gotIt;
        };

        const bounce = (() => {
            if (gotNote("1st bounce")) {
                return 1;
            } else if (gotNote("2nd bounce")) {
                return 2;
            } else if (gotNote("3rd bounce")) {
                return 3;
            } else if (gotNote("4th bounce")) {
                return 4;
            } else if (gotNote("5th bounce")) {
                return 5;
            } else if (gotNote("rolls in")) {
                return -1;
            }
        })();

        const trees = 0;
        const consistent = gotNote("ideal");
        const subpixel = undefined;
        spin = spin === '' ? undefined : spin;

        const power = (() => {
            const value = powerText.substring(0, powerText.length - 1);
            const direction = powerText.substring(powerText.length - 1, powerText.length) == "^" ? "up" : "down";
            return newPower(value, direction);
        })();

        const height = (() => {
            const value = heightText.substring(0, heightText.length - 1);
            const direction = heightText.substring(heightText.length - 1, heightText.length) == "^" ? "up" : "down";
            return newHeight(value, direction, club);
        })();

        const setup = new Setup(
            -1,
            wind,
            new FlagReference(flagOffset),
            subpixel,
            surface,
            stance,
            club,
            power,
            height,
            spin, 
            new SuccessfulShot(bounce, trees, consistent, notes),
        );

        const shotOption = new ShotOption(target, setup);
        shotOptions.push(shotOption);

        // Flip the shot horizontally and add it if possible
        if ((wind.strength !== 0) && (wind.direction !== "N") && (wind.direction !== "S")) {
            const target = new Target(distance, surface, wind.horizontallyFlipped());
            
            // Same as the other target and setup, but flipped horizontally
            const setup = new Setup(
                -1,
                wind.horizontallyFlipped(),
                new FlagReference(0-flagOffset),
                subpixel,
                surface,
                stance,
                club,
                power,
                height,
                spin, 
                new SuccessfulShot(bounce, trees, consistent, notes),
            );

            const oppositeShotOption = new ShotOption(target, setup);
            shotOptions.push(oppositeShotOption);
        }
    };

    const wind = newWind;

    const ZERO_WIND = wind(0, "N");
    
    const FAIRWAY = FAIRWAY_SURFACE;
    const ROUGH = ROUGH_SURFACE;    

    const DS = DEFAULT_STANCE;
    const H1 = STANCE_1x_HOOK;
    const H2 = STANCE_2x_HOOK;
    const H3 = STANCE_3x_HOOK;
    const S1 = STANCE_1x_SLICE;
    const S2 = STANCE_2x_SLICE;
    const S3 = STANCE_3x_SLICE;

    const NS = "";
    const TS = TOPSPIN;
    const BS = BACKSPIN;

    const C_120 = CLUB_120Y;
    const C_140 = CLUB_140Y;
    const C_160 = CLUB_160Y;

    // ----------------------------------------------------------------------------------

    // short game rough chips

    // ...

    _(7, ROUGH, ZERO_WIND, DS, 0, C_120, "1.4v N-2v", NS, ["1st bounce", "Rolls 16y past flag if miss.", "Chance of tinking flag to rough."]);
    _(7, ROUGH, ZERO_WIND, DS, 0, C_120, "1.3v Nv", NS, ["1st bounce", "Rolls 14y past flag if miss.", "ideal", "Feels quite consistent from savestate.", "Chance of tinking flag to rough."]);


    _(8, ROUGH, ZERO_WIND, DS, 0, C_120, "1.3^ H-3v", NS, ["1st bounce", "Rolls 11y past flag if miss.", "ideal", "Chance of tinking flag to rough.", "Feels quite consistent from savestate."]);
    _(8, ROUGH, ZERO_WIND, DS, 0, C_120, "1.4^ N-2v", NS, ["1st bounce", "Rolls 15y past flag if miss.", "Chance of tinking flag to rough.", "Feels quite consistent from savestate."]);
    _(8, ROUGH, ZERO_WIND, DS, 0, C_120, "2.1^ L+2^", NS, ["1st bounce", "Rolls 17y past flag if miss.", "Chance of tinking flag to rough.", "Feels quite consistent from savestate.", "Risky height."]);


    _(9, ROUGH, ZERO_WIND, DS, 0, C_120, "1.3^ H-3v", NS, ["1st bounce", "Rolls 10y past flag if miss."]);
    _(9, ROUGH, ZERO_WIND, DS, 0, C_120, "2.0^ Nv", NS, ["1st bounce", "Rolls 15y past flag if miss.", "ideal", "Chance of tinking flag to rough. Sometimes sticks.", "N-1v also works.", "Feels quite consistent from savestate."]);
    _(9, ROUGH, ZERO_WIND, DS, 0, C_120, "2.1^ L+3^", NS, ["1st bounce", "Rolls 16y past flag if miss.", "ideal", "Often sticks to flag."]);


    _(10, ROUGH, ZERO_WIND, DS, 0, C_120, "2.4v L+2^", NS, ["1st bounce", "Rolls 18y past flag if miss.", "Often sticks to flag. Sometimes tinks to rough.", "Risky height."]);
    _(10, ROUGH, ZERO_WIND, DS, 0, C_120, "2.3v NT-1^", NS, ["1st bounce", "Rolls 16y past flag if miss.", "ideal", "Often sticks to flag."]);
    _(10, ROUGH, ZERO_WIND, DS, 0, C_120, "2.2v N-1^", NS, ["1st bounce", "Rolls 13y past flag if miss.", "Chance of tinking flag to rough. Sometimes sticks."]);

    _(11, ROUGH, ZERO_WIND, DS, 0, C_120, "2.4v NT^", NS, ["1st bounce", "Rolls ?y past flag if miss.", "Feels quite consistent from savestate."]);
    _(11, ROUGH, ZERO_WIND, DS, 0, C_120, "2.3v N+1v", NS, ["1st bounce", "Rolls ?y past flag if miss."]);
    _(11, ROUGH, ZERO_WIND, DS, 0, C_120, "2.2v NS+1v", NS, ["1st bounce", "Rolls ?y past flag if miss."]);
    _(11, ROUGH, ZERO_WIND, DS, 0, C_120, "2.0v H-2v", NS, ["2nd bounce", "Rolls ?y past flag if miss.", "Risky height.", "Usually falls a bit short."]);












    _(17, ROUGH, ZERO_WIND, DS, 0, C_120, "3.4v Nv", NS, ["1st bounce", "Rolls 14y past flag if miss."]);
    _(17, ROUGH, ZERO_WIND, DS, 0, C_120, "3.3v Nv", NS, ["1st bounce", "ideal", "Rolls 14y past flag if miss.", "Nv height seems quite consistent/forgiving."]);
    _(17, ROUGH, ZERO_WIND, DS, 0, C_120, "3.2v NSv", NS, ["1st bounce", "ideal", "Rolls 13y past flag if miss."]);
    _(17, ROUGH, ZERO_WIND, DS, 0, C_120, "3.0v NS+1v", NS, ["2nd bounce", "Rolls 10y past flag if miss."]);

    _(18, ROUGH, ZERO_WIND, DS, 0, C_120, "3.4v N+2^", NS, ["1st bounce", "Rolls 14y past flag if miss.", "Feels quite consistent."]);
    _(18, ROUGH, ZERO_WIND, DS, 0, C_120, "3.3v N+2^", NS, ["1st bounce", "ideal", "Rolls 14y past flag if miss.", "Feels quite consistent."]);
    _(18, ROUGH, ZERO_WIND, DS, 0, C_120, "3.2v N-2^", NS, ["2nd bounce", "ideal", "Rolls 11y past flag if miss.", "Feels quite consistent."]);
    _(18, ROUGH, ZERO_WIND, DS, 0, C_120, "3.0v H-2v", NS, ["2nd bounce", "Rolls 10y past flag if miss.", "Usually tinks flag from savestate.", "Risky height."]);


    // ----------------------------------------------------------------------------------

    // short game heavy rough chips

    // ...


    // ----------------------------------------------------------------------------------

    // short game heavy bunker chips

    // ...



    // ----------------------------------------------------------------------------------

    // short game fairway chips

    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "3.2v N^", BS, ["1st bounce", "Rolls 11y past flag if miss."]);
    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "3.0v NBv", BS, ["2nd bounce", "Rolls 7y past flag if miss."]);
    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "2.4v H-2v", BS, ["2nd bounce", "Rolls 9y past flag if miss.", "Can't hit it from the savestate but looks close."]);

    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "1.5v H-1v", BS, ["rolls in"]);
    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "1.2v Hv", TS, ["rolls in"]);
    _(22, FAIRWAY, ZERO_WIND, DS, 0, C_120, "1.1v Hv", TS, ["rolls in"]);
    

    // ----------------------------------------------------------------------------------



    _(110, FAIRWAY, ZERO_WIND, DS, 0, C_120, "97%^ NT-2^", NS, ["4th bounce", "ideal", "Rolls 2y past flag if miss."]);
    _(110, FAIRWAY, ZERO_WIND, DS, 0, C_120, "101%^ H-1v", BS, ["5th bounce", "ideal", "Goes 3y past flag and bounces back.", "Rolls back 7y if miss."]);    



    _(110, FAIRWAY, wind(1, "N"), DS, 0, C_120, "99%^ L+2^", BS, ["3rd bounce", "ideal"]);
    _(110, FAIRWAY, wind(1, "N"), DS, 0, C_120, "101%^ N+2^", BS, ["1st bounce", "Goes 6y past flag and rolls back in.", "Risk of tinking flag at high speed."]);

    _(110, FAIRWAY, wind(1, "NW+1"), DS, -1, C_120, "99%^ L+2^", BS, ["3rd bounce", "ideal", "Sometimes 4th bounce."]);

    _(110, FAIRWAY, wind(1, "NW"), DS, -3, C_120, "99%^ L+3^", BS, ["3rd bounce", "ideal", "Sometimes 4th bounce."]);

    _(110, FAIRWAY, wind(1, "W+1"), DS, -3, C_120, "99%^ L+3^", BS, ["3rd bounce", "ideal", "Barely reaches."]);

    _(110, FAIRWAY, wind(1, "W"), DS, -5, C_120, "101%^ H-1v", BS, ["5th bounce", "Goes 3y past flag and bounces back.", "Rolls back 7y if miss."]);

    _(110, FAIRWAY, wind(1, "SW+1"), DS, -3, C_120, "97%^ L+2^", NS, ["4th bounce", "ideal"]);

    _(110, FAIRWAY, wind(1, "SW"), DS, -3, C_120, "99%^ NBv", NS, ["2nd bounce"]);

    _(110, FAIRWAY, wind(1, "S+1"), DS, -2, C_120, "99%^ L+2^", NS, ["3rd bounce"]);

    _(110, FAIRWAY, wind(1, "S"), DS, 0, C_120, "99%^ L+2^", NS, ["3rd bounce"]);     

    // ----------------------------------------------------------------------------------


    _(120, FAIRWAY, ZERO_WIND, DS, 0, C_120, "101%^ H-1v", NS, ["3rd bounce", "ideal"]);
    _(120, FAIRWAY, ZERO_WIND, DS, 0, C_120, "99%^ NSv", TS, ["4th bounce", "Carries 103y"]);
    _(120, FAIRWAY, ZERO_WIND, DS, 0, C_120, "102%^ L^", NS, ["4th bounce"]);

    _(120, FAIRWAY, ZERO_WIND, H1, -19, C_120, "102%^ H-2v", NS, ["3rd bounce"]);
    _(120, FAIRWAY, ZERO_WIND, H2, -39, C_120, "103%^ H-2v", NS, ["4th bounce"]);


    _(120, FAIRWAY, wind(1, "N"), DS, 0, C_120, "104%^ L+1^", BS, ["3rd bounce", "ideal"]);
    _(120, FAIRWAY, wind(1, "N"), DS, 0, C_120, "105%^ L^", BS, ["3rd bounce", "ideal"]);
    _(120, FAIRWAY, wind(1, "N"), DS, 0, C_120, "max-3%^ Hv", BS, ["2nd bounce", "Rolls back 2-~8y when missed."]);

    _(120, FAIRWAY, wind(1, "NW+1"), DS, -1, C_120, "105%^ L^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "NW"), DS, -3, C_120, "max-3%^ L^", BS, ["2nd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "W+1"), DS, -4, C_120, "max-3%^ L+3^", BS, ["2nd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "W"), DS, -4, C_120, "max-3%^ L+3^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "SW+1"), DS, -4, C_120, "max-2%^ L+3^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "SW"), DS, -4, C_120, "103%^ H-2v", NS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "S+1"), DS, -3, C_120, "103%^ NBv", NS, ["4th bounce", "ideal"]);

    _(120, FAIRWAY, wind(1, "S"), DS, 0, C_120, "104%^ H-1v", NS, ["4th bounce", "ideal"]);



    _(120, FAIRWAY, wind(2, "N"), DS, 0, C_120, "102%^ L+3^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "NW+1"), DS, -3, C_120, "102%^ NT-1^", BS, ["2nd bounce", "ideal"]);
    _(120, FAIRWAY, wind(2, "NW+1"), DS, -3, C_120, "103%^ NT^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "NW"), DS, -5, C_120, "104%^ NT^", BS, ["2nd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "W+1"), DS, -8, C_120, "max-3%^ NT^", BS, ["2nd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "W"), DS, -9, C_120, "max-2%^ NT^", BS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "SW+1"), DS, -10, C_120, "104%^ H-1v", NS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "SW"), DS, -6, C_120, "max-3%^ H-2v", NS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "S+1"), DS, -4, C_120, "max-2%^ H-3v", NS, ["4th bounce", "ideal"]);

    _(120, FAIRWAY, wind(2, "S"), DS, 0, C_120, "max-1%^ H-2v", NS, ["4th bounce", "ideal"]);
    _(120, FAIRWAY, wind(2, "S"), DS, 0, C_120, "max% N-2v", BS, ["5th bounce", "ideal", "Goes 3y past flag and bounces back."]);



    // _(120, FAIRWAY, wind(3, "N"), H3, -54, C_120, "99%^ H-3v", NS, ["rolls in", "ideal"]);	
    _(120, FAIRWAY, wind(3, "N"), DS, 0, C_120, "97%^ H-1v", NS, ["4th bounce", "ideal"]);

    _(120, FAIRWAY, wind(3, "N+1"), DS, 6, C_120, "97%^ NSv", NS, ["rolls in", "ideal"]);
    // _(120, FAIRWAY, wind(3, "N+1"), H2, -35, C_120, "99%^ NSv", NS, ["4th bounce", "ideal"]);

    // _(120, FAIRWAY, wind(3, "NE"), S1, 30, C_120, "99%^ NSv", NS, ["3rd bounce", "ideal"]);
    _(120, FAIRWAY, wind(3, "NE"), DS, 10, C_120, "99%^ NSv", NS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(3, "NE+1"), DS, 14, C_120, "104%^ N+1v", BS, ["3rd bounce", "ideal", "Sometimes 4th bounce."]);

    _(120, FAIRWAY, wind(3, "E"), DS, 17, C_120, "101%^ H-2v", NS, ["4th bounce", "ideal"]);

    _(120, FAIRWAY, wind(3, "E+1"), DS, 11, C_120, "max% L+1^", BS, ["1st bounce", "Goes 6y past flag if misses, then rolls back until 1y left."]);

    _(120, FAIRWAY, wind(3, "SE"), DS, 10, C_120, "max-3%^ N-1^", NS, ["4th bounce", "ideal"]);
    _(120, FAIRWAY, wind(3, "SE"), DS, 10, C_120, "max-2%^ N-1^", NS, ["3rd bounce", "ideal"]);

    _(120, FAIRWAY, wind(3, "SE+1"), DS, 6, C_120, "max% N^", BS, ["2nd bounce", "Rolls back 10y if miss"]);

    _(120, FAIRWAY, wind(3, "S"), DS, 0, C_120, "max% H-1v", NS, ["2nd bounce", "ideal"]);


    // ----------------------------------------------------------------------------------


    _(130, FAIRWAY, ZERO_WIND, H3, -43, C_120, "max% NS+1v", BS, ["rolls in", "Funky curvature. Rolls in diagonally from bottom left.", "Meme."]);


    _(130, FAIRWAY, wind(1, "N"), DS, 0, C_120, "max% N^", BS, ["2nd bounce", "ideal"]);
    
    _(130, FAIRWAY, wind(1, "NW+1"), DS, -2, C_120, "max% N^", BS, ["4th bounce", "ideal", "Goes 1y past flag and bounces in.", "Might roll back ~6y if miss."]);

    _(130, FAIRWAY, wind(1, "NW"), DS, -3, C_120, "max% L+1^", BS, ["2nd bounce", "ideal"]);

    _(130, FAIRWAY, wind(1, "W+1"), DS, -4, C_120, "max% L+1^", BS, ["3rd bounce", "ideal"]);

    _(130, FAIRWAY, wind(1, "W"), DS, -6, C_120, "max% H-3v", NS, ["2nd bounce", "ideal"]);

    _(130, FAIRWAY, wind(1, "SW+1"), DS, -4, C_120, "max% N^", NS, ["2nd bounce", "Rolls 3y past flag if miss."]);

    _(130, FAIRWAY, wind(1, "SW"), DS, -4, C_120, "max%, H-2v", NS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(1, "S+1"), DS, -2, C_120, "max%, H-3v", NS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(1, "S"), DS, 0, C_120, "max% NS+1v", NS, ["4th bounce", "ideal"]); 



    _(130, FAIRWAY, wind(2, "N"), DS, 0, C_120, "max% H-2v", BS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(2, "N+1"), DS, 5, C_120, "max% H-3v", BS, ["5th bounce", "ideal", "Goes 2y past flag and bounces in.", "Rolls back 7y if miss."]);

    _(130, FAIRWAY, wind(2, "NE"), DS, 8, C_120, "max% NSv", BS, ["4th bounce", "ideal"]);   

    _(130, FAIRWAY, wind(2, "NE+1"), DS, 8, C_120, "max% L+3^", BS, ["2nd bounce", "ideal", "Rolls back 6y if miss."]);

    _(130, FAIRWAY, wind(2, "E"), DS, 13, C_120, "max% H-3v", NS, ["2nd bounce", "Goes 3y past flag if miss."]);
    _(130, FAIRWAY, wind(2, "E"), DS, 13, C_120, "max-1%^ NS+1v", TS, ["4th bounce", "Goes 3y past flag if miss."]);

    _(130, FAIRWAY, wind(2, "E+1"), DS, 12, C_120, "max% H-3v", NS, ["3rd bounce", "ideal"]);

    _(130, FAIRWAY, wind(2, "SE"), DS, 8, C_120, "max% N-1^", NS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(2, "SE+1"), DS, 5, C_120, "max% L+3^", NS, ["5th bounce", "ideal"]);

    _(130, FAIRWAY, wind(2, "S"), DS, 0, C_120, "max% L^", NS, ["4th bounce", "ideal"]);



    _(130, FAIRWAY, wind(3, "N"), DS, 0, C_120, "102%^ NSv", NS, ["4th bounce", "ideal"]);
    _(130, FAIRWAY, wind(3, "N"), DS, 0, C_120, "103%^ NS+1v", NS, ["4th bounce", "ideal"]);
    _(130, FAIRWAY, wind(3, "N"), DS, 0, C_120, "104%^ H-3v", NS, ["3rd bounce"]);

    _(130, FAIRWAY, wind(3, "N+1"), DS, 7, C_120, "102%^ H-2v", NS, ["5th bounce", "ideal"]);
    _(130, FAIRWAY, wind(3, "N+1"), DS, 7, C_120, "103%^ H-1v", NS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(3, "NE"), DS, 13, C_120, "105%^ H-3v", NS, ["5th bounce", "ideal"]);
    _(130, FAIRWAY, wind(3, "NE"), DS, 13, C_120, "max-3%^ H-1v", NS, ["3rd bounce", "ideal"]);

    _(130, FAIRWAY, wind(3, "NE+1"), DS, 11, C_140, "99%^ H-3v", BS, ["3rd bounce", "ideal", "Check club."]);

    _(130, FAIRWAY, wind(3, "E"), DS, 19, C_120, "max% NS+1v", NS, ["2nd bounce", "ideal", "Goes 3y past flag if miss."]);

    _(130, FAIRWAY, wind(3, "E+1"), DS, 16, C_120, "max% N+2^", NS, ["4th bounce", "ideal"]);

    _(130, FAIRWAY, wind(3, "SE"), DS, 10, C_120, "max% L^", NS, ["5th bounce", "ideal"]);

    _(130, FAIRWAY, wind(3, "SE+1"), DS, 5, C_140, "99%^ NT-1^", NS, ["rolls in", "Check club."]);

    _(130, FAIRWAY, wind(3, "S"), DS, 0, C_140, "104%^ N+2^", BS, ["3rd bounce", "ideal", "Check club."]);

    // ----------------------------------------------------------------------------------


    _(140, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-2%^ H-2v", BS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-1%^ H-2v", BS, ["2nd bounce", "ideal"]);


    _(140, FAIRWAY, wind(1, "N"), DS, 0, C_140, "104%^ NBv", BS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "N"), DS, 0, C_140, "105%^ Hv", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "N+1"), DS, 2, C_140, "104%^ NBv", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "NE"), DS, 3, C_140, "105%^ H-1v", BS, ["4th bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "NE"), DS, 3, C_140, "max-3%^ Hv", BS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "NE+1"), DS, 3, C_140, "105%^ NBv", BS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "E"), DS, 4, C_140, "max-2%^ H-1v", BS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "E+1"), DS, 4, C_140, "max-2%^ H-1v", BS, ["4th bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "E+1"), DS, 3, C_140, "max-1%^ N-1^", BS, ["2nd bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "SE"), DS, 3, C_140, "max-2%^ N-2v", BS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "SE"), DS, 3, C_140, "max-1%^ N-2v", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(1, "SE+1"), DS, 2, C_140, "max-1%^ NT-2^", BS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "SE+1"), DS, 2, C_140, "max% H-2v", BS, ["rolls in", "Goes 5y past flag, then rolls back."]);

    _(140, FAIRWAY, wind(1, "S"), DS, 0, C_140, "103%^ H-3v", NS, ["4th bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "S"), DS, 0, C_140, "104%^ H-1v", NS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(1, "S"), DS, 0, C_140, "105%^ Hv", NS, ["3rd bounce", "ideal"]);



    _(140, FAIRWAY, wind(2, "N"), DS, 0, C_140, "101%^ N+2^", BS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(2, "N"), DS, 0, C_140, "102%^ N-2v", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(2, "N+1"), DS, 3, C_140, "max-3%^ H-2v", BS, ["rolls in", "Goes 5y past flag, then rolls back."]);
    _(140, FAIRWAY, wind(2, "N+1"), DS, 3, C_140, "max-2%^ H-2v", BS, ["rolls in", "Goes 5y past flag, then rolls back."]);

    _(140, FAIRWAY, wind(2, "NE"), DS, 6, C_140, "105%^ H-1v", BS, ["2nd bounce", "ideal"]);    

    _(140, FAIRWAY, wind(2, "NE+1"), DS, 8, C_140, "105%^ H-2v", BS, ["4th bounce", "ideal", "Sometimes 3rd bounce."]);

    _(140, FAIRWAY, wind(2, "E"), DS, 8, C_140, "max-3%^ N-1^", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(2, "E+1"), DS, 8, C_140, "102%^ NS+1v", NS, ["5th bounce", "ideal"]);

    _(140, FAIRWAY, wind(2, "SE"), DS, 7, C_140, "104%^ H-2v", NS, ["5th bounce", "ideal"]);
    _(140, FAIRWAY, wind(2, "SE"), DS, 7, C_140, "105%^ H-2v", NS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(2, "SE+1"), DS, 4, C_140, "max-2%^ H-2v", NS, ["3rd bounce", "ideal"]);
    _(140, FAIRWAY, wind(2, "SE+1"), DS, 4, C_140, "max-2%^ Hv", NS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(2, "S"), DS, 0, C_140, "max-2%^ H-2v", NS, ["3rd bounce", "ideal"]);



    _(140, FAIRWAY, wind(3, "N"), DS, 0, C_140, "99%^ Hv", NS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "N+1"), DS, 4, C_140, "99%^ N+2^", NS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "NE"), DS, 9, C_140, "99%^ Hv", NS, ["5th bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "NE+1"), DS, 12, C_140, "104%^ H-3v", BS, ["3rd bounce", "ideal"]); 

    _(140, FAIRWAY, wind(3, "E"), DS, 12, C_140, "max-3%^ NBv", BS, ["3rd bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "E+1"), DS, 10, C_140, "104%^ NT-1^", NS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "SE"), DS, 10, C_140, "max-3%^ NS+1v", NS, ["5th bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "SE+1"), DS, 5, C_140, "max% NS+1v", BS, ["4th bounce", "ideal"]);

    _(140, FAIRWAY, wind(3, "S"), DS, 0, C_140, "max% NSv", BS, ["4th bounce", "ideal"]);

    // ---------------------------------------

    _(145, FAIRWAY, ZERO_WIND, DS, 0, C_140, "103%^ N^", NS, ["rolls in", "Not ideal."]);
    _(145, FAIRWAY, ZERO_WIND, DS, 0, C_140, "104%^ N^", TS, ["3rd bounce", "Seems quite consistent.", "Rolls 7y past flag if miss."]);
    _(145, FAIRWAY, ZERO_WIND, DS, 0, C_140, "105%^ NSv", NS, ["5th bounce", "ideal", "NS+1v rolls in; good on flat."]);
    _(145, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-3%^ Hv", NS, ["5th bounce", "Risky height."]);
    _(145, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-2%^ H-1v", NS, ["3rd bounce", "Rolls 1y past flag if miss."]);

    _(145, FAIRWAY, ZERO_WIND, H3, -55, C_140, "max% NS+1v", BS, ["5th bounce", "ideal", "Goes 1y to left of flag then bounces back.", "Rolls 5y to right if miss.", "Might go in on 2nd bounce."]);



    _(145, FAIRWAY, wind(3, "W"), DS, -13, C_140, "max-3%^ NS+1v", NS, ["4th bounce", "ideal", "Rolls 1y past flag if miss."]);
    _(145, FAIRWAY, wind(3, "W"), DS, -13, C_140, "max-2%^ H-1v", NS, ["4th bounce", "ideal", "Rolls 1y past flag if miss."]);

    // ---------------------------------------

    _(150, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-2%^ NT-2^", NS, ["rolls in", "Needs long stretch of green."]);
    _(150, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max-1%^ NT-1^", NS, ["5th bounce", "ideal", "Needs lots of green bounces.", "Rolls 1y past flag if miss."]);
    _(150, FAIRWAY, ZERO_WIND, DS, 0, C_140, "max% N^", BS, ["2nd bounce", "ideal", "Rolls back 3y if miss."]);

    _(150, FAIRWAY, wind(1, "N"), DS, 0, C_160, "97%^ NSv", NS, ["4th bounce", "Rolls 5y past flag if miss."]);
    _(150, FAIRWAY, wind(1, "N"), DS, 0, C_160, "99%^ Nv", BS, ["4th bounce", "ideal"]);
    _(150, FAIRWAY, wind(1, "N"), DS, 0, C_160, "96%^ N+1^", NS, ["rolls in", "(97% power).", "(Bad).", "Recorded with fairway bounce."]);

    _(150, FAIRWAY, wind(1, "N+1"), DS, 1, C_160, "99%^ Nv", BS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(1, "NE"), DS, 2, C_160, "99%^ Nv", BS, ["5th bounce", "ideal", "Hits flag a lot in savestate, but very safe."]);


    _(150, FAIRWAY, wind(1, "NE+1"), DS, 3, C_140, "max% NT-1^", BS, ["rolls in", "Goes 3y past flag then rolls back.", "High risk of tinking flag after 1st bounce."]);
    _(150, FAIRWAY, wind(1, "NE+1"), DS, 3, C_140, "max% N+1v", BS, ["2nd bounce", "ideal", "Goes 3y past flag if miss.", "Rolls back 3y if miss."]);

    _(150, FAIRWAY, wind(1, "E"), DS, 3, C_140, "max-1%^ L+2^", NS, ["rolls in", "Needs a lot of green.", "Be careful with hills/grain (slow roller)."]);
    _(150, FAIRWAY, wind(1, "E"), DS, 3, C_140, "max% L+3^", BS, ["2nd bounce", "ideal"]);

    _(150, FAIRWAY, wind(1, "E+1"), DS, 3, C_140, "max% N-1^", BS, ["3rd bounce", "ideal", "Rolls back 3y if miss."]);

    _(150, FAIRWAY, wind(1, "SE"), DS, 3, C_140, "max% NT^", BS, ["3rd bounce", "ideal", "Rolls back 4y if miss."]);
    
    _(150, FAIRWAY, wind(1, "SE+1"), DS, 1, C_140, "max% L^", BS, ["3rd bounce", "ideal", "Rolls back 0-1y if miss."]);

    _(150, FAIRWAY, wind(1, "S"), DS, 0, C_140, "max% L+1^", BS, ["3rd bounce", "ideal", "Rolls back 1y if miss."]);


    _(150, FAIRWAY, wind(2, "N"), DS, 0, C_160, "99%^ N-2^", BS, ["3rd bounce", "ideal", "Rolls 2y past flag if miss."]);

    _(150, FAIRWAY, wind(2, "N+1"), DS, 2, C_160, "99%^ N+2^", BS, ["3rd bounce", "ideal", "Rolls 2y past flag if miss."]);

    _(150, FAIRWAY, wind(2, "NE"), DS, 4, C_160, "99%^ NSv", BS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(2, "NE+1"), DS, 5, C_160, "99%^ Nv", BS, ["5th bounce", "ideal"]);

    _(150, FAIRWAY, wind(2, "E"), DS, 8, C_140, "max-1%^ NT-1^", NS, ["rolls in", "ideal", "Might go in on 5th bounce."]);
    _(150, FAIRWAY, wind(2, "E"), DS, 8, C_140, "max% NT^", BS, ["2nd bounce", "ideal", "Goes 1y past flag if miss.", "Rolls back 2y if miss."]);

    _(150, FAIRWAY, wind(2, "E+1"), DS, 7, C_140, "max% L+2^", BS, ["3rd bounce", "ideal"]);

    _(150, FAIRWAY, wind(2, "SE"), DS, 7, C_140, "max% H-2v", NS, ["3rd bounce", "ideal"]);

    _(150, FAIRWAY, wind(2, "SE+1"), DS, 4, C_140, "max% H-3v", NS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(2, "S"), DS, 0, C_140, "max-1%^ NT^", TS, ["rolls in", "Needs long stretch of flat green."]);
    _(150, FAIRWAY, wind(2, "S"), DS, 0, C_140, "max% NBv", NS, ["rolls in", "ideal", "Might go in on 5th bounce."]);

    
    _(150, FAIRWAY, wind(3, "N"), DS, 0, C_140, "max-1%^ N^", BS, ["3rd bounce", "ideal"]);

    _(150, FAIRWAY, wind(3, "N+1"), DS, 4, C_140, "101%^ N-2^", NS, ["rolls in"]);
    _(150, FAIRWAY, wind(3, "N+1"), DS, 4, C_140, "102%^ NBv", NS, ["rolls in"]);

    _(150, FAIRWAY, wind(3, "NE"), DS, 6, C_160, "99%^ N-1^", BS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(3, "NE+1"), DS, 8, C_160, "99%^ N^", BS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(3, "E"), DS, 13, C_140, "max% N+2^", BS, ["3rd bounce", "ideal", "Might go in on 4th or 5th bounce.", "Rolls back 5y if miss."]);

    _(150, FAIRWAY, wind(3, "E+1"), DS, 9, C_140, "max% L^", BS, ["4th bounce", "ideal", "Rolls back 1y if miss."]);

    _(150, FAIRWAY, wind(3, "SE"), DS, 11, C_140, "max% NSv", NS, ["4th bounce", "ideal"]);

    _(150, FAIRWAY, wind(3, "SE+1"), DS, 5, C_140, "max% N^", NS, ["5th bounce", "ideal"]);
    // _(150, FAIRWAY, wind(3, "SE+1"), DS, 4, C_140, "max% L+2^", NS, ["4th bounce"]);

    _(150, FAIRWAY, wind(3, "S"), DS, 0, C_140, "max% NT-1^", NS, ["4th bounce", "ideal"]);

    // ---------------------------------------------------------------------

    _(160, FAIRWAY, ZERO_WIND, DS, 0, C_160, "101%^ NBv", NS, ["4th bounce", "Rolls 3y past flag if miss."]);
    _(160, FAIRWAY, ZERO_WIND, DS, 0, C_160, "105%^ NT-2^", BS, ["rolls in"]);
    _(160, FAIRWAY, ZERO_WIND, DS, 0, C_160, "max-3%^ N+1^", BS, ["4th bounce", "ideal", "Rolls back 1y if miss."]);
    _(160, FAIRWAY, ZERO_WIND, DS, 0, C_160, "max-2%^ H-2v", BS, ["4th bounce", "Rolls back 2y if miss."]);

    _(160, FAIRWAY, wind(3, "N"), DS, 0, C_160, "max-3%^ N-1^", BS, ["3rd bounce", "N-2^/NT^ also work.", "Goes 1y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "N"), DS, 0, C_160, "max-2%^ H-3v", BS, ["4th bounce", "H-2v also works.", "ideal", "Goes 1y past flag if miss, then rolls back 1y."]);

    _(160, FAIRWAY, wind(3, "N+1"), DS, 4, C_160, "99%^ N+1^", NS, ["rolls in", "Probably rolls in.", "Can't confirm; save state has a fairway bounce."]);
    _(160, FAIRWAY, wind(3, "N+1"), DS, 4, C_160, "101%^ H-2v", BS, ["4th bounce", "ideal"]);
    _(160, FAIRWAY, wind(3, "N+1"), DS, 4, C_160, "102%^ H-2v", BS, ["3rd bounce", "ideal", "Goes 1y past flag if miss."]);
    // 101 H-2v backspin 4th bounce ideal

    _(160, FAIRWAY, wind(3, "NW"), DS, -7, C_160, "101%^ N^", BS, ["4th bounce", "ideal", "Harder than 102%^ (tricky height)."]);
    _(160, FAIRWAY, wind(3, "NW"), DS, -7, C_160, "102%^ N+1^", BS, ["4th bounce", "ideal", "Better than 103%^."]);
    _(160, FAIRWAY, wind(3, "NW"), DS, -7, C_160, "103%^ N+1^", BS, ["4th bounce", "ideal"]);

    _(160, FAIRWAY, wind(3, "NE+1"), DS, 8, C_160, "103%^ NT-1^", NS, ["3rd bounce", "Rolls 8y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "NE+1"), DS, 8, C_160, "104%^ N-2^", BS, ["4th bounce", "ideal", "N-1^ = 3rd bounce."]);
    _(160, FAIRWAY, wind(3, "NE+1"), DS, 8, C_160, "105%^ N-1^", BS, ["3rd bounce", "ideal", "Goes 1y past flag if miss."]);

    _(160, FAIRWAY, wind(3, "W"), DS, -11, C_160, "102%^ H-3v", NS, ["4th bounce", "Rolls 4y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "W"), DS, -11, C_160, "103%^ H-2v", NS, ["4th bounce", "Rolls 4y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "W"), DS, -11, C_160, "max-2%^ H-2v", BS, ["4th bounce", "ideal"]);

    _(160, FAIRWAY, wind(3, "SW+1"), DS, -9, C_160, "max-3%^ N-2^", NS, ["3rd bounce", "Rolls 7y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "SW+1"), DS, -9, C_160, "max-2%^ NT-1^", BS, ["4th bounce", "ideal"]);
    _(160, FAIRWAY, wind(3, "SW+1"), DS, -9, C_160, "max-1%^ N-1^", BS, ["3rd bounce", "ideal", "Goes 1y past flag if miss, then rolls back."]);

    _(160, FAIRWAY, wind(3, "SW"), DS, -8, C_160, "max-3%^ H-3v", NS, ["4th bounce", "Rolls 3y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "SW"), DS, -8, C_160, "max-2%^ H-2v", NS, ["4th bounce", "Rolls 2y past flag if miss.", "ideal"]);
    _(160, FAIRWAY, wind(3, "SW"), DS, -8, C_160, "max-1%^ H-2v", NS, ["3rd bounce", "Rolls 3y past flag if miss."]);

    _(160, FAIRWAY, wind(3, "S+1"), DS, -5, C_160, "max-2%^ H-2v", NS, ["rolls in"]);
    _(160, FAIRWAY, wind(3, "S+1"), DS, -5, C_160, "max-1%^ H-1v", NS, ["5th bounce", "Rolls 1y past flag if miss.", "Risky height; H-2v is safer (4th bounce)."]);
    _(160, FAIRWAY, wind(3, "S+1"), DS, -5, C_160, "max%^ H-2v", BS, ["2nd bounce", "Goes 2y past flag, then rolls back 1y.", "Sometimes tinks flag after 1st bounce."]);

    _(160, FAIRWAY, wind(3, "S"), DS, 0, C_160, "max-1%^ NT-2^", NS, ["4th bounce", "Rolls 3y past flag if miss."]);
    _(160, FAIRWAY, wind(3, "S"), DS, 0, C_160, "max-1%^ H-3v", NS, ["4th bounce", "Rolls 1y past flag if miss.", "H-2v rolls in."]);

    return shotOptions;
})();