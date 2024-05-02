import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const OrderDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Customer</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  <Skeleton className="h-5 w-[164px]" />
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Phone</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  <Skeleton className="h-5 w-[140px]" />
                </span>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Email</TableCell>
            <TableCell className="flex justify-end">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-[200px]" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Order placed
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-[148px]" />
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
          {Array.from({ length: 2 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  {" "}
                  <Skeleton className=" h-5 w-[140px]" />
                </TableCell>
                <TableCell className="ml-auto text-right">
                  {" "}
                  <Skeleton className="ml-auto h-5 w-3" />
                </TableCell>
                <TableCell className="ml-auto text-right">
                  <Skeleton className="h-5 w-12" />
                </TableCell>
                <TableCell className="ml-auto text-right">
                  <Skeleton className="h-5 w-12" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Order's total</TableCell>
            <TableCell className="text-right font-medium">
              <Skeleton className="h-5 w-20" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
