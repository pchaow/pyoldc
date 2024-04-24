import * as L from "leaflet";
import * as React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { FaMapMarker } from "react-icons/fa";
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'
import * as us from 'underscore'


const colorPallet = { 'dimgray': '#696969', 'darkgray': '#a9a9a9', 'lightgray': '#d3d3d3', 'darkslategray': '#2f4f4f', 'darkolivegreen': '#556b2f', 'saddlebrown': '#8b4513', 'olivedrab': '#6b8e23', 'seagreen': '#2e8b57', 'maroon': '#800000', 'midnightblue': '#191970', 'darkgreen': '#006400', 'olive': '#808000', 'darkslateblue': '#483d8b', 'firebrick': '#b22222', 'cadetblue': '#5f9ea0', 'lightslategray': '#778899', 'green': '#008000', 'mediumseagreen': '#3cb371', 'rosybrown': '#bc8f8f', 'rebeccapurple': '#663399', 'teal': '#008080', 'darkgoldenrod': '#b8860b', 'darkkhaki': '#bdb76b', 'steelblue': '#4682b4', 'chocolate': '#d2691e', 'yellowgreen': '#9acd32', 'lightseagreen': '#20b2aa', 'indianred': '#cd5c5c', 'darkblue': '#00008b', 'indigo': '#4b0082', 'limegreen': '#32cd32', 'darkseagreen': '#8fbc8f', 'darkmagenta': '#8b008b', 'maroon3': '#b03060', 'tan': '#d2b48c', 'mediumaquamarine': '#66cdaa', 'darkorchid': '#9932cc', 'orangered': '#ff4500', 'darkorange': '#ff8c00', 'orange': '#ffa500', 'gold': '#ffd700', 'yellow': '#ffff00', 'mediumvioletred': '#c71585', 'mediumblue': '#0000cd', 'turquoise': '#40e0d0', 'chartreuse': '#7fff00', 'lime': '#00ff00', 'darkviolet': '#9400d3', 'mediumorchid': '#ba55d3', 'mediumspringgreen': '#00fa9a', 'springgreen': '#00ff7f', 'royalblue': '#4169e1', 'crimson': '#dc143c', 'aqua': '#00ffff', 'deepskyblue': '#00bfff', 'sandybrown': '#f4a460', 'mediumpurple': '#9370db', 'blue': '#0000ff', 'greenyellow': '#adff2f', 'orchid': '#da70d6', 'thistle': '#d8bfd8', 'lightsteelblue': '#b0c4de', 'coral': '#ff7f50', 'fuchsia': '#ff00ff', 'palevioletred': '#db7093', 'khaki': '#f0e68c', 'salmon': '#fa8072', 'laserlemon': '#ffff54', 'cornflower': '#6495ed', 'plum': '#dda0dd', 'lightgreen': '#90ee90', 'skyblue': '#87ceeb', 'deeppink': '#ff1493', 'mediumslateblue': '#7b68ee', 'lightsalmon': '#ffa07a', 'wheat': '#f5deb3', 'paleturquoise': '#afeeee', 'aquamarine': '#7fffd4', 'hotpink': '#ff69b4', 'pink': '#ffc0cb' }
const colorArrays = ["#6b8e23", "#87ceeb", "#00008b", "#ff69b4", "#bc8f8f", "#008080", "#8b4513", "#3cb371", "#2e8b57", "#00ff7f", "#ff8c00", "#4169e1", "#00ffff", "#adff2f", "#4b0082", "#da70d6", "#66cdaa", "#0000cd", "#ffa500", "#ff1493", "#7fff00", "#5f9ea0", "#cd5c5c", "#32cd32", "#9acd32", "#2f4f4f", "#d2691e", "#c71585", "#8b008b", "#9400d3", "#00fa9a", "#ff4500", "#556b2f", "#dc143c", "#696969", "#a9a9a9", "#ffff54", "#483d8b", "#ffc0cb", "#ffd700", "#b8860b", "#bdb76b", "#00ff00", "#4682b4", "#9370db", "#d8bfd8", "#ff7f50", "#dda0dd", "#b0c4de", "#006400", "#ba55d3", "#8fbc8f", "#b22222", "#b03060", "#90ee90",
  "#800000", "#20b2aa", "#663399", "#d3d3d3", "#0000ff", "#00bfff", "#808000", "#f0e68c", "#191970", "#008000", "#ffff00", "#9932cc", "#40e0d0",
  "#db7093", "#7fffd4", "#afeeee", "#f5deb3", "#7b68ee", "#f4a460", "#d2b48c", "#fa8072", "#778899", "#ffa07a", "#6495ed", "#ff00ff"]
