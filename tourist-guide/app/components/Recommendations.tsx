import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Coffee, ShoppingBag, Landmark } from 'lucide-react'

export default function Recommendations() {
  const recommendations = [
    { type: 'restaurant', name: 'Уютное кафе', description: 'Лучшие блюда местной кухни', icon: Coffee },
    { type: 'attraction', name: 'Городской парк', description: 'Идеальное место для отдыха', icon: Landmark },
    { type: 'shop', name: 'Сувенирная лавка', description: 'Уникальные подарки и сувениры', icon: ShoppingBag },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Рекомендации</h2>
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-lg">{rec.name}</CardTitle>
                  <CardDescription>{rec.type}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{rec.description}</p>
                <div className="mt-2">
                  <Badge variant="outline">{rec.type}</Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

