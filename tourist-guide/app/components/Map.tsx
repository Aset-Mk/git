'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map({ onLandmarkSelect, route }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([51.505, -0.09], 13)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)
    }

    // Добавление маркеров достопримечательностей (пример)
    const landmarks = [
      { id: 1, name: 'Эйфелева башня', lat: 48.8584, lon: 2.2945 },
      { id: 2, name: 'Колизей', lat: 41.8902, lon: 12.4922 },
    ]

    landmarks.forEach(landmark => {
      L.marker([landmark.lat, landmark.lon])
        .addTo(mapRef.current)
        .on('click', () => onLandmarkSelect(landmark))
    })

    // Отрисовка маршрута
    if (route) {
      L.polyline(route.coordinates, { color: 'blue' }).addTo(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onLandmarkSelect, route])

  return <div id="map" className="w-full h-full" />
}

