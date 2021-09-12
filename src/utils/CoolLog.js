export function CoolLog() {
    let backgroundImage = [
        "background-image: url(https://i.pinimg.com/originals/d0/45/6e/d0456e80877753487e03deaab16c3d26.gif)",
        "background-size: cover",
        "color: #feda4a",
        "padding: 100px",
        "font-weight: bolder",
        "font-size: 40px",
        "-webkit-text-strokeWidth: 1px",
        "-webkit-text-stroke-color: yellow",
        "text-transform: uppercase",
        "text-align: center",
        "letter-spacing: 6px",
      ].join(" ;");
    console.log("%cMay the force be with you", backgroundImage);
}