'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export default function RouteBuilder({ onRouteChange }) {
  const [transportType, setTransportType] = useState('car')
  const [budget, setBudget] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startPoint, setStartPoint] = useState('')
  const [endPoint, setEndPoint] = useState('')
  const [route, setRoute] = useState(null)

  const handleBuildRoute = async () => {
    try {
      const result = await generateText({
        model: google('gemini-1.5-pro'),
        messages: [
          {
            role: 'user',
            content: `Спланируй маршрут путешествия из ${startPoint} в ${endPoint} с учетом следующих параметров:
            - Бюджет: ${budget} тенге
            - Даты поездки: с ${startDate} по ${endDate}
            - Вид транспорта: ${transportType === 'car' ? 'Автомобиль' : 'Авиа тур'}
            Учти остановки в гостиницах, питание и достопримечательности. Расставь остановки с учетом времени суток.`
          }
        ]
      })

      setRoute(result.text)
      onRouteChange(result.text) // Передаем результат родительскому компоненту
    } catch (error) {
      console.error('Error building route:', error)
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Построить маршрут</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="transport">Тип транспорта</Label>
          <Select value={transportType} onValueChange={setTransportType}>
            <SelectTrigger id="transport">
              <SelectValue placeholder="Выберите тип транспорта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car">На автомобиле</SelectItem>
              <SelectItem value="air">Авиа тур</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Бюджет (тенге)</Label>
          <Input id="budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Дата начала</Label>
            <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">Дата окончания</Label>
            <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startPoint">Точка отправления</Label>
          <Input id="startPoint" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endPoint">Точка назначения</Label>
          <Input id="endPoint" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} />
        </div>
        <Button onClick={handleBuildRoute} className="w-full">Построить маршрут</Button>
        {route && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Ваш маршрут:</h3>
            <p className="text-sm whitespace-pre-wrap">{route}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

