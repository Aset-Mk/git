import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mic, Camera, Send } from 'lucide-react'

export default function InteractiveFeatures({ onCameraToggle }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [review, setReview] = useState('')

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying)
  }

  const submitReview = () => {
    console.log('Отзыв отправлен:', review)
    setReview('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Интерактивные функции</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={toggleAudio} variant={isAudioPlaying ? "secondary" : "outline"} className="flex-1">
            <Mic className="mr-2 h-4 w-4" />
            {isAudioPlaying ? 'Выключить аудиогид' : 'Включить аудиогид'}
          </Button>
          <Button onClick={onCameraToggle} variant="outline" className="flex-1">
            <Camera className="mr-2 h-4 w-4" />
            Камера
          </Button>
        </div>
        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Оставьте свой отзыв..."
          className="min-h-[100px]"
        />
        <Button onClick={submitReview} className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Отправить отзыв
        </Button>
      </CardContent>
    </Card>
  )
}

