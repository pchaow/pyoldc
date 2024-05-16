import { LatLng } from "leaflet";
import * as React from "react";
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet'

function DraggableMarker({ frm, field, center ,position,setPosition}) {
  const [draggable, setDraggable] = React.useState(true)
  const map = useMap()
  React.useEffect(function () {
    console.log(frm)
    if (frm.get_field(field).get_value()) {
      try {
        let fieldValue = frm.get_field('geojson_position').get_value()
        let pos = JSON.parse(fieldValue)
        setPosition(pos)
        map.setView(new LatLng(pos[0], pos[1]))
      } catch {
        setPosition(center)
      }
    }
  }, [frm, field])

  const markerRef = React.useRef(null)
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
          let latlng = marker.getLatLng()
          frm.set_value(field, JSON.stringify([latlng.lat, latlng.lng]))
        }
      },
    }),
    [],
  )
  const toggleDraggable = React.useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>

    </Marker>
  )
}


export function App({ frm, field }) {

  const [center, setCenter] = React.useState([19.1710, 99.9067])
  const [style, setStyle] = React.useState({ width: '99%', height: '99%' })
  React.useEffect(function () {
    let fieldValue = frm.get_field('geojson_position').get_value()
    console.log('effect', fieldValue)
    if (fieldValue) {
      try {

        let pos = JSON.parse(fieldValue)
        console.log(pos)
        setPosition(pos)
      } catch {
      }
    }


  }, [frm, field])

  const [position, setPosition] = React.useState(center)


  // TODO : สร้างฟังก์ชันสำหรับเปลี่ยน position เป็นตำแหน่งปัจจุบัน

  return (
    <>
      <button onClick={()=>setPosition(center)}>click </button>
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} style={style} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <DraggableMarker frm={frm} field={field} center={center} position={position} setPosition={setPosition}/>
      </MapContainer>
    </>
  );
}