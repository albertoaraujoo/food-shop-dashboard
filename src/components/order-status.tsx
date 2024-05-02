export type OrderStatusProps = {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
};

type StatusMap = {
  value: string;
  color: string;
};

const orderStatusMap: Record<OrderStatusProps["status"], StatusMap> = {
  pending: { value: "Pending", color: "bg-slate-400" },
  canceled: { value: "Canceled", color: "bg-rose-500" },
  processing: { value: "Processing", color: "bg-amber-500" },
  delivering: { value: "Delivering", color: "bg-amber-500" },
  delivered: { value: "Delivered", color: "bg-emerald-500" },
};

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testId="badge"
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />
      <span className="font-medium">{orderStatusMap[status].value}</span>
    </div>
  );
};
