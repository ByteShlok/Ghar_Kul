import { useState } from "react";
import { ShoppingCart, Clock, Plus, Minus, MessageSquare, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTodayMenu } from "@/context/TodayMenuContext";

const menuData = {
  "Daily Staples": [
    { id: 1, name: "Chapati (4 pcs)", price: 40, desc: "Soft wheat flour chapati" },
    { id: 2, name: "Mix Bhaji", price: 60, desc: "Seasonal mixed vegetables" },
    { id: 3, name: "Dal Tadka", price: 70, desc: "Yellow lentils with tempering" },
    { id: 4, name: "Steamed Rice", price: 40, desc: "Plain basmati rice" },
    { id: 5, name: "Chapati + Bhaji Combo", price: 90, desc: "4 chapati with bhaji" },
  ],
  "Bhakri Specials": [
    { id: 6, name: "Jwari Bhakri (2 pcs)", price: 50, desc: "Sorghum flatbread" },
    { id: 7, name: "Bajri Bhakri (2 pcs)", price: 50, desc: "Pearl millet flatbread" },
    { id: 8, name: "Mix Bhakri (2 pcs)", price: 55, desc: "Jwari + Bajri combo" },
    { id: 9, name: "Thecha", price: 30, desc: "Spicy green chili chutney" },
    { id: 10, name: "Bhakri Thali", price: 120, desc: "2 bhakri, bhaji, thecha, buttermilk" },
  ],
  "Special / Bulk": [
    { id: 11, name: "Puran Poli (4 pcs)", price: 160, desc: "Sweet stuffed flatbread" },
    { id: 12, name: "Modak (8 pcs)", price: 200, desc: "Steamed sweet dumplings" },
    { id: 13, name: "Party Thali (10 pax)", price: 1800, desc: "Full meal for 10 people" },
    { id: 14, name: "Custom Catering", price: 0, desc: "Contact us for pricing" },
  ],
};

type OrderStatus = "pending" | "kitchen" | "delivery" | "delivered";

const statusSteps: { key: OrderStatus; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "kitchen", label: "In Kitchen" },
  { key: "delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  instructions: string;
}

export default function CustomerApp() {
  const [isOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Daily Staples");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderStatus] = useState<OrderStatus>("kitchen");
  const [showCart, setShowCart] = useState(false);
  const [instructions, setInstructions] = useState<Record<number, string>>({});
  const { todayMenu } = useTodayMenu();

  const tabs = Object.keys(menuData);

  const getQty = (id: number) => cart.find((c) => c.id === id)?.qty || 0;

  const updateCart = (item: { id: number; name: string; price: number }, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter((c) => c.id !== item.id);
        return prev.map((c) => (c.id === item.id ? { ...c, qty: newQty } : c));
      }
      if (delta > 0) {
        return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, instructions: instructions[item.id] || "" }];
      }
      return prev;
    });
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.qty * c.price, 0);

  const currentStepIndex = statusSteps.findIndex((s) => s.key === orderStatus);

  const renderItemCard = (item: { id: number; name: string; price: number; desc: string }) => {
    const qty = getQty(item.id);
    return (
      <motion.div key={item.id} layout className="wireframe-box p-3.5 bg-card">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-body font-semibold text-sm text-foreground">{item.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
            <p className="text-sm font-bold text-primary mt-1">
              {item.price > 0 ? `₹${item.price}` : "On Request"}
            </p>
          </div>
          {item.price > 0 && (
            <div className="flex items-center gap-2 ml-3">
              {qty > 0 && (
                <>
                  <button onClick={() => updateCart(item, -1)} className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                    <Minus className="w-3.5 h-3.5 text-foreground" />
                  </button>
                  <span className="text-sm font-bold text-foreground w-4 text-center">{qty}</span>
                </>
              )}
              <button onClick={() => updateCart(item, 1)} className="w-7 h-7 rounded-md bg-primary flex items-center justify-center hover:opacity-90 transition-opacity">
                <Plus className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            </div>
          )}
        </div>
        {qty > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-2">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Special instructions..."
                value={instructions[item.id] || ""}
                onChange={(e) => setInstructions({ ...instructions, [item.id]: e.target.value })}
                className="flex-1 text-xs py-1.5 px-2 rounded-md bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-card min-h-screen flex flex-col border-x border-border relative">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-foreground tracking-tight">Ghar-Kul</h1>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isOpen ? "status-open" : "status-closed"}`}>
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
        <button onClick={() => setShowCart(!showCart)} className="relative p-2 rounded-lg bg-secondary hover:bg-muted transition-colors">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      {/* Cart Dropdown */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-2 left-2 z-30 bg-card border border-border rounded-lg shadow-lg p-4"
          >
            <h3 className="font-display text-lg font-bold mb-3 text-foreground">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-sm">Cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">×{item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold text-primary">₹{item.price * item.qty}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-primary/20">
                  <span className="font-display font-bold text-foreground">Total</span>
                  <span className="font-bold text-lg text-primary">₹{totalPrice}</span>
                </div>
                <button className="w-full mt-3 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
                  Place Order
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto">
        {/* Today's Menu Section */}
        {todayMenu.length > 0 && (
          <div className="m-3 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-primary/10 border border-accent/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4 text-accent" />
              <p className="text-xs font-semibold text-accent uppercase tracking-widest">🍽️ Today's Menu</p>
            </div>
            <div className="space-y-2">
              {todayMenu.map((item) => renderItemCard(item))}
            </div>
          </div>
        )}

        {/* Hero / Seasonal Spotlight */}
        <div className="m-3 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-5">
          <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">🍃 Seasonal Spotlight</p>
          <h2 className="font-display text-2xl font-bold text-foreground leading-tight">Puran Poli</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-3">Traditional sweet stuffed flatbread — made fresh daily with pure ghee</p>
          <button className="px-5 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Pre-order Now →
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1 px-3 py-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="px-3 pb-3 space-y-2">
          {menuData[activeTab as keyof typeof menuData].map((item) => renderItemCard(item))}
        </div>
      </div>

      {/* Order Tracking Bar */}
      <div className="border-t border-border bg-card px-4 py-3 sticky bottom-0">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Clock className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">Order Tracking</span>
        </div>
        <div className="flex items-center gap-1">
          {statusSteps.map((step, i) => (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <div className={`h-1.5 w-full rounded-full transition-colors ${i <= currentStepIndex ? "bg-accent" : "bg-muted"}`} />
              <span className={`text-[10px] mt-1 font-medium ${i <= currentStepIndex ? "text-accent" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
