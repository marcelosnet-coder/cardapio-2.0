
import { Product } from './types';

export const PIZZARIA_CONFIG = {
  name: "Mary's Pizzaria",
  phone: "81 9 91851200",
  whatsapp: "5581991851200",
  address: "Rua dr. Sebastião Amaral, 1203 Pau Amarelo",
  logoUrl: "https://i.imgur.com/Ep39n0O.png", 
  colors: {
    orange: "#f97316",
    yellow: "#facc15",
    black: "#000000"
  }
};

export const MENU_PIZZAS: Product[] = [
  { id: 'p1', name: 'Mussarela', price: 25.00, ingredients: 'Molho de tomate, mussarela e orégano', imageUrl: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p2', name: 'Calabresa', price: 25.00, ingredients: 'Molho de tomate, mussarela, calabresa e cebola', imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p3', name: 'Mussarela com Catupiry', price: 28.00, ingredients: 'Mussarela coberta com catupiry cremoso', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p5', name: 'Presunto', price: 29.90, ingredients: 'Mussarela, presunto em fatias e azeitonas', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p6', name: 'Frango com Queijo', price: 29.90, ingredients: 'Frango desfiado temperado com queijo mussarela', imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p7', name: 'Frango com Queijo e Catupiry', price: 34.90, ingredients: 'Frango desfiado, mussarela e catupiry legítimo', imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.r28VkByI6pptGw3LWfJKHgHaHa?w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3', category: 'PIZZA' },
  { id: 'p8', name: 'Bacon', price: 34.90, ingredients: 'Mussarela e generosas fatias de bacon crocante', imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p9', name: 'Portuguesa', price: 34.90, ingredients: 'Mussarela, presunto, ovos, cebola, pimentão e ervilha', imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
  { id: 'p10', name: 'Cartola', price: 25.00, ingredients: 'Banana, açúcar, canela e queijo manteiga', imageUrl: 'https://tse4.mm.bing.net/th/id/OIP._ai5e6EY179pGhqR0VeNXgHaGO?rs=1&pid=ImgDetMain&o=7&rm=3', category: 'PIZZA' },
  { id: 'p11', name: 'Romeu e Julieta', price: 29.90, ingredients: 'Queijo mussarela com goiabada cremosa', imageUrl: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&q=80&w=400', category: 'PIZZA' },
];

export const MENU_COMBOS: Product[] = [
  { id: 'c1', name: '2 Pizzas + Batata + Kuat 2L', price: 69.90, ingredients: 'Combo Família', imageUrl: 'https://i.imgur.com/2Jb1wed.png', category: 'COMBO' },
  { id: 'c2', name: '1 Pizza + Batata + Guaraná 1L', price: 39.90, ingredients: 'Combo Individual/Casal', imageUrl: 'https://i.imgur.com/RyTGsd1.png', category: 'COMBO' },
];

export const MENU_BEVERAGES: Product[] = [
  { id: 'b1', name: 'Coca-Cola 1.5L', price: 15.00, imageUrl: 'https://th.bing.com/th/id/R.abcacbc0f4d45e41b8784c0cb64bf741?rik=QamqibZRQ0U4Ew&riu=http%3a%2f%2fcompraenavi.com%2fweb%2fimage%2fproduct.template%2f1484%2fimage&ehk=ygnh92hnrODRhsJWWGi1pIGJMHVbmeYBn75mCgkWFws%3d&risl=&pid=ImgRaw&r=0', category: 'BEVERAGE' },
  { id: 'b2', name: 'Guaraná Antarctica 1L', price: 8.00, imageUrl: 'https://m.magazineluiza.com.br/a-static/420x420/refrigerante-guarana-original-antarctica-1-litro/mercadinhodotiao/5f22f40c361611ee87d54201ac18502e/e97fde1e92d175dd01c2c4b41342a240.jpeg', category: 'BEVERAGE' },
  { id: 'b3', name: 'Kuat 2L', price: 12.00, imageUrl: 'https://th.bing.com/th/id/OIP.GYVrMTBKGQu4hlzSIHwOMQHaHa?w=196&h=196&c=7&r=0&o=7&pid=1.7&rm=3', category: 'BEVERAGE' },
];
