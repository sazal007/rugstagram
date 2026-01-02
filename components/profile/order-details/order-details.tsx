import Image from 'next/image';
import { 
  MapPin, 
  Check, 
  Package, 
  Truck, 
  Home, 
  MessageSquare, 
  Info, 
  X, 
  CheckCircle2, 
  HelpCircle,
} from 'lucide-react';
import { MyOrder, OrderItem as OrderItemType } from "@/types/my-order";

const ShippingAddress = ({ order }: { order: MyOrder }) => {
  return (
    <div className="bg-card text-card-foreground rounded-2xl p-5 shadow-sm border border-border flex flex-col hover:border-accent/30 transition-colors">
      <div className="flex items-center gap-2 mb-3 text-muted">
        <MapPin className="w-5 h-5" />
        <h3 className="text-xs font-bold uppercase tracking-wide">Shipping Address</h3>
      </div>
      <div>
        <p className="font-bold text-lg mb-1">{order.full_name}</p>
        <p className="text-muted text-sm leading-relaxed">
          {order.shipping_address}<br/>
          {order.city}, {order.state}, {order.zip_code}<br/>
          {order.phone_number}
        </p>
      </div>
    </div>
  );
};

const TimelineStep = ({ Icon, label, date, isCompleted, isLast }: { Icon: React.ElementType; label: string; date?: string; isCompleted?: boolean; isLast?: boolean }) => {
  return (
    <div className={`flex md:flex-col items-center ${isLast ? 'md:items-end' : isLast === undefined ? 'md:items-center' : 'md:items-start'} gap-3 flex-1`}>
      <div className={`size-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300 ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted'} ${isLast ? 'ring-2 ring-primary/10' : ''} z-20`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className={`md:text-center md:w-full ${isLast ? 'md:-mr-5 lg:-mr-8' : ''} ${!isLast && label === 'Placed' ? 'md:-ml-5 lg:-ml-8' : ''}`}>
        <p className={`font-bold text-xs ${isLast ? 'text-accent' : 'text-foreground'}`}>{label}</p>
        {date && <p className="text-muted text-[10px]">{date}</p>}
      </div>
    </div>
  );
};

const OrderItem = ({ item }: { item: OrderItemType }) => {
  const details = [
    item.size && `Size: ${item.size}`,
    item.color && `Color: ${item.color}`,
  ].filter(Boolean).join(" • ");

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-border last:border-0 last:pb-0 group">
      <div className="w-full sm:w-20 h-20 rounded-xl bg-background overflow-hidden shrink-0 border border-border relative">
        <Image
          src={item.product_thumbnail_image || "/placeholder.jpg"} 
          alt={item.product_name} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h4 className="font-bold text-foreground text-sm">{item.product_name}</h4>
            <p className="text-muted text-xs mt-0.5">{details}</p>
          </div>
          <p className="font-bold text-foreground text-sm">${item.total_price}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3">
          <p className="text-xs font-medium text-foreground bg-secondary px-2.5 py-0.5 rounded-full border border-border">
            Qty: {item.quantity}
          </p>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none py-1.5 px-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs font-semibold flex items-center justify-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Review
            </button>
            <button className="text-muted hover:text-accent text-xs font-semibold hover:underline px-2 transition-colors">
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  order: MyOrder | null;
}

export default function OrderDetails({ isOpen, onClose, order }: OrderDetailsProps) {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const getTimelineStatus = (currentStatus: string) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    return steps.map((step, index) => ({
      step,
      isCompleted: index <= currentIndex || (currentStatus === 'delivered'),
    }));
  };

  const timelineStatus = getTimelineStatus(order.status);
  const isDelivered = order.status === 'delivered';
  const isCancelled = order.status === 'cancelled';

  console.log("Order Data Debug:", order);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 ring-1 ring-border">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
          <h2 className="text-lg font-bold">Order Details</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary text-muted hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-secondary/30 custom-scrollbar">
          
          {/* Order Info Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight">Order #{order.order_number}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                  isDelivered ? 'bg-green-100 text-green-700' : 
                  isCancelled ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {order.status}
                </span>
                {order.stage && (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide border border-slate-200">
                    {order.stage}
                  </span>
                )}
              </div>
              <p className="text-muted text-sm mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Timeline */}
              {!isCancelled && (
                <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-base font-bold">Status Timeline</h3>
                    {isDelivered && (
                       <p className="text-green-600 font-medium text-xs flex items-center gap-1">
                         <CheckCircle2 className="w-4 h-4" />
                         Delivered
                       </p>
                    )}
                  </div>
                  <div className="relative px-2">
                    <div className="absolute top-4 left-6 right-6 h-0.5 bg-primary hidden md:block"></div>
                    <div className="flex flex-col md:flex-row justify-between relative z-10 gap-6 md:gap-0">
                      <TimelineStep 
                        Icon={Check} 
                        label="Placed" 
                        date={formatDate(order.created_at)} 
                        isCompleted={timelineStatus[0].isCompleted} 
                      />
                      <TimelineStep 
                        Icon={Package} 
                        label="Processing" 
                        isCompleted={timelineStatus[1].isCompleted} 
                      />
                      <TimelineStep 
                        Icon={Truck} 
                        label="Shipped" 
                        isCompleted={timelineStatus[2].isCompleted} 
                      />
                      <TimelineStep 
                        Icon={Home} 
                        label="Delivered" 
                        isCompleted={timelineStatus[3].isCompleted} 
                        isLast 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                <h3 className="text-base font-bold mb-4">Items ({order.items.length})</h3>
                <div className="space-y-5">
                  {order.items.map((item, index) => (
                    <OrderItem key={index} item={item} />
                  ))}
                </div>
                {/* Return Policy inside items */}
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs text-muted leading-normal flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>Need to return? <a href="#" className="text-accent hover:underline font-medium">Policy</a>. 30 days.</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Summary */}
              <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
                <h3 className="text-base font-bold mb-4">Order Summary</h3>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-muted text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium text-foreground">${Number(order.total_amount) - Number(order.delivery_fee)}</span>
                  </div>
                  <div className="flex justify-between text-muted text-sm">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">
                      {Number(order.delivery_fee) === 0 ? 'Free' : `$${order.delivery_fee}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-base font-bold text-foreground">Total</span>
                    <span className="text-xl font-black text-primary">${order.total_amount}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="w-full py-2.5 rounded-full bg-secondary text-foreground font-semibold hover:bg-border transition-colors flex justify-center items-center gap-2 text-sm">
                    <HelpCircle className="w-4 h-4" />
                    Need Help?
                  </button>
                </div>
              </div>

              {/* Shipping Address */}
              <ShippingAddress order={order} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}