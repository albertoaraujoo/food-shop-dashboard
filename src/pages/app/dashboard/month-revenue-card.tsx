import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";

import { getMonthRevenue } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { MetricCardSkeleton } from "./metric-card-skeleton";

export const MonthRevenueCard = () => {
  const { data: monthRevenue } = useQuery({
    queryKey: ["metrics", "month-receipt"],
    queryFn: getMonthRevenue,
  });
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total revenue for (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className=" space-y-1">
        {monthRevenue ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString("en-Us", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <p className=" text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>
                  {"     "}
                  Compared to last month
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    -{monthRevenue.diffFromLastMonth}%
                  </span>
                  {"     "}
                  Compared to last month
                </>
              )}
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
};