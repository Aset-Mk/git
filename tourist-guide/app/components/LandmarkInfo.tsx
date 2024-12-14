import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LandmarkInfo({ landmark, onClose }) {
  return (
    <Card className="absolute top-4 right-4 w-80 shadow-lg">
      <CardHeader className="relative">
        <CardTitle>{landmark.name}</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Image src={landmark.image || '/placeholder.svg'} alt={landmark.name} width={300} height={200} className="w-full h-40 object-cover rounded-md mb-4" />
        <p className="text-sm mb-2">{landmark.description}</p>
        <p className="text-xs text-muted-foreground">{landmark.address}</p>
      </CardContent>
    </Card>
  )
}

