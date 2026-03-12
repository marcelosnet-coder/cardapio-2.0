import React, { useState, useEffect } from 'react';
import { PIZZARIA_CONFIG, MENU_PIZZAS, MENU_COMBOS, MENU_BEVERAGES } from './constants';
import { Product, OrderItem, CustomerData, OrderHistory } from './types';

// Componente de Cartão de Produto simplificado para a lista única
const ProductCard: React.FC<{ 
  product: Product; 
  onSelect: (p: Product) => void 
}> = ({ product, onSelect }) => (
  <div 
    onClick={() => onSelect(product)}
    className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-zinc-800 transition-transform active:scale-95 cursor-pointer flex flex-col"
  >
    <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" />
    <div className="p-4 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-orange-500 uppercase tracking-tight">{product.name}</h3>
        {product.ingredients && <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{product.ingredients}</p>}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-yellow-400">R$ {product.price.toFixed(2).replace('.', ',')}</span>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
          Adicionar
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [view, setView] = useState<'menu' | 'selection' | 'checkout'>('menu');
  const [flavorMode, setFlavorMode] = useState<1 | 2>(1);
  const [selectedFlavors, setSelectedFlavors] = useState<Product[]>([]);
  const [observations, setObservations] = useState('');
  const [customer, setCustomer] = useState<CustomerData>({ name: '', phone: '', address: '', paymentMethod: '' });
  const [lastOrder, setLastOrder] = useState<OrderHistory | null>(null);

  // Carrega histórico do localStorage
  useEffect(() => {
    const history = localStorage.getItem('marys_pizzaria_history');
    if (history) {
      setLastOrder(JSON.parse(history));
    }
  }, []);

  const addToCart = (product: Product) => {
    if (product.category !== 'PIZZA') {
       const newItem: OrderItem = {
         id: Math.random().toString(36).substr(2, 9),
         product1: product,
         quantity: 1,
         observations: '',
         totalPrice: product.price
       };
       setCart([...cart, newItem]);
    } else {
       setFlavorMode(1);
       setSelectedFlavors([product]);
       setObservations('');
       setView('selection');
    }
  };

  const finalizeFlavorSelection = () => {
    if (selectedFlavors.length === 0) return;
    
    const price = flavorMode === 1 
      ? selectedFlavors[0].price 
      : Math.max(selectedFlavors[0].price, selectedFlavors[1]?.price || 0);

    const newItem: OrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      product1: selectedFlavors[0],
      product2: flavorMode === 2 ? selectedFlavors[1] : undefined,
      quantity: 1,
      observations: observations,
      totalPrice: price
    };

    setCart([...cart, newItem]);
    setView('menu');
    setSelectedFlavors([]);
    setObservations('');
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalCart = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSendOrder = () => {
    if (!customer.name || !customer.address || !customer.phone || !customer.paymentMethod) {
      alert("Por favor, preencha todos os campos do checkout, incluindo a forma de pagamento!");
      return;
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000).toString();
    const orderDate = new Date().toLocaleString('pt-BR');

    let message = `*Már's Pizzaria - Pedido #${orderNumber}*\n\n`;
    message += `👤 *Cliente:* ${customer.name}\n`;
    message += `📞 *Telefone:* ${customer.phone}\n`;
    message += `📍 *Endereço:* ${customer.address}\n`;
    message += `💳 *Pagamento:* ${customer.paymentMethod}${customer.paymentMethod === 'Dinheiro' && customer.changeFor ? ` (Troco para R$ ${customer.changeFor})` : ''}\n\n`;
    message += `🍕 *Itens:* \n`;

    cart.forEach((item, index) => {
      if (item.product2) {
        message += `${index + 1}. Meio ${item.product1.name} / Meio ${item.product2.name}`;
      } else {
        message += `${index + 1}. ${item.product1.name}`;
      }
      message += ` - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
      if (item.observations) message += `   _Obs: ${item.observations}_\n`;
    });

    message += `\n💰 *Total:* R$ ${totalCart.toFixed(2).replace('.', ',')}\n\n`;
    message += `Obrigado pela preferência!`;

    const history: OrderHistory = {
      orderNumber,
      items: cart,
      customer,
      date: orderDate
    };
    localStorage.setItem('marys_pizzaria_history', JSON.stringify(history));

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PIZZARIA_CONFIG.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const repeatLastOrder = () => {
    if (lastOrder) {
      setCart(lastOrder.items);
      setCustomer(lastOrder.customer);
      setView('menu');
    }
  };

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto relative bg-[#0f0f0f]">
      {/* Header com logo centralizado conforme solicitado */}
      <header className="pt-10 pb-6 px-6 text-center">
        <div className="mb-4">
           <img 
             src={PIZZARIA_CONFIG.logoUrl} 
             alt="Mary's Pizzaria Logo" 
             className="w-48 h-48 object-contain mx-auto bg-black rounded-full p-1 shadow-2xl"
           />
        </div>
        <p className="text-yellow-500 text-[10px] font-bold tracking-widest uppercase mb-1">
          {PIZZARIA_CONFIG.address}
        </p>
        <p className="text-zinc-400 text-lg font-bold">
          {PIZZARIA_CONFIG.phone}
        </p>
      </header>

      {/* Banner de Hero */}
      {view === 'menu' && (
        <div className="px-6 mb-8">
          <div className="relative rounded-2xl overflow-hidden h-48 shadow-2xl border border-zinc-800">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Pizza Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-6">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Peça Online Agora</h2>
            </div>
          </div>
        </div>
      )}

      {/* Repetir Pedido */}
      {lastOrder && view === 'menu' && cart.length === 0 && (
        <div className="mx-6 mb-6 p-4 bg-orange-600/10 border border-orange-600/30 rounded-xl flex items-center justify-between">
          <span className="text-xs text-orange-200">Deseja repetir o último pedido?</span>
          <button 
            onClick={repeatLastOrder}
            className="bg-orange-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase"
          >
            Repetir
          </button>
        </div>
      )}

      <main className="px-6">
        {view === 'menu' && (
          <div className="space-y-10">
            {/* Seções em lista única */}
            <section>
              <h2 className="text-lg font-black mb-4 border-l-4 border-orange-600 pl-3 uppercase italic">Pizzas</h2>
              <div className="grid grid-cols-1 gap-6">
                {MENU_PIZZAS.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={addToCart} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black mb-4 border-l-4 border-yellow-500 pl-3 uppercase italic">Combos</h2>
              <div className="grid grid-cols-1 gap-6">
                {MENU_COMBOS.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={addToCart} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black mb-4 border-l-4 border-white pl-3 uppercase italic">Bebidas</h2>
              <div className="grid grid-cols-1 gap-6">
                {MENU_BEVERAGES.map(p => (
                  <ProductCard key={p.id} product={p} onSelect={addToCart} />
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'selection' && (
          <div className="fixed inset-0 z-50 bg-[#0f0f0f] p-6 overflow-y-auto">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-2xl font-black text-orange-500 uppercase italic">Personalizar</h2>
               <button onClick={() => setView('menu')} className="text-zinc-500 font-bold">Voltar</button>
             </div>

             <div className="flex bg-zinc-900 p-1 rounded-xl mb-8">
               <button 
                 onClick={() => { setFlavorMode(1); setSelectedFlavors(prev => prev.slice(0, 1)); }}
                 className={`flex-1 py-3 rounded-lg font-black text-[10px] uppercase transition-all ${flavorMode === 1 ? 'bg-orange-600 text-white' : 'text-zinc-500'}`}
               >
                 1 Sabor
               </button>
               <button 
                 onClick={() => setFlavorMode(2)}
                 className={`flex-1 py-3 rounded-lg font-black text-[10px] uppercase transition-all ${flavorMode === 2 ? 'bg-orange-600 text-white' : 'text-zinc-500'}`}
               >
                 2 Sabores
               </button>
             </div>

             <div className="relative w-64 h-64 mx-auto mb-10">
                <div className="absolute inset-0 border-8 border-orange-950 rounded-full"></div>
                {flavorMode === 1 ? (
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {selectedFlavors[0] ? (
                      <img src={selectedFlavors[0].imageUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-[10px] p-8 text-center uppercase font-black">Escolha o sabor</div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full rounded-full overflow-hidden flex">
                    <div className="w-1/2 h-full border-r-2 border-orange-950">
                      {selectedFlavors[0] ? (
                        <img src={selectedFlavors[0].imageUrl} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[8px] p-2 text-center text-zinc-600 uppercase font-black">Sabor 1</div>
                      )}
                    </div>
                    <div className="w-1/2 h-full">
                      {selectedFlavors[1] ? (
                        <img src={selectedFlavors[1].imageUrl} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[8px] p-2 text-center text-zinc-600 uppercase font-black">Sabor 2</div>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedFlavors.length > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <button 
                      onClick={() => setSelectedFlavors([])}
                      className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-[#0f0f0f] font-bold"
                    >
                      ✕
                    </button>
                  </div>
                )}
             </div>

             {selectedFlavors.length > 0 && (
                <div className="text-center mb-6">
                   <div className="inline-block px-4 py-2 bg-yellow-500 text-black font-black text-lg rounded-full">
                      R$ {(flavorMode === 1 
                        ? selectedFlavors[0].price 
                        : Math.max(selectedFlavors[0].price, selectedFlavors[1]?.price || 0)
                      ).toFixed(2).replace('.', ',')}
                   </div>
                </div>
             )}

             <div className="space-y-4 mb-32">
               <h3 className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Opções:</h3>
               <div className="grid grid-cols-1 gap-3">
                 {MENU_PIZZAS.map(p => {
                   const isSelected = selectedFlavors.find(f => f.id === p.id);
                   const isFull = flavorMode === 1 ? selectedFlavors.length >= 1 : selectedFlavors.length >= 2;

                   return (
                    <button
                      key={p.id}
                      disabled={isFull && !isSelected}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedFlavors(prev => prev.filter(f => f.id !== p.id));
                        } else {
                          setSelectedFlavors(prev => [...prev, p]);
                        }
                      }}
                      className={`flex items-center p-3 rounded-xl border transition-all ${
                        isSelected 
                        ? 'bg-orange-600/20 border-orange-600' 
                        : (isFull && !isSelected) ? 'opacity-30 border-zinc-900' : 'bg-zinc-900 border-zinc-800'
                      }`}
                    >
                      <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover mr-4" />
                      <div className="text-left flex-1">
                        <div className="font-black text-xs uppercase tracking-tight">{p.name}</div>
                        <div className="text-[10px] text-zinc-500">R$ {p.price.toFixed(2).replace('.', ',')}</div>
                      </div>
                      {isSelected && <span className="text-orange-500 font-bold">✓</span>}
                    </button>
                   );
                 })}
               </div>
             </div>

             <div className="fixed bottom-0 left-0 right-0 p-6 bg-black">
               <div className="max-w-md mx-auto space-y-4">
                 <textarea 
                    placeholder="Observações (ex: Sem cebola...)"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-orange-600"
                    rows={2}
                 />
                 <button 
                   disabled={(flavorMode === 1 && selectedFlavors.length === 0) || (flavorMode === 2 && selectedFlavors.length < 2)}
                   onClick={finalizeFlavorSelection}
                   className="w-full bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-black py-4 rounded-xl uppercase tracking-widest text-xs"
                 >
                   Confirmar Pizza
                 </button>
               </div>
             </div>
          </div>
        )}

        {view === 'checkout' && (
          <div className="space-y-10 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-black text-orange-500 uppercase italic">Checkout</h2>
               <button onClick={() => setView('menu')} className="text-zinc-500 font-bold">Voltar</button>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-zinc-500 font-black uppercase text-[10px] tracking-widest mb-4">Seu Pedido</h3>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start border-b border-zinc-800 pb-3">
                    <div className="flex-1 pr-4">
                      <div className="font-black text-white uppercase text-xs">
                        {item.product2 ? `Meio ${item.product1.name} / Meio ${item.product2.name}` : item.product1.name}
                      </div>
                      {item.observations && <div className="text-[10px] text-zinc-500 mt-1 italic">Obs: {item.observations}</div>}
                    </div>
                    <div className="text-yellow-400 font-black text-sm pr-4">R$ {item.totalPrice.toFixed(2).replace('.', ',')}</div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-bold">✕</button>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-xl font-black text-orange-500 uppercase tracking-tight italic">
                  <span>Total</span>
                  <span>R$ {totalCart.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Entrega:</h3>
               <input 
                 type="text" 
                 placeholder="Nome Completo" 
                 value={customer.name}
                 onChange={(e) => setCustomer({...customer, name: e.target.value})}
                 className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-orange-600"
               />
               <input 
                 type="tel" 
                 placeholder="Telefone" 
                 value={customer.phone}
                 onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                 className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-orange-600"
               />
               <textarea 
                 placeholder="Endereço de Entrega" 
                 value={customer.address}
                 onChange={(e) => setCustomer({...customer, address: e.target.value})}
                 className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-orange-600"
                 rows={3}
               />

               <div className="space-y-4">
                  <h3 className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Forma de Pagamento:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Dinheiro', 'Pix', 'Cartão de Crédito', 'Cartão de Débito'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setCustomer({ ...customer, paymentMethod: method })}
                        className={`p-3 rounded-xl border text-[10px] font-black uppercase transition-all flex items-center justify-center space-x-2 ${
                          customer.paymentMethod === method
                            ? 'bg-orange-600 border-orange-600 text-white'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <span>{method}</span>
                      </button>
                    ))}
                  </div>

                  {customer.paymentMethod === 'Dinheiro' && (
                    <div className="animate-in fade-in slide-in-from-top duration-300">
                      <input 
                        type="text" 
                        placeholder="Troco para quanto? (Ex: 50,00)" 
                        value={customer.changeFor || ''}
                        onChange={(e) => setCustomer({...customer, changeFor: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 focus:outline-none focus:ring-1 focus:ring-orange-600 text-sm"
                      />
                    </div>
                  )}
               </div>
            </div>

            <button 
              onClick={handleSendOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg flex items-center justify-center space-x-3 uppercase tracking-widest text-xs"
            >
              <span>Finalizar no WhatsApp</span>
            </button>
          </div>
        )}
      </main>

      {/* Carrinho Flutuante */}
      {view === 'menu' && cart.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6 z-40 max-w-md mx-auto">
          <button 
            onClick={() => setView('checkout')}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom duration-500"
          >
            <div className="flex items-center">
              <span className="bg-white text-orange-600 font-black w-7 h-7 flex items-center justify-center rounded-lg mr-3 text-xs">{cart.length}</span>
              <span className="font-black tracking-widest uppercase text-[10px]">Ver Carrinho</span>
            </div>
            <span className="text-lg font-black italic">R$ {totalCart.toFixed(2).replace('.', ',')}</span>
          </button>
        </div>
      )}
    </div>
  );
}
