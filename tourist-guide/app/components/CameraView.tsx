'use client'

import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Camera } from 'lucide-react'

export default function CameraView({ onClose }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [recognizedObject, setRecognizedObject] = useState(null)

  useEffect(() => {
    let stream = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      
      // Here you would typically send the canvas data to an object recognition API
      // For this example, we'll simulate recognition with a timeout
      setTimeout(() => {
        setRecognizedObject('Эйфелева башня')
      }, 1000)
    }
  }

  return (
    <Card className="absolute inset-0 z-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Распознавание объектов</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" width="640" height="480" />
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={captureImage}>
            <Camera className="mr-2 h-4 w-4" />
            Распознать объект
          </Button>
        </div>
        {recognizedObject && (
          <div className="mt-4 text-center">
            <p>Распознанный объект: <strong>{recognizedObject}</strong></p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

