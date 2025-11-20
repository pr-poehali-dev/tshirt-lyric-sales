import { useState } from 'react';
import Header from '@/components/Header';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Living on a Prayer',
    artist: 'Bon Jovi',
    lyric: 'Woah, we\'re halfway there...',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/f660f0e7-c1e7-4823-b8b9-4b977f241df0.jpg',
    genre: 'Рок',
  },
  {
    id: 2,
    title: 'Imagine',
    artist: 'John Lennon',
    lyric: 'Imagine all the people...',
    price: 2190,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/f985e9ef-9cdc-4fd7-8dc1-622aa174c9c5.jpg',
    genre: 'Классика',
  },
  {
    id: 3,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    lyric: 'Is this the real life?',
    price: 2490,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/c1cfcc6f-cce0-4838-98a4-3741ca8122f9.jpg',
    genre: 'Рок',
  },
  {
    id: 4,
    title: 'Sweet Dreams',
    artist: 'Eurythmics',
    lyric: 'Sweet dreams are made of this',
    price: 1890,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/f660f0e7-c1e7-4823-b8b9-4b977f241df0.jpg',
    genre: 'Поп',
  },
  {
    id: 5,
    title: 'Hotel California',
    artist: 'Eagles',
    lyric: 'Welcome to the Hotel California',
    price: 2290,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/f985e9ef-9cdc-4fd7-8dc1-622aa174c9c5.jpg',
    genre: 'Рок',
  },
  {
    id: 6,
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    lyric: 'Here we are now, entertain us',
    price: 2390,
    image: 'https://cdn.poehali.dev/projects/7c576c39-a740-400a-ac9e-dc56eb55cd95/files/c1cfcc6f-cce0-4838-98a4-3741ca8122f9.jpg',
    genre: 'Гранж',
  },
];

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const genres = ['Все', 'Рок', 'Поп', 'Классика', 'Гранж'];

  const filteredProducts = products.filter((product) => {
    const matchesGenre = selectedGenre === 'Все' || product.genre === selectedGenre;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.lyric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 animate-pulse"></div>
        <div className="container relative px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Носи то, что слушаешь
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Превратите любимые строчки из песен в стильные футболки. Каждая вещь — это музыка, которая с тобой всегда.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Icon name="Info" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold">Каталог футболок</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Выберите дизайн с вашей любимой строчкой или найдите что-то новое
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию, исполнителю или строчке..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Tabs value={selectedGenre} onValueChange={setSelectedGenre} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto">
              {genres.map((genre) => (
                <TabsTrigger key={genre} value={genre} className="flex-shrink-0">
                  {genre}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <div className="h-24 w-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Icon name="Search" size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} onAddToCart={handleAddToCart} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-card/50">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-5xl font-bold">О нас</h2>
              <p className="text-muted-foreground text-lg">
                LyricWear — это больше чем одежда, это способ выразить себя через музыку
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: 'Music', title: 'Качественная печать', desc: 'Используем современные технологии для яркой и стойкой печати' },
                { icon: 'Shirt', title: 'Премиум материалы', desc: '100% хлопок, приятный к телу и долговечный' },
                { icon: 'Sparkles', title: 'Уникальные дизайны', desc: 'Каждая футболка — это произведение искусства' },
              ].map((item, index) => (
                <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="h-14 w-14 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Icon name={item.icon as any} size={28} className="text-white" />
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 animate-fade-in">
              <p className="text-center text-lg leading-relaxed">
                Мы создали LyricWear, чтобы каждый мог носить свою любимую музыку не только в плеере, 
                но и на себе. Наша миссия — объединить людей через общую любовь к музыке и стилю.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12 animate-slide-up">
              <h2 className="text-3xl md:text-5xl font-bold">Контакты</h2>
              <p className="text-muted-foreground">
                Есть вопросы? Напишите нам, и мы обязательно ответим!
              </p>
            </div>

            <Card className="p-6 md:p-8 animate-fade-in">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input placeholder="Ваше имя" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <textarea
                    placeholder="Расскажите, чем мы можем помочь..."
                    className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background resize-none"
                  />
                </div>
                <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Icon name="Mail" size={20} />
                  <span>info@lyricwear.com</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Icon name="Phone" size={20} />
                  <span>+7 (999) 123-45-67</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-card/30">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 LyricWear. Музыка на тебе. Все права защищены.</p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}