['keydown', 'click', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => window.location = '/login')
})

var string = "Climbers Connect";
var array = string.split("");
var timer;

function frameLooper() {
    if (array.length > 0) {
        document.getElementById("text").innerText += array.shift();
    } else {
        clearTimeout(timer);
    }
    setTimeout('frameLooper()', 70); /* change 70 for speed */
}

frameLooper();