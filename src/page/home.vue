<template>
    <div>
        <head-top></head-top>
        <div class="body" v-html="html"></div>
    </div>
</template>
<script>
    import headTop from "../components/headTop"
    export default {
        name: "home",
        data(){
            return {
                html:'<!DOCTYPE html> \
                <html lang="en"> \
                    <head> \
                    <meta charset="UTF-8"> \
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"> \
                    <meta http-equiv="X-UA-Compatible" content="ie=edge"> \
                    <title>Home</title> \
                    <link href="favicon.png" rel="shortcut icon" type="image/x-icon" />\
                    </head>\
                    <body> \
                    <div id="search">\
                    <input id="search-field" type="text" name="search-field" onkeypress="return search(event)"/>\
                    </div>\
                    <div class="container">\
                    <div id="clock"></div>\
                    <div class="weather-container">\
                    <div class="row">\
                    <div id="weather-description"class="inline"></div>\
                    <div class="inline">-</div>\
                    <div id="temp" class="inline"></div>\
                    </div>\
                    </div>\
                    <div class="bookmark-container">\
                    <div class="bookmark-set">\
                    <div class="bookmark-title">Daily</div>\
                    <div class="bookmark-inner-container">\
                    <a class="bookmark" href="https://inbox.google.com/" target="_blank">Inbox</a>\
                    <a class="bookmark" href="https://github.com/" target="_blank">Github</a>\
                    <a class="bookmark" href="https://drive.google.com/" target="_blank">Drive</a>\
                    </div>\
                    </div>\
                    <div class="bookmark-set">\
                    <div class="bookmark-title">Media</div>\
                    <div class="bookmark-inner-container">\
                    <a class="bookmark" href="https://youtube.com" target="_blank">Youtube</a>\
                    <a class="bookmark" href="https://netflix.com" target="_blank">Netflix</a>\
                    <a class="bookmark" href="https://crunchyroll.com" target="_blank">Crunchyroll</a>\
                    <a class="bookmark" href="https://" target="_blank">Amazon Prime</a>\
                </div>\
                </div>\
                <div class="bookmark-set">\
                    <div class="bookmark-title">Reddit</div>\
                    <div class="bookmark-inner-container">\
                    <a class="bookmark" href="https://reddit.com/r/overwatch" target="_blank">/r/overwatch</a>\
                    <a class="bookmark" href="https://reddit.com/r/pcmasterrace" target="_blank">/r/pcmasterrace</a>\
                    <a class="bookmark" href="https://reddit.com/r/me_irl" target="_blank">/r/me_irl</a>\
                    <a class="bookmark" href="https://reddit.com/r/battlestations" target="_blank">/r/battlestations</a>\
                    <a class="bookmark" href="https://reddit.com/r/unixporn" target="_blank">/r/unixporn</a>\
                    <a class="bookmark" href="https://reddit.com/r/news" target="_blank">/r/news</a>\
                    </div>\
                    </div>\
                    <div class="bookmark-set">\
                    <div class="bookmark-title">Social</div>\
                    <div class="bookmark-inner-container">\
                    <a class="bookmark" href="https://twitter.com" target="_blank">Twitter</a>\
                    <a class="bookmark" href="https://facebook.com" target="_blank">Facebook</a>\
                    </div>\
                    </div>\
                    </div>\
                    </div>\
                   </body></html>'

                }

        },


        components: {
            headTop,
        },
    }
    // Search on enter key event
    function search(e) {
        if (e.keyCode == 13) {
            var val = document.getElementById("search-field").value;
            window.open("https://google.com/search?q=" + val);
        }
    }
    // Get current time and format
    function getTime() {
        let date = new Date(),
            min = date.getMinutes(),
            sec = date.getSeconds(),
            hour = date.getHours();

        return "" +
            (hour < 10 ? ("0" + hour) : hour) + ":" +
            (min < 10 ? ("0" + min) : min) + ":" +
            (sec < 10 ? ("0" + sec) : sec);
    }

    window.onload = () => {
        let xhr = new XMLHttpRequest();
        // Request to open weather map
        xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=4737316&units=imperial&appid=e5b292ae2f9dae5f29e11499c2d82ece');
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.responseText);
                    console.log(json);
                    document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + " F";
                    document.getElementById("weather-description").innerHTML = json.weather[0].description;
                } else {
                    console.log('error msg: ' + xhr.status);
                }
            }
        }
        xhr.send();
        // Set up the clock
        document.getElementById("clock").innerHTML = getTime();
        // Set clock interval to tick clock
        setInterval( () => {
            document.getElementById("clock").innerHTML = getTime();
        },100);
    }

    document.addEventListener("keydown", event => {
        if (event.keyCode == 32) {          // Spacebar code to open search
            document.getElementById('search').style.display = 'flex';
            document.getElementById('search-field').focus();
        } else if (event.keyCode == 27) {   // Esc to close search
            document.getElementById('search-field').value = '';
            document.getElementById('search-field').blur();
            document.getElementById('search').style.display = 'none';
        }
    });
</script>

<style >
    @import url('https://fonts.googleapis.com/css?family=Roboto+Mono');
    .chart-container{
        position: relative;
        width: 100%;
        height: calc(100vh - 84px);
    }

    .body {
        background-color: #5F4B8B;
        margin: 0px;
    }

    .container {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    #clock {
        font-family: sans-serif;
        font-size: 3.5rem;
        font-weight: 600;
        font-family: "Roboto Mono";
        color: #fff;
        margin-bottom: .25em;
    }

    #search {
        width: 100%;
        height: 100vh;
        background-color: #272727;
        display: none;
        position: absolute;
        box-sizing: border-box;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #search-field {
        width: 90%;
        padding: .75em 1em;
        box-sizing: border-box;
        background-color: #272727;
        border: solid 0px #272727;
        font-family: "Roboto Mono";
        font-size: 4rem;
        color: #f2f2f2;
        outline: none;
        border-radius: 3px;
        margin-bottom: 1em;
        text-align: center;
    }

    .weather-container {
        width: 30%;
        background-color: #272727;
        padding: 1em;
        border-radius: 3px;
        font-family: "Roboto Mono";
        color: #fff;
        text-align: center;
    }
    .inline {
        display: inline-block;
    }

    .bookmark-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 50%;
        margin: 1em 0em;
    }

    @media only screen and (max-width: 960px) {
        .container {
            height: auto;
        }
        #clock {
            margin-top: 1em;
        }
        .container > .bookmark-container {
            flex-direction: column;
            width: 60%;
        }
        .bookmark-container > .bookmark-set {
            width: auto;
            margin: 1em 0em;
        }
    }

    .bookmark-set{
        padding: 1em;
        background-color: #272727;
        border-radius: 3px;
        font-family: "Roboto Mono";
        font-size: .85rem;
        width: 25%;
        height: 10em;
        margin: 0em .5em;
    }
    .bookmark-inner-container {
        overflow-y: scroll;
        height: 80%;
        vertical-align: top;
    }
    .bookmark-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #fff;
        margin: 0em 0em .35em 0em;
    }
    .bookmark {
        text-decoration: none;
        color: #8c8c8b;
        display:block;
        margin: .5em 0em;
    }
    .bookmark:hover {
        color: #fff;
    }

</style>

