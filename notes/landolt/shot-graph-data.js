const clubLineups = {
    "100Y": new Lineup(NaN, NaN),
    "130Y": new Lineup(NaN, NaN),
    "150Y": new Lineup(NaN, NaN),
    "160Y": new Lineup(NaN, NaN),
    "170Y": new Lineup(NaN, NaN),
    "180Y": new Lineup(NaN, NaN),
    "190Y": new Lineup(NaN, NaN),
    "200Y": new Lineup(NaN, NaN),
    "210Y": new Lineup(NaN, NaN),
    "220Y": new Lineup(NaN, NaN),
    "230Y": new Lineup(NaN, NaN),
};

const _110PERCENT_BACKSPIN_N_CUTOFFS = {
    "2hook":  {
        "100Y": new Lineup(102, -38),
        "130Y": new Lineup(134, -40),
        "150Y": new Lineup(155, -40),
        "160Y": new Lineup(167, -41),
        "170Y": new Lineup(178, -42),
        "180Y": new Lineup(189, -42),
        "190Y": new Lineup(199, -42),
        "200Y": new Lineup(210, -43),
        "210Y": new Lineup(221, -43),
        "220Y": new Lineup(233, -44),
        "230Y": new Lineup(243, -43),
    },
    "1hook":  {
        "100Y": new Lineup(103, -19),
        "130Y": new Lineup(135, -20),
        "150Y": new Lineup(157, -20),
        "160Y": new Lineup(169, -20),
        "170Y": new Lineup(180, -21),
        "180Y": new Lineup(191, -21),
        "190Y": new Lineup(202, -21),
        "200Y": new Lineup(213, -21),
        "210Y": new Lineup(225, -22),
        "220Y": new Lineup(236, -22),
        "230Y": new Lineup(247, -22),
    },
    "straight":  {
        "100Y": new Lineup(103, 0),
        "130Y": new Lineup(136, 0),
        "150Y": new Lineup(158, 0),
        "160Y": new Lineup(170, 0),
        "170Y": new Lineup(181, 0),
        "180Y": new Lineup(192, 0),
        "190Y": new Lineup(204, 0),
        "200Y": new Lineup(215, 0),
        "210Y": new Lineup(227, 0),
        "220Y": new Lineup(238, 0),
        "230Y": new Lineup(249, 0),
    },
    "1slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        // "190Y": new Lineup(204, 23),
        // "200Y": new Lineup(215, 23),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
    "2slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        // "190Y": new Lineup(202, 45),
        // "200Y": new Lineup(214, 45),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
}

const _100PERCENT_BACKSPIN_N_CUTOFFS = {
    "2hook":  {
        "100Y": new Lineup(93, -34),
        "130Y": new Lineup(122, -36),
        "150Y": new Lineup(142, -37),
        "160Y": new Lineup(152, -36),
        "170Y": new Lineup(162, -37),
        "180Y": new Lineup(172, -36),
        "190Y": new Lineup(181, -37),
        "200Y": new Lineup(191, -37),
        "210Y": new Lineup(200, -37),
        "220Y": new Lineup(211, -37),
        "230Y": new Lineup(219, -37),
    },
    "1hook":  {
        "100Y": new Lineup(94, -17),
        "130Y": new Lineup(123, -18),
        "150Y": new Lineup(143, -18),
        "160Y": new Lineup(154, -18),
        "170Y": new Lineup(163, -18),
        "180Y": new Lineup(173, -18),
        "190Y": new Lineup(184, -19),
        "200Y": new Lineup(194, -19),
        "210Y": new Lineup(205, -19),
        "220Y": new Lineup(215, -19),
        "230Y": new Lineup(224, -19),
    },
    "straight":  {
        "100Y": new Lineup(94, 0),
        "130Y": new Lineup(124, 0),
        "150Y": new Lineup(144, 0),
        "160Y": new Lineup(155, 0),
        "170Y": new Lineup(164, 0),
        "180Y": new Lineup(175, 0),
        "190Y": new Lineup(185, 0),
        "200Y": new Lineup(195, 0),
        "210Y": new Lineup(207, 0),
        "220Y": new Lineup(216, 0),
        "230Y": new Lineup(226, 0),
    },
    "1slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        "190Y": new Lineup(NaN, NaN),
        "200Y": new Lineup(NaN, NaN),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
    "2slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        "190Y": new Lineup(NaN, NaN),
        "200Y": new Lineup(NaN, NaN),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
}

