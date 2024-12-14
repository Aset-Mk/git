'use client'

import { useState } from 'react'
import Map from './components/Map'
import LandmarkInfo from './components/LandmarkInfo'
import RouteBuilder from './components/RouteBuilder'
import Recommendations from './components/Recommendations'
import InteractiveFeatures from './components/InteractiveFeatures'
import CameraView from './components/CameraView'
import { ThemeProvider } from './components/theme-provider'

export default function TouristGuide() {
  const [selectedLandmark, setSelectedLandmark] = useState(null)
  const [currentRoute, setCurrentRoute] = useState(null)
  const [isCameraActive, setIsCameraActive] = useState(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background text-foreground">
        <div className="w-1/3 p-4 overflow-y-auto border-r border-border">
          <h1 className="text-3xl font-bold mb-6 text-primary">Туристический гид</h1>
          <RouteBuilder onRouteChange={setCurrentRoute} />
          <Recommendations />
          <InteractiveFeatures onCameraToggle={() => setIsCameraActive(!isCameraActive)} />
        </div>
        <div className="w-2/3 relative">
          {isCameraActive ? (
            <CameraView onClose={() => setIsCameraActive(false)} />
          ) : (
            <Map 
              onLandmarkSelect={setSelectedLandmark}
              route={currentRoute}
            />
          )}
          {selectedLandmark && (
            <LandmarkInfo 
              landmark={selectedLandmark}
              onClose={() => setSelectedLandmark(null)}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

