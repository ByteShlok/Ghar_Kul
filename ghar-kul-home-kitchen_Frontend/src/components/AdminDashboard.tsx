import { useState } from "react";
import { Package, ChevronDown, Phone, ToggleLeft, ToggleRight, Users, TrendingUp, AlertCircle, CalendarDays, Plus, X, Trash2 } from "lucide-react";
import { useTodayMenu } from "@/context/TodayMenuContext";

const allMenuItems = [
  { id: 1, name: "Chapati (4 pcs)", price: 40, desc: "Soft wheat flour chapati", category: "Daily Staples" },
  { id: 2, name: "Mix Bhaji", price: 60, desc: "Seasonal mixed vegetables", category: "Daily Staples" },
  { id: 3, name: "Dal Tadka", price: 70, desc: "Yellow lentils with tempering", category: "Daily Staples" },
  { id: 4, name: "Steamed Rice", price: 40, desc: "Plain basmati rice", category: "Daily Staples" },
  { id: 5, name: "Chapati + Bhaji Combo", price: 90, desc: "4 chapati with bhaji", category: "Daily Staples" },
  { id: 6, name: "Jwari Bhakri (2 pcs)", price: 50, desc: "Sorghum flatbread", category: "Bhakri Specials" },
  { id: 7, name: "Bajri Bhakri (2 pcs)", price: 50, desc: "Pearl millet flatbread", category: "Bhakri Specials" },
  { id: 8, name: "Mix Bhakri (2 pcs)", price: 55, desc: "Jwari + Bajri combo", category: "Bhakri Specials" },
  { id: 9, name: "Thecha", price: 30, desc: "Spicy green chili chutney", category: "Bhakri Specials" },
  { id: 10, name: "Bhakri Thali", price: 120, desc: "2 bhakri, bhaji, thecha, buttermilk", category: "Bhakri Specials" },
  { id: 11, name: "Puran Poli (4 pcs)", price: 160, desc: "Sweet stuffed flatbread", category: "Special" },
  { id: 12, name: "Modak (8 pcs)", price: 200, desc: "Steamed sweet dumplings", category: "Special" },
];

const initialOrders = [
  { id: "ORD-1024", customer: "Meera Patil", items: ["Chapati x4", "Mix Bhaji", "Dal Tadka"], status: "pending" as const, time: "12:15 PM" },
  { id: "ORD-1025", customer: "Rajesh Kulkarni", items: ["Bhakri Thali", "Thecha"], status: "kitchen" as const, time: "12:22 PM" },
  { id: "ORD-1026", customer: "Sneha Deshmukh", items: ["Puran Poli x8", "Modak x16"], status: "kitchen" as const, time: "12:30 PM" },
  { id: "ORD-1027", customer: "Amit Joshi", items: ["Chapati + Bhaji Combo x3"], status: "delivery" as const, time: "11:50 AM" },
  { id: "ORD-1028", customer: "Priya Sawant", items: ["Jwari Bhakri x4", "Mix Bhaji x2"], status: "pending" as const, time: "12:35 PM" },
  { id: "ORD-1029", customer: "Vikram Shinde", items: ["Party Thali (10 pax)"], status: "pending" as const, time: "12:40 PM" },
];

const menuItems = [
  { id: 1, name: "Chapati (4 pcs)", inStock: true },
  { id: 2, name: "Mix Bhaji", inStock: true },
  { id: 3, name: "Dal Tadka", inStock: true },
  { id: 4, name: "Steamed Rice", inStock: false },
  { id: 5, name: "Jwari Bhakri (2 pcs)", inStock: true },
  { id: 6, name: "Bajri Bhakri (2 pcs)", inStock: true },
  { id: 7, name: "Thecha", inStock: true },
  { id: 8, name: "Puran Poli (4 pcs)", inStock: true },
  { id: 9, name: "Modak (8 pcs)", inStock: false },
  { id: 10, name: "Bhakri Thali", inStock: true },
];

const specialOrders = [
  { id: "SPL-01", customer: "Anita Desai", phone: "+91 98765 43210", request: "50 Puran Poli for Ganesh Chaturthi — delivery by 10 AM", date: "Sep 18" },
  { id: "SPL-02", customer: "Hotel Sahyadri", phone: "+91 91234 56789", request: "Daily tiffin for 25 staff — lunch only, Mon-Sat", date: "Ongoing" },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  kitchen: "bg-blue-100 text-blue-700 border-blue-200",
  delivery: "bg-accent/15 text-accent border-accent/30",
  delivered: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  kitchen: "In Kitchen",
  delivery: "Out for Delivery",
  delivered: "Delivered",
};