const _95PERCENT_BACKSPIN_N_CUTOFFS = {
    "2hook":  {
        "100Y": new Lineup(89, -32),
        "130Y": new Lineup(117, -34),
        "150Y": new Lineup(136, -34),
        "160Y": new Lineup(145, -34),
        "170Y": new Lineup(155, -35),
        "180Y": new Lineup(164, -35),
        "190Y": new Lineup(173, -35),
        "200Y": new Lineup(183, -35),
        "210Y": new Lineup(193, -36),
        "220Y": new Lineup(204, -37),
        "230Y": new Lineup(213, -37), // this one SUX, barely goes in tbh
    },
    "1hook":  {
        "100Y": new Lineup(90, -16), // works better at 89 tbh
        "130Y": new Lineup(118, -16),
        "150Y": new Lineup(137, -17),
        "160Y": new Lineup(146, -17),
        "170Y": new Lineup(156, -17),
        "180Y": new Lineup(166, -18),
        "190Y": new Lineup(176, -18),
        "200Y": new Lineup(186, -18), // technically 187 on last few frames, but 186 works better
        "210Y": new Lineup(195, -18),
        "220Y": new Lineup(205, -18), // works better at 204 tbh, 205.00001 on last frame
        "230Y": new Lineup(215, -18),
    },
    "straight":  {
        "100Y": new Lineup(90, 0),
        "130Y": new Lineup(118, 0), // technically 119 for ~1 frame
        "150Y": new Lineup(138, 0),
        "160Y": new Lineup(147, 0),
        "170Y": new Lineup(157, 0),
        "180Y": new Lineup(168, 0), // technically 169, but BARELY for a frame or two
        "190Y": new Lineup(177, 0),
        "200Y": new Lineup(187, 0),
        "210Y": new Lineup(199, 0),
        "220Y": new Lineup(208, 0),
        "230Y": new Lineup(218, 0),
    },
    "1slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        "190Y": new Lineup(NaN, NaN),
        "200Y": new Lineup(NaN, NaN),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
    "2slice":  {
        "100Y": new Lineup(NaN, NaN),
        "130Y": new Lineup(NaN, NaN),
        "150Y": new Lineup(NaN, NaN),
        "160Y": new Lineup(NaN, NaN),
        "170Y": new Lineup(NaN, NaN),
        "180Y": new Lineup(NaN, NaN),
        "190Y": new Lineup(NaN, NaN),
        "200Y": new Lineup(NaN, NaN),
        "210Y": new Lineup(NaN, NaN),
        "220Y": new Lineup(NaN, NaN),
        "230Y": new Lineup(NaN, NaN),
    },
}

// ----------------- wind plots -----------------

const windLineups = {
    "0": new Lineup(NaN, NaN),
    "1": new Lineup(NaN, NaN),
    "2": new Lineup(NaN, NaN),
    "3": new Lineup(NaN, NaN),
    "4": new Lineup(NaN, NaN),
    "5": new Lineup(NaN, NaN),
    "6": new Lineup(NaN, NaN),
    "7": new Lineup(NaN, NaN),
    "8": new Lineup(NaN, NaN),
    "9": new Lineup(NaN, NaN),
    "10": new Lineup(NaN, NaN),
    "11": new Lineup(NaN, NaN),
    "12": new Lineup(NaN, NaN),
    "13": new Lineup(NaN, NaN),
    "14": new Lineup(NaN, NaN),
    "15": new Lineup(NaN, NaN),
};

const clubWindLineups = {
    "230Y": {...windLineups},
    "220Y": {...windLineups},
    "210Y": {...windLineups},
    "200Y": {...windLineups},
    "190Y": {...windLineups},
    "180Y": {...windLineups},
    "170Y": {...windLineups},
    "160Y": {...windLineups},
    "150Y": {...windLineups},
    "130Y": {...windLineups},
    "100Y": {...windLineups},
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_N = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(248.25, -38),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(255.00, 0),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(248.00, -23),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(252.75, 15),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(240.00, -10),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(243.75, 29),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(229.70, -2),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(230.75, 37),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_E = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(215, 1),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(216.0, 40),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(201.75, -2),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(201.75, 36),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(189.75, -9),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(190.25, 28),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(181.10, -20),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(182.75, 15),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_S = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(177.00, -34),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(180.00, 0),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_S1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(178.00, -48),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1["straight"]["230Y"]["15"]),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(183.10, -62),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE["straight"]["230Y"]["15"]),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(193.25, -72),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1["straight"]["230Y"]["15"]),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_W = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(207.50, -76),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["230Y"]["15"]), // new Lineup(216.0, -39),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_W1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(221.00, -74),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1["straight"]["230Y"]["15"]),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(234.00, -66),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE["straight"]["230Y"]["15"]),
        },
    },
};

const _95PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW1 = {
    "2hook": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["2hook"]["230Y"],
            "15": new Lineup(244.75, -53),
        },
    },
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _95PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": mirrorHorizontally(_95PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1["straight"]["230Y"]["15"]),
        },
    },
};

