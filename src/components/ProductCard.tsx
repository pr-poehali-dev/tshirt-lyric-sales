import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  title: string;
  artist: string;
  lyric: string;
  price: number;
  image: string;
  genre: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 animate-fade-in">
      <div className="relative h-64 overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="absolute top-3 right-3 bg-secondary/90 backdrop-blur-sm">
          {product.genre}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground">{product.artist}</p>
        <p className="text-sm italic text-foreground/80 line-clamp-2 min-h-[2.5rem]">
          "{product.lyric}"
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {product.price}₽
        </span>
        <Button
          onClick={() => onAddToCart(product)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
