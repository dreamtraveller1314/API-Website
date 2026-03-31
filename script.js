const background = document.getElementById("background");

async function getBackground() {
  const url =
    "https://api.nasa.gov/planetary/apod?api_key=qF2xtffJ6XiUgz0UcWsXzjLHo1UZQSK41EWMegeQ";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

        if (result.media_type !== "image") {
            console.log("APOD returned a non-image media type.");
            return null;
        }

        return result.url;
        } catch (error) {
        console.log(error.message);
        return null;
    }
    
}

window.onload = function () {
  getBackground().then(function (imageUrl) {
    if (!imageUrl) return;

    console.log(imageUrl);

    if (background) {
      background.style["background-image"] = `url('${imageUrl}')`;
    }
  });
};

setInterval(() => {
  // code goes here
}, 1000); // <-- this is the interval. In this case, 1000 ms or 1 sec.