// 100 percent backspin N

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_N = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E = {
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(223.25, 42),
        },
        "220Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["220Y"],
            "15": new Lineup(0, 0),
        },
        "210Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["210Y"],
            "15": new Lineup(0, 0),
        },
        "200Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["200Y"],
            "15": new Lineup(0, 0),
        },
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(0, 0),
        },
        "180Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["180Y"],
            "15": new Lineup(0, 0),
        },
        "170Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["170Y"],
            "15": new Lineup(0, 0),
        },
        "160Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["160Y"],
            "15": new Lineup(0, 0),
        },
        "150Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["150Y"],
            "15": new Lineup(140.25, 66),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_S = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_S1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1["straight"]["190Y"]["15"]),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE["straight"]["190Y"]["15"]), // new Lineup(165.25, -40),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1["straight"]["190Y"]["15"]),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_W = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["190Y"]["15"]),// new Lineup(199.0, -61),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_W1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1["straight"]["190Y"]["15"]), // new Lineup(179.75, -55),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE["straight"]["190Y"]["15"]),
        },
    },
};

const _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _100PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_100PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1["straight"]["190Y"]["15"]),
        },
    },
};

// 110 percent backspin N

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_N = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(259.50, 0),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(254.25, 24),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(239.75, 44),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(220.00, 58),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E = {
    "straight": {
        "230Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["230Y"],
            "15": new Lineup(244.75, 49),
        },
        "220Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["220Y"],
            "15": new Lineup(234.00, 53),
        },
        "210Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["210Y"],
            "15": new Lineup(222.25, 57),
        },
        "200Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["200Y"],
            "15": new Lineup(210.25, 59),
        },
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(199.00, 62),
        },
        "180Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["180Y"],
            "15": new Lineup(187.50, 64),
        },
        "170Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["170Y"],
            "15": new Lineup(176.25, 68),
        },
        "160Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["160Y"],
            "15": new Lineup(164.25, 72),
        },
        "150Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["150Y"],
            "15": new Lineup(152.75, 76),
        },
        "130Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["130Y"],
            "15": new Lineup(128.50, 94),
        },
        "100Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["100Y"],
            "15": new Lineup(93.50, 129),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(179.75, 56),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(165.25, 41),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(156.50, 22),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_S = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": new Lineup(153.25, 0),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_S1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE1["straight"]["190Y"]["15"]),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SE["straight"]["190Y"]["15"]), // new Lineup(165.25, -40),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_SW1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E1["straight"]["190Y"]["15"]),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_W = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["190Y"]["15"]),// new Lineup(199.0, -61),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_W1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE1["straight"]["190Y"]["15"]), // new Lineup(179.75, -55),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NE["straight"]["190Y"]["15"]),
        },
    },
};

const _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_NW1 = {
    "straight": {
        "190Y": {
            ...windLineups,
            "0": _110PERCENT_BACKSPIN_N_CUTOFFS["straight"]["190Y"],
            "15": mirrorHorizontally(_110PERCENT_BACKSPIN_N_CUTOFFS_WIND_N1["straight"]["190Y"]["15"]),
        },
    },
};

function mirrorHorizontally(lineup) {
    if (lineup.isKnown()) {
        const newOffset = lineup.offset === 0 ? 0 : ((-1) * lineup.offset) + 1;
        return new Lineup(lineup.distance, newOffset);
    }
    return lineup;
}

function fractionalOffset(lineup, fraction) {
    if (lineup.isKnown()) {
        const newOffset = lineup.offset * fraction;
        return new Lineup(lineup.distance, newOffset);
    }
    return lineup;
}

// ----------------- crosswind graphs -----------------

const _BACKSPIN_N_CUTOFF_15_CROSSWIND = {
    "230Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["230Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["230Y"]["15"],
    ],
    "220Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["220Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["220Y"]["15"],
    ],
    "210Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["210Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["210Y"]["15"],
    ],
    "200Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["200Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["200Y"]["15"],
    ],
    "190Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["190Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["190Y"]["15"],
    ],
    "180Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["180Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["180Y"]["15"],
    ],
    "170Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["170Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["170Y"]["15"],
    ],
    "160Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["160Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["160Y"]["15"],
    ],
    "150Y": [
        undefined,
        _100PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["150Y"]["15"],
        _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["150Y"]["15"],
    ],
    // "130Y": [
    //     undefined,
    //     undefined,
    //     _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["130Y"]["15"],
    // ],
    // "100Y": [
    //     undefined,
    //     undefined,
    //     _110PERCENT_BACKSPIN_N_CUTOFFS_WIND_E["straight"]["100Y"]["15"],
    // ],

    // build this dynamically?
    // should it be for 5 wind? 3 wind? 15 wind? why not all 3? (all 15 would be too much)

    // should we have 4 per club? 95/100/101/110
}
