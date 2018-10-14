type breakpoint =
  | Large
  | Small;

let makeRGBA = Css.rgba(17, 17, 17);

let breakpoint = size =>
  switch size {
    | Large => "only screen and (min-width: 1280px)"
    | Small => "only screen and (min-width: 768px)"
  };

let level = Css.([
  alignItems(center),
  display(`flex),
  justifyContent(spaceBetween),
]);

let thin = Css.([
  fontWeight(300),
]);

/* Global styles */

let fontUrl = ( format, suffix ) =>
  Printf.sprintf("url('/fonts/lato-v11-latin-%s.%s') format('%s')", suffix, format, format);

Css.([
  /* Resets */

  /* Blocks */
  ( "html,body,p,h1,h2,h3", [ margin(zero), padding(zero) ] ),

  /* Headings */
  ( "h1,h2,h3", [ fontSize @@ pct(100.), fontWeight(400) ] ),

  /* Box sizing */
  ( "html", [ boxSizing(borderBox) ] ),
  ( "*,*:after,*:before", [ unsafe("boxSizing", "inherit") ]),

  /* Media */
  ( "img", [ height(auto), maxWidth @@ pct(100.) ] ),

  /* Fonts */

  ( "@font-face", [
      fontFamily("Lato"),
      fontStyle(normal),
      fontWeight(300),
      unsafe("fontDisplay", "swap"),
      unsafe("src", Printf.sprintf(
        "local('Lato %s'), local('Local-%s'), %s, %s",
        "Light",
        "Light",
        fontUrl("woff2", "300"),
        fontUrl("woff", "300")
      ))
    ],
  ),

  ( "@font-face", [
      fontFamily("Lato"),
      fontStyle(normal),
      fontWeight(400),
      unsafe("fontDisplay", "swap"),
      unsafe("src", Printf.sprintf(
        "local('Lato %s'), local('Local-%s'), %s, %s",
        "Regular",
        "Regular",
        fontUrl("woff2", "regular"),
        fontUrl("woff", "regular")
      ))
    ]
  ),

  /* Global */

  ( "html,body", [ height @@ pct(100.) ] ),
  ( "html", [
      unsafe("MozOsxFontSmoothing", "grayscale"),
      unsafe("WebkitFontSmoothing", "antialiased"),
      unsafe("WebkitOverflowScrolling", "touch"),
      lineHeight @@ `abs(1.45),
      overflowX(hidden),
      unsafe("textRendering", "optimizeLegibility"),
    ]
  ),
  ( "body", [
      backgroundColor @@ hex("4b79a1"),
      backgroundImage @@ linearGradient(deg(-90), [ ( 0, hex("4b79a1") ), ( 100, hex("283e51") ) ]),
      color @@ hsl(200, 16, 16),
      fontSize @@ Calc.(px(16) + vw(0.4)),
      fontFamily("Lato, san-serif"),
    ]
  ),
] |> List.iter((( selector, styles )) => { global(selector, styles) }));
