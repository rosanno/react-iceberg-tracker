import React, { useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet'
import { connect } from 'react-redux'
import { fetchStormData } from '../actions/requestActions'
import storm from '../assets/iceberg.svg'

const iceberg = new Icon({
    iconUrl: storm,
    iconSize: [25, 25]
})

const MapWrapper = ({ eventData, fetchStormData }) => {
    useEffect(() => {
        fetchStormData()
    }, [])
     
    const marker = eventData && eventData.events && eventData.events.map(event => {
        if (event.categories[0].id === 15) {
              console.log(event.geometries[0].coordinates[1], event.geometries[0].coordinates[0])
               return <Marker key={event.id} position={[event.geometries[0].coordinates[1], event.geometries[0].coordinates[0]]} icon={iceberg}>
                   <Popup>
                       {event.categories[0].title}<br/>
                       lat = {event.geometries[0].coordinates[1]}<br/>
                       lon = {event.geometries[0].coordinates[0]}
                   </Popup>
               </Marker>
        }
    })

    return (
       <MapContainer center={[-20.904305, 165.618042]} zoom={13} scrollWheelZoom={true}>
         <TileLayer
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         {marker}
        </MapContainer>
    );
}

const mapStateToProps = (state) => {
    return {
        eventData: state.eventData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStormData: () => dispatch(fetchStormData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
