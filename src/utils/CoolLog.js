export function CoolLog() {
    let backgroundImage = [
        "background-image: url(https://i.pinimg.com/originals/5b/43/02/5b4302c2f6413454c782aeec866143cf.gif)",
        "background-size: cover",
        "color: black",
        "padding: 100px",
        "font-weight: bolder",
        "font-size: 40px",
        "-webkit-text-strokeWidth: 1px",
        "-webkit-text-stroke-color: yellow",
        "text-transform: uppercase",
        "text-align: center",
        "letter-spacing: 1px",
      ].join(" ;");
    console.log("%cMay the force be with you", backgroundImage);
}