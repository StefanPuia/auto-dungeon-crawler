'use strict';

const gameKey = getParameterValue("play");

/**
 * make a fetch call to the server
 * @param  {String}   fetchURL      fetch URL
 * @param  {Object}   options  fetch options
 */
function callServer(fetchURL = '/api', options = {}) {
    return new Promise((resolve, reject) => {
        let type = 'json';
        if (options.responseType) {
            type = options.responseType;
            delete options.responseType;
        }

        if (options.body && (!options.method || options.method.toLowerCase() == 'get')) {
            options.method = 'post';
        }

        if (options.body && typeof options.body === "object") {
            options.body = JSON.stringify(options.body);
        }

        let showSpinner = true;
        if (typeof options.spinner !== "undefined" && options.spinner === false) {
            showSpinner = false;
            delete options.spinner;
        }

        const fetchOptions = {
            credentials: 'same-origin',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        Object.assign(fetchOptions, options);

        if (showSpinner) waitSpinner();
        fetch(fetchURL, fetchOptions)
        .then(res => {
            return res.text();
        })
        .then(data => {
            switch (type) {
                case 'json':
                    try {
                        let json = JSON.parse(data);
                        if (json.error) {
                            throw json.error;
                        }
                        resolve(json);
                    } catch(err) {
                        console.warn(data);
                        throw err;
                    }
                    break;

                case 'text':
                case 'html':
                    resolve(data);
                    break;
            }
            resolve(data);
        })
        .catch(err => {
            if (typeof err === "object") {
                reject(JSON.stringify(err));
            } else if (typeof err === "string") {
                reject(err);
            } else {
                reject(err.toString());
            }
        })
        .finally(() => {
            waitSpinner(false);
        });
    });
}

/**
 * Toggles the spinner
 * @param {Boolean} show 
 */
function waitSpinner(show = true) {
    if (show) {
        $("#spinner").css({display: "flex"});
    } else {
        $("#spinner").css({display: "none"});
    }
}

function getParameterValue(param, path) {
    path = !!path ? path : location.pathname;
    let parts = escape(path).split('/');
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == param && parts.length > i) {
            return parts[i + 1];
        }
    }
    return undefined;
}

function loadBoard() {
    callServer(`/game/${gameKey}/getData`)
    .then(renderBoard).catch(console.error);
}

function renderBoard(data) {
    $("#health").text(data.player.health);
    $("#attack").text(data.player.attack);
    $("#gold").text(data.player.gold);

    $("#board").html("");
    for(let i = 0; i < 14; i++) {
        for (let j = 0; j < 10; j++) {
            const tileData = data.board[i][j];
            const tile = $(`<div class="boardTile"/>`);
            tile.data("position", {x: i, y: j});
            tile.addClass(tileData.type);
            tile.append($(`<span class="display">${tileData.display || ""}</span>`));
            if (data.running === true) {
                tile.on("click", () => { handleTileClick(tile); });
            }
            if (tileData.type === "monster") {
                const stats = $("<div class='stats'></div>");
                stats.append($(`<div class="attack">${tileData.extra.attack}</div>`));
                stats.append($(`<div class="health">${tileData.extra.health}</div>`));
                tile.append(stats);
            }
            tile.css({ "background-position": sprite(tileData) });
            if (tileData.layer) {
                const layer = $("<div class='layer'></div>");
                tile.css({ "background-position": sprite(tileData.layer) });
                layer.css({ "background-position": sprite(tileData) });
                tile.append(layer);
            }
            $("#board").append(tile);
            $("#button").text(data.level + " / " + data.modifier);
        }
    }

    if(data.message) {
        setTimeout(() => { alert(data.message); }, 5)
    }
}

function sprite(tileData) {
    return `-${tileData.sprite[0] * 32}px -${tileData.sprite[1] * 32}px`
}

function handleTileClick(tile) {
    const pos = tile.data("position");
    callServer(`/game/${gameKey}/click/${pos.x}/${pos.y}`, {spinner: false})
    .then(renderBoard).catch(console.error);
}

function startGame() {
    callServer(`/game/${gameKey}/start`).then(renderBoard).catch(console.error);
}