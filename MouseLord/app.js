'use strict';

window.onload = function () {
  let map = document.getElementById('world-map'),
      output = document.getElementById('output'),
      locHighlight =  document.getElementById('loc-highlight'),
      locCords = {};

  map.addEventListener('mousemove', function (event) {
    let coordX = event.clientX,
        coordY = event.clientY,
        mapCords = this.getBoundingClientRect(),
        mapWidth = this.offsetWidth,
        mapHeight = this.offsetHeight,
        relX = recalcLong(coordX - mapCords.left, mapWidth),
        relY = recalcLat(coordY - mapCords.top, mapHeight);

    locCords = getLocationCords(relX, relY);

    locHighlight.style.display = 'block';
    highlightLocation(locCords);
    output.innerText = `Cursor: ${relX} ${relY};
                        Location: ${locCords.locX} ${locCords.locY};`;
  });

  map.addEventListener('mouseleave', function (event) {
    locHighlight.style.display = 'none';
  });

  function recalcLong(coord, size) {
    return Math.round(coord/size*360)-180;
  }
  function recalcLat(coord, size) {
    return Math.round(coord/size*-180)+90;
  }

  function getLocationCords(relX, relY, relWidth, relHeight) {
    relWidth = relWidth || 36;
    relHeight = relHeight || 18;

    let locX = (relX % relWidth) > (relWidth / 2) ?
               (Math.ceil(relX / relWidth) - 0.5 )*relWidth :
               (Math.floor(relX / relWidth) + 0.5 )*relWidth;
    let locY = (relY % relHeight) > (relHeight / 2) ?
               (Math.ceil(relY / relHeight) - 0.5 )*relHeight :
               (Math.floor(relY / relHeight) + 0.5)*relHeight;
    
    if (locX > 180) {
      locX = locX - relWidth;
    }

    if (locY > 90) {
      locY = locY - relHeight;
    }

    return {
      locX: locX,
      locY: locY
    }
  }

  function highlightLocation(locCords) {
    let highlightCords = getHighlightCords(locCords);

    locHighlight.style.top = highlightCords.top + '%';
    locHighlight.style.left = highlightCords.left + '%';
  }

  function getHighlightCords(locCords) {
    let top = Math.floor(((locCords.locY - 81) / -180)*100),
        left = Math.floor(((locCords.locX + 162) / 360)*100);
    
    return {
      top: top,
      left: left
    }
  }
}