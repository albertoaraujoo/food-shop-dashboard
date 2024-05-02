import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as zod from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const orderFilterSchema = zod.object({
  orderId: zod.string().optional(),
  customerName: zod.string().optional(),
  status: zod.string().optional(),
});

type OrderFilterProps = zod.infer<typeof orderFilterSchema>;

export const OrderTableFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrderFilterProps>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  const handleFilter = ({
    orderId,
    customerName,
    status,
  }: OrderFilterProps) => {
    setSearchParams((url) => {
      if (orderId) {
        url.set("orderId", orderId);
      } else {
        url.delete("orderId");
      }
      if (customerName) {
        url.set("customerName", customerName);
      } else {
        url.delete("customerName");
      }
      if (status) {
        url.set("status", status);
      } else {
        url.delete("status");
      }

      url.set("page", "1");

      return url;
    });
  };

  const handleRemoveFilters = () => {
    setSearchParams((url) => {
      url.delete("orderId");
      url.delete("customerName");
      url.delete("status");
      url.set("page", "1");

      return url;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filters:</span>
      <Input
        placeholder="Order's Id"
        className="h-8 w-auto"
        {...register("orderId")}
      />
      <Input
        placeholder="Client's Name"
        className="h-8 w-[320px]"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
              defaultValue="all"
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      ></Controller>
      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filter Results
      </Button>
      <Button
        onClick={handleRemoveFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="mr-2 h-4 w-4" />
        Remove Results
      </Button>
    </form>
  );
};
