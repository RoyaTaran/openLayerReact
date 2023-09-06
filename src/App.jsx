import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import { defaults as defaultControls } from "ol/control.js";
import Draw from "ol/interaction/Draw.js";
import Icon from "ol/style/Icon";
import "./App.css";
import "ol/ol.css";

function App() {
  const mapElement = useRef();
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
    };
  }, []);

  return (
    <div className="container">
      <div ref={mapElement} className="map-container" />
    </div>
  );
}

export default App;
