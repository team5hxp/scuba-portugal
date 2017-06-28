const IMAGE_SIZE = 64;
const GRID_DIMENSIONS = 20;

function buyOrSell(inDemand) {
    if (inDemand) {
        return 'Buying';
    }
    return 'Selling';
}

function landImagePath(type) {
    var tiles = {
        0: function () {
            return '../static/PNG/Default size/Tile/medievalTile_57.png';
        },
        1: function () {
            return '../static/PNG/Default size/Tile/medievalTile_48.png';
        },
        2: function () {
            return '../static/PNG/Default size/Tile/medievalTile_47.png';
        },
        3: function () {
            return '../static/PNG/Default size/Tile/medievalTile_46.png';
        }
    };
    return tiles[type]();

}

function structureImagePath(type) {
    var tiles = {
        4: function () {
            return '../static/PNG/Default size/Structure/medievalStructure_20.png';
        },
        5: function () {
            return '../static/PNG/Default size/Structure/medievalStructure_21.png';
        },
        6: function () {
            return '../static/PNG/Default size/Structure/medievalStructure_22.png';
        }
    };
    return tiles[type]();
}

function getRowCount(map_info) {
    return (map_info.match(/\\"",/g) || []).length;
}
function buildMap(map_info) {
    var count = getRowCount(map_info);
    var starting_point = 0;
    var all_images = "";
    for (var j = 0; j < count; j++) {
        var start = map_info.indexOf('\"\\\"', starting_point);
        var end = map_info.indexOf('\\\"\"', start + 1);
        var row = map_info.slice(start + 3, end);
        var images = "";
        for (var i = 0; i < row.length; i++) {
            var cell = row.substr(i, 1);
            var tile = landImagePath(cell);
            var image = '<img src=\"' + tile + '\" width="64px" height="64px"/>';
            images = images + image;
        }
        all_images = all_images + images + '<br/>';
        starting_point = end;
    }
    return all_images;
}
function loadCharacters() {
    var image = '<img src="../static/man3_fr1.png" height="32px" width="32px"/>';
    $('#pc').html(image);
}
function buildTownMap(map_info) {
    var count = getRowCount(map_info);
    var starting_point = 0;
    var all_images = "";
    for (var j = 0; j < count; j++) {
        var start = map_info.indexOf('\"\\\"', starting_point);
        var end = map_info.indexOf('\\\"\"', start + 1);
        var row = map_info.slice(start + 3, end);
        var images = "";
        for (var i = 0; i < row.length; i++) {
            var cell = row.substr(i, 1);
            var image = '<span style="width:64px;height:64px; display: inline-block; vertical-align: top">';
            if (cell != 0) {
                image = image + '<img src=\"' + structureImagePath(cell) + '\" width="64px" height="64px"/>';
            }
            image = image + '</span>';
            images += image;
        }
        all_images = all_images + images + '<br/>';
        starting_point = end;
    }
    return all_images;
}
function loadBaseMap(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.onload = function () {
        var map_info = xhr.responseText;
        var all_images = buildMap(map_info);
        $('#map').html(all_images);
    };
    xhr.onerror = function () {
        $('#update').html('Hmm...I do not understand that request');
    };
    xhr.send();
}
function loadTowns(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.onload = function () {
        var map_info = xhr.responseText;
        var all_images = buildTownMap(map_info);
        $('#map-towns').html(all_images);
    };
    xhr.onerror = function () {
        $('#update').html('Hmm...I do not understand that request');
    };
    xhr.send();
}
function setNewClipPath(top, right, bottom, left) {
    var newClipPath = 'inset(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
    document.querySelector("#map").style.clipPath = newClipPath;
    document.querySelector("#map-towns").style.clipPath = newClipPath;
}
function setNewMarginTop(newMargin) {
    document.querySelector("#map").style.marginTop = (newMargin).toString() + 'px';
    document.querySelector("#map-towns").style.marginTop = (newMargin).toString() + 'px';
}
function setNewMarginLeft(newMargin) {
    document.querySelector("#map").style.marginLeft = (newMargin).toString() + 'px';
    document.querySelector("#map-towns").style.marginLeft = (newMargin).toString() + 'px';
}
function loadMapEdges() {
    var myClipPath = document.querySelector("#map").style.clipPath;
    var map = (myClipPath.slice(myClipPath.indexOf("(") + 1, myClipPath.lastIndexOf("px"))).split("px");
    return map;
}
function checkNewLocation(left, top) {
    var x = (left - 1) / 64 + 3;
    var y = (top - 1) / 64 + 3;
    var locationId = y * GRID_DIMENSIONS + x;
    checkLocation(locationId)
}
function clearLocationInformation() {
    $('#location').html('');
    $('#molybdenum-demand').html('');
    $('#molybdenum-inventory').html('');
    $('#spice-demand').html('');
    $('#spice-inventory').html('');
    $('#obsidian-demand').html('');
    $('#obsidian-inventory').html('');
}
function goingOffTheTop(map) {
    return map[0] > 1;
}
function moveUp() {
    clearLocationInformation();
    var map = loadMapEdges();
    if (map[0] > 1) {

    var top = Number(map[0]) - IMAGE_SIZE;
    var right = Number(map[1]);
    var bottom = Number(map[2]) + IMAGE_SIZE;
    var left = Number(map[3]);
    setNewClipPath(top, right, bottom, left);

    var newMargin = Number((document.querySelector("#map").style.marginTop).slice(0, -2)) + IMAGE_SIZE;
    setNewMarginTop(newMargin);
    checkNewLocation(left, top);
    }
}
function moveDown() {
    clearLocationInformation();
    var map = loadMapEdges();
    var top = Number(map[0]) + IMAGE_SIZE;
    var right = Number(map[1]);
    var bottom = Number(map[2]) - IMAGE_SIZE;
    var left = Number(map[3]);
    setNewClipPath(top, right, bottom, left);

    var newMargin = Number((document.querySelector("#map").style.marginTop).slice(0, -2)) - IMAGE_SIZE;
    setNewMarginTop(newMargin);
    checkNewLocation(left, top);
}
function moveRight() {
    clearLocationInformation();
    var map = loadMapEdges();
    var top = Number(map[0]);
    var right = Number(map[1]) - IMAGE_SIZE;
    var bottom = Number(map[2]);
    var left = Number(map[3]) + IMAGE_SIZE;
    setNewClipPath(top, right, bottom, left);

    var newMargin = Number((document.querySelector("#map").style.marginLeft).slice(0, -2)) - IMAGE_SIZE;
    setNewMarginLeft(newMargin);
    checkNewLocation(left, top);
}
function moveLeft() {
    clearLocationInformation();
    var map = loadMapEdges();
    if (map[3] > 1) {
        var top = Number(map[0]);
        var right = Number(map[1]) + IMAGE_SIZE;
        var bottom = Number(map[2]);
        var left = Number(map[3]) - IMAGE_SIZE;
        setNewClipPath(top, right, bottom, left);

        var newMargin = Number((document.querySelector("#map").style.marginLeft).slice(0, -2)) + IMAGE_SIZE;
        setNewMarginLeft(newMargin);
        checkNewLocation(left, top);
    }
}
function loadMap() {
    loadBaseMap('https://dungeon-imp.herokuapp.com/game/map/');
    loadTowns('https://dungeon-imp.herokuapp.com/game/map/towns/');
    loadCharacters();
}
function populateCityInfo(city) {
    $('#location').html(city.city_name);
    $('#molybdenum-demand').html(buyOrSell(city.demand.molybdenum));
    $('#molybdenum-inventory').html(city.inventory.molybdenum);
    $('#spice-demand').html(buyOrSell(city.demand.spice));
    $('#spice-inventory').html(city.inventory.spice);
    $('#obsidian-demand').html(buyOrSell(city.demand.obsidian));
    $('#obsidian-inventory').html(city.inventory.obsidian);
}
function callDungeonImp(url) {
    $('#update').html('talking to server');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.onload = function () {
        var city_info = xhr.responseText;
        console.log(city_info);
        $('#update').html(city_info);
        var city = JSON.parse(city_info);

        $('#location').html('Unknown');
        if (city.hasOwnProperty('error')) {
            $('#update').html(city.error);
        }
        else {
            populateCityInfo(city);
        }

    };
    xhr.onerror = function () {
        $('#update').html('Hmm...I do not understand that request');
    };
    xhr.send();
}
function checkLocation(location_id) {
    var url = 'https://dungeon-imp.herokuapp.com/game/city/location/' + location_id;
    callDungeonImp(url);

}
function userAction(city_id) {
    if (city_id === '')
        city_id = 0;

    if ($('#movement').val() !== '') {
        city_id = $('#movement').val().toString();
    }
    var url = 'https://dungeon-imp.herokuapp.com/game/city/' + city_id;
    callDungeonImp(url);
}