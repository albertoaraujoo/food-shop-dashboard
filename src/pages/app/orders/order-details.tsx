import { DialogTitle } from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { getOrderDetails } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OrderDetailsSkeleton } from "./order-details-skeleton";

type OrderDetailsProps = {
  orderId: string;
  open: boolean;
};

export const OrderDetails = ({ orderId, open }: OrderDetailsProps) => {
  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-md font-bold">
          Order: {orderId}
        </DialogTitle>
        <DialogDescription>Order details</DialogDescription>
      </DialogHeader>
      {order ? (
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Customer
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.customer.name}</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Phone</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {order.customer.phone ?? "Phone not provided"}{" "}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{order.customer.email}</span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Order placed
                </TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {formatDistanceToNow(order.createdAt, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.priceInCents / 100).toLocaleString("en-Us", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (item.priceInCents * item.quantity) /
                        100
                      ).toLocaleString("en-Us", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Order's total</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.totalInCents / 100).toLocaleString("en-Us", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ) : (
        <OrderDetailsSkeleton />
      )}
    </DialogContent>
  );
};
