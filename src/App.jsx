import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { defaults as defaultControls } from "ol/control.js";
import { Overlay } from "ol";
import Draw from "ol/interaction/Draw.js";
import Icon from "ol/style/Icon";
import "./App.css";
import "ol/ol.css";

function App() {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const popupElement = useRef();

  const overlay = new Overlay({
    element: popupElement.current,
  });

  const osmLayer = new TileLayer({
    preload: Infinity,
    source: new OSM(),
  });

  const vectorSource = new VectorSource({});

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new Icon({
        anchor: [0.5, 32],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "markerr.png",
      }),
    }),
  });

  useEffect(function () {
    return function () {
      const initialMap = new Map({
        controls: defaultControls({ attribution: false, zoom: false }),
        target: mapElement.current,
        layers: [osmLayer, vectorLayer],
        overlays: [overlay],
        view: new View({
          projection: "EPSG:4326",
          center: [48.49597353548832, 36.67851410709572],
          zoom: 12,
        }),
      });
      const draw = new Draw({
        source: vectorSource,
        type: "Point",
      });
      initialMap.addInteraction(draw);
      setMap(initialMap);
    };
  }, []);

  return (
    <div className="container">
      <div>
        {" "}
        <div ref={mapElement} className="map-container" />
        <div ref={popupElement} id="popup">
          <div id="popup-content"></div>
        </div>
      </div>

      <div dir="rtl" className="input-container">
        <input id="title" type="text" placeholder="عنوان" />
        <input id="description" type="text" placeholder="توضیحات" />
        <input id="entry" type="button" value="ثبت" />
        <input id="show" type="button" value="نمایش" />
      </div>
    </div>
  );
}

export default App;