const allStatuses = ["pending", "kitchen", "delivery", "delivered"];

export default function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const [inventory, setInventory] = useState(menuItems);
  const [showMenuPicker, setShowMenuPicker] = useState(false);
  const { todayMenu, addToTodayMenu, removeFromTodayMenu, clearTodayMenu } = useTodayMenu();

  const toggleStock = (id: number) => {
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item)));
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)));
  };

  const totalOrders = orders.length;
  const totalRevenue = 2840;

  const availableToAdd = allMenuItems.filter((item) => !todayMenu.find((t) => t.id === item.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">Ghar-Kul</h1>
          <p className="text-xs text-muted-foreground font-medium">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="status-open text-xs font-semibold px-3 py-1 rounded-full">● Open</span>
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">GK</div>
        </div>
      </header>

      <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Daily Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="wireframe-box bg-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Today's Orders</p>
                <p className="text-3xl font-display font-bold text-foreground">{totalOrders}</p>
              </div>
            </div>
            <div className="wireframe-box bg-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Revenue</p>
                <p className="text-3xl font-display font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Today's Menu Builder */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-primary" /> Today's Menu
              </h2>
              <div className="flex items-center gap-2">
                {todayMenu.length > 0 && (
                  <button
                    onClick={clearTodayMenu}
                    className="flex items-center gap-1 text-xs font-semibold text-destructive hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowMenuPicker(!showMenuPicker)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Items
                </button>
              </div>
            </div>

            {/* Menu Picker Dropdown */}
            {showMenuPicker && (
              <div className="wireframe-box bg-card p-4 mb-3">
                <p className="text-xs text-muted-foreground font-medium mb-2 uppercase tracking-wide">Select items to add</p>
                {availableToAdd.length === 0 ? (
                  <p className="text-sm text-muted-foreground">All items have been added.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableToAdd.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addToTodayMenu(item)}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-secondary hover:bg-muted transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-primary">₹{item.price}</span>
                          <Plus className="w-4 h-4 text-accent" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Today's Menu List */}
            {todayMenu.length === 0 ? (
              <div className="wireframe-box bg-card p-8 flex flex-col items-center justify-center text-center">
                <CalendarDays className="w-10 h-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-muted-foreground">No menu set for today</p>
                <p className="text-xs text-muted-foreground mt-1">Click "Add Items" to build today's menu</p>
              </div>
            ) : (
              <div className="wireframe-box bg-card divide-y divide-border">
                {todayMenu.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary">₹{item.price}</span>
                      <button
                        onClick={() => removeFromTodayMenu(item.id)}
                        className="w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Queue */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> Order Queue
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orders.map((order) => (
                <div key={order.id} className="wireframe-box bg-card p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                      <p className="font-semibold text-foreground text-sm">{order.customer}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                  <ul className="text-xs text-muted-foreground mb-3 space-y-0.5">
                    {order.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`w-full appearance-none text-xs font-semibold px-3 py-2 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 ${statusColors[order.status]}`}
                    >
                      {allStatuses.map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Menu Inventory Toggle */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" /> Menu Availability
            </h2>
            <div className="wireframe-box bg-card divide-y divide-border">
              {inventory.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3">
                  <span className={`text-sm font-medium ${item.inStock ? "text-foreground" : "text-muted-foreground line-through"}`}>
                    {item.name}
                  </span>
                  <button onClick={() => toggleStock(item.id)} className="flex items-center gap-1.5 text-xs font-semibold">
                    {item.inStock ? (
                      <>
                        <ToggleRight className="w-6 h-6 text-accent" />
                        <span className="text-accent">In Stock</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                        <span className="text-muted-foreground">Sold Out</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Special Orders Panel */}
          <div>
            <h2 className="font-display text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Special / Bulk Orders
            </h2>
            <div className="space-y-3">
              {specialOrders.map((order) => (
                <div key={order.id} className="wireframe-box bg-card p-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm text-foreground">{order.customer}</p>
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{order.request}</p>
                  <a
                    href={`tel:${order.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {order.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