console.log(colorArrays)
function DisabledPeopleMarkers({ people, colorSet, groupType }) {

  const getIcon = function (p) {
    let currentColor = colorArrays[0]

    if (groupType && p.hasOwnProperty(groupType) && colorSet.hasOwnProperty(p[groupType])) {
      currentColor = colorSet[p[groupType]]
    }

    return L.divIcon({
      html: ` <svg
      viewBox="0 0 24 24"
      fill="${currentColor}"
      height="3em"
      width="3em"
      
    >
      <path d="M12 11.5A2.5 2.5 0 019.5 9 2.5 2.5 0 0112 6.5 2.5 2.5 0 0114.5 9a2.5 2.5 0 01-2.5 2.5M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7z" />
    </svg>`,
      className: 'my-div-icon',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]

    })
  }


  return (
    <>
      {people.map((p) => {
        if (p.geojson_position) {
          console.log('map p', p)

          try {
            let position = JSON.parse(p.geojson_position)
            let icon = getIcon(p)
            console.log('icon', icon)
            return (
              <Marker key={p.name} position={position} icon={icon}>
                <Popup closeButton={null}>
                  {p.firstname} {p.lastname}
                </Popup>
              </Marker>
            )
          } catch (e) {
            return (null)
          }
        }
        return (
          null
        )
      })}
    </>
  )
}

function SketchExample({ startColor, onChange }) {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false)
  const _startColor = startColor ?? {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  }
  const [color, setColor] = React.useState(_startColor)

  console.log("sketch", _startColor, startColor)
  handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)

  };

  handleClose = () => {
    setDisplayColorPicker(false)

  };

  handleChange = (color) => {
    console.log(color)
    setColor(color.rgb)
    if (onChange) {
      onChange(color)
    }
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {displayColorPicker ? <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose} />
        <SketchPicker color={color} onChange={handleChange} />
      </div> : null}

    </div>
  )

}



export function App() {
  const [position, setPosition] = React.useState([19.1710, 99.9067])
  const [style, setStyle] = React.useState({ width: '99%', height: 'calc(100vh - 133px)' })
  const wrapper = React.useRef(null)

  const [groupType, setGroupType] = React.useState("disabled_center")

  const [people, setPeople] = React.useState([])
  const loadMakers = function () {
    frappe.call('pyoldc.pyoldc.doctype.disabled_person.disabled_person.disabled_people_map').then(function (r) {
      console.log(r)
      setPeople(r.message)
    })
  }

  React.useEffect(loadMakers, [])

  const [colorSet, setColorSet] = React.useState({})

  React.useEffect(() => {
    let uniqGroup = us.chain(people).filter(x => JSON.parse(x.geojson_position)).pluck(groupType).uniq().value()
    console.log(uniqGroup, 'usef')
    let newColorSet = {}

    uniqGroup.forEach((v, i) => {
      newColorSet[v] = colorArrays[i]
      console.log(i, v, colorArrays[i])
    })
    setColorSet(newColorSet)
    console.log("newcolorset", newColorSet)
  }, [people, groupType])



  function hexToRgbA(hex) {
    console.log('hextorgba', hex)
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: 255 }
    }
    throw new Error('Bad Hex');
  }


  return (
    <div className="">
      <div className="row">
        <div className="col-md-3">
          <div className="frappe-control input-max-width" data-fieldtype="Select" data-fieldname="disabled_type">
            <div className="form-group">
              <div className="clearfix">
                <label className="control-label" style={{ paddingRight: '0px' }}>แบ่งสีตาม</label>
                <span className="help"></span>
              </div>
              <div className="control-input-wrapper">
                <div className="control-input flex align-center">
                  <select onChange={(e) => setGroupType(e.target.value)} value={groupType} type="text" autoComplete="off" className="input-with-feedback form-control ellipsis" maxLength="140" data-fieldtype="Select">
                    <option value="disabled_center">หน่วยงานที่ดูแล</option>
                    <option value="disabled_type">ประเภทความพิการ</option>
                  </select>
                  <div className="select-icon ">
                    <svg className="icon icon-sm" aria-hidden="true">
                      <use className="" href="#icon-select"></use>
                    </svg>
                  </div></div>
                <div className="control-value like-disabled-input" style={{ display: 'none' }}>1. พิการทางการเห็น</div>
                <p className="help-box small text-muted"></p>
              </div>
            </div>
            <span className="tooltip-content">disabled_type</span>
          </div>
        </div>
      </div>

      <div ref={wrapper} className="row">
        <div className="col-md-10">
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={style} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DisabledPeopleMarkers people={people} colorSet={colorSet} groupType={groupType} />
          </MapContainer>
        </div>
        <div className="col-md-2">
          {Object.keys(colorSet).map(g => {
            let startColor = colorSet.hasOwnProperty(g) ? hexToRgbA(colorSet[g]) : null
            return (
              <div className="row" key={g} style={{marginBottom:'1em'}}>
                <div className="col-md-3">
                  <SketchExample startColor={startColor} onChange={(color) => {
                    console.log('onchange', color)
                    setColorSet({
                      ...colorSet,
                      [g]: color.hex
                    })
                  }} />
                </div>
                <div className="col-md-7" style={{textWrap:'wrap'}}>{g}</div>

              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}