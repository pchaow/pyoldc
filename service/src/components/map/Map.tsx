import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button, Card, CardBody } from '@nextui-org/react';


function DraggableMarker({ position, setPosition, data, onPositionChange }) {
    const [draggable, setDraggable] = React.useState(false);

    const eventHandlers = {
        dragend(event) {
            const marker = event.target;
            const newPosition = marker.getLatLng();
            // console.log('New position:', newPosition);
            setPosition([newPosition.lat, newPosition.lng]);
            onPositionChange([newPosition.lat, newPosition.lng]);
        },

    };

    const buttonStyle = {
        backgroundColor: draggable ? '#EC1B89' : 'gray',
        color: 'white',
    };


    return (
        <Marker
            key={data.personal_number}
            position={position}
            draggable={draggable}
            eventHandlers={eventHandlers}
        >
            <Popup>
                <div>
                    ชื่อ-สกุล: {data.firstname} {data.lastname}
                </div>
                <div>
                    บัตรหมดอายุ: {data.card_expired_date}
                </div>
                <div>
                    ตำแหน่ง: {position[0].toFixed(15)}, {position[1].toFixed(15)}
                </div>
                <div className='flex justify-center items-center mt-5'>
                    <Button className='w-full' onClick={() => setDraggable(!draggable)} style={buttonStyle} size='sm'>
                        {draggable ? 'เปิดการย้ายหมุด' : 'ปิดการย้ายหมุด'}
                    </Button>
                </div>
            </Popup>
        </Marker>
    );
}


function Map(props) {
    const { data, onPositionChange } = props;
    const [position, setPosition] = React.useState([19.1710, 99.9067]);
    const [style, setStyle] = React.useState({ width: '99%', height: 'calc(100vh - 133px)' });
    const [geojsonPosition, setGeojsonPosition] = React.useState(data.geojson_position ? JSON.parse(data.geojson_position) : [19.1710, 99.9067]);

    React.useEffect(() => {
        console.log('Initial position:', geojsonPosition);
    }, [geojsonPosition]);


    return (
        <div>

            <div className="flex justify-center">
                <div className="max-w-[62.5%] w-full">
                    <section className="border-solid border-2 rounded-lg shadow p-8 mb-8 mt-8 bg-white">
                        <p>พิกัด</p>
                        <p>ชื่อสถานที่ หรือ เลขพิกัด</p>
                        <Card className='mt-5 mb-2'>
                            <CardBody>
                                <p>{position[0].toFixed(15)}, {position[1].toFixed(15)} </p>
                            </CardBody>
                        </Card>
                    </section>
                </div>
            </div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={style}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker position={geojsonPosition} setPosition={setGeojsonPosition} onPositionChange={onPositionChange} data={data} />
            </MapContainer>
        </div>
    );
}

export default Map;
