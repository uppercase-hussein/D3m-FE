"use client";
import React, { useEffect, useState } from "react";
import {
  BarChartCard,
  LineChartCard,
  MultiBarChartCard,
  PieChartCard,
  StackedBarChartCard,
  StatCard,
} from "../components/Cards/DataCards";
import { FaMoneyCheck, FaNairaSign, FaUsers } from "react-icons/fa6";
import { OutletTableCard } from "../components/Cards/TableCards";
import ChatAi from "../components/ChatAi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { OutletType } from "../upload/page";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getReport } from "@/app/api/app.api";
import { formatNumber } from "@/app/utils/helpers";
import moment from "moment";
import { MostSoldTableCard } from "../components/Cards/MostSoldItemPeriod";
import { TableQuantityItem, TableRowItem } from "../components/Tables/AllTables";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Loader } from "@/app/(auth)/components/Loader";


interface AllOutletDataType {
  orderCount: number;
  outlet: string;
  totalSales: number;
}

interface OutletDataType {
  date: string;
  orderCount: number;
  outlet: string;
  totalSales: number;
}

interface OrderByDayType {
  averageSales: number;
  dayOfWeek: number;
  orderCount: number;
  totalSales: number;
}

interface OrderByPeriodType {
  period: string;
  orderCount: number;
  totalSales: number;
}

export interface TopProductByPeriodType {
  period: string;
  items: {
    name: string;
    totalQuantity: number;
  }[];
}

interface SalesDataInterface {
  totalSales: number;
  customerCount: number;
  averageSpend: number;
  outletNames: string[];
  outletSales: number[];
  outletOrderCount: number[];
  dailySalesLabel: string[];
  dailySalesTotal: number[];
  dailySalesOrderCount: number[];
  orderByDayLabel: string[];
  orderByDayTotalSales: number[];
  orderByDayOrderCount: number[];
  orderByPeriodLabel: string[];
  orderByPeriodTotalSales: number[];
  orderByPeriodOrderCount: number[];
  topSellingAmountLabel: string[];
  topSellingAmountValue: number[];
  topSellingQuantityLabel: string[];
  topSellingQuantityValue: number[];
  leastSellingAmountLabel: string[];
  leastSellingAmountValue: number[];
  leastSellingQuantityLabel: string[];
  leastSellingQuantityValue: number[];
  topProductsByPeriodLabel: string[];
  topProductsByPeriodOrderValues: { name: string; totalQuantity: number; }[];
  productTotalSales: number;
  productTotalOrders: number;
  productWeeklySaleLabel: number[],
  productWeeklySaleValue: number[],
  productWeeklySaleCount: number[],
  productMonthlySaleLabel: number[],
  productMonthlySaleValue: number[],
  productMonthlySaleCount: number[],
}




const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DashboardPage = () => {
  const router = useRouter()
  let token = Cookies.get("d3m-auth-token");
  let stringedUser = Cookies.get("d3m-outlet");
  const { outletId, timeframe, startDate, endDate, date, product } = useSelector((state: RootState) => state.app)
  let user: OutletType = stringedUser ? JSON.parse(stringedUser) : null;
  const [salesData, setSalesData] = useState<SalesDataInterface>({
    totalSales: 0,
    customerCount: 0,
    averageSpend: 0,
    outletNames: [],
    outletSales: [],
    outletOrderCount: [],
    dailySalesLabel: [],
    dailySalesTotal: [],
    dailySalesOrderCount: [],
    orderByDayLabel: [],
    orderByDayTotalSales: [],
    orderByDayOrderCount: [],
    orderByPeriodLabel: [],
    orderByPeriodTotalSales: [],
    orderByPeriodOrderCount: [],
    topSellingAmountLabel: [],
    topSellingAmountValue: [],
    topSellingQuantityLabel: [],
    topSellingQuantityValue: [],
    leastSellingAmountLabel: [],
    leastSellingAmountValue: [],
    leastSellingQuantityLabel: [],
    leastSellingQuantityValue: [],
    // topProductsByPeriod: [] as TopProductByPeriodType[],
    topProductsByPeriodLabel: [],
    topProductsByPeriodOrderValues: [],
    productTotalSales: 0,
    productTotalOrders: 0,
    productWeeklySaleLabel:[],
    productWeeklySaleValue:[],
    productWeeklySaleCount:[],
    productMonthlySaleLabel:[],
    productMonthlySaleValue:[],
    productMonthlySaleCount:[],
  })


  const checkAuth = () => {
    if (!user) {
      router.push("/login")
    }
  }

  const { data, isFetching: fetchingData, isLoading: loadingData } = useQuery({
    queryKey: ['getAnalytics', token, outletId, timeframe, startDate, endDate, date, product],
    queryFn: getReport,
    refetchOnWindowFocus: false,
    onSuccess: response => {
      if (response.status === "error") {
        return toast.error(response.message)
      }
      console.log(response.data)
      let allOutletSales: AllOutletDataType[] = response.data.salesByOutlet;
      let outletData: OutletDataType[] = response.data.overallOutletSales;
      if (allOutletSales && outletData) {
        allOutletSales.sort((a, b) => b.totalSales - a.totalSales);
        let totalSales = allOutletSales.reduce((sum, outletData) => sum + outletData.totalSales, 0);
        let totalOrderCount = allOutletSales.reduce((sum, outletData) => sum + outletData.orderCount, 0);
        let outletNames = allOutletSales.map(outletData => outletData.outlet);
        let outletSales = allOutletSales.map(outletData => outletData.totalSales);
        let outletOrderCount = allOutletSales.map(outletData => outletData.orderCount);

        let groupedOutletData = outletData.reduce((acc: { [key: string]: OutletDataType }, curr) => {
          if (!acc[curr.date]) {
            acc[curr.date] = {
              date: curr.date,
              totalSales: 0,
              orderCount: 0,
              outlet: "",
            };
          }
          acc[curr.date].totalSales += curr.totalSales;
          acc[curr.date].orderCount += curr.orderCount;
          return acc;
        }, {});
        // console.log(groupedOutletData)

        let summedOutletData = Object.values(groupedOutletData);
        summedOutletData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let dailySalesLabel = summedOutletData.map(data => moment(data.date).format('ddd Do MMM,  YYYY'));

        let dailySalesTotal = summedOutletData.map(data => data.totalSales);
        let dailySalesOrderCount = summedOutletData.map(data => data.orderCount);

        let orderByday = response.data.orderByDay
        let orderByDayLabel = orderByday.map((day: OrderByDayType) => daysOfWeek[day.dayOfWeek - 1]);
        let orderByDayTotalSales = orderByday.map((day: OrderByDayType) => day.totalSales);
        let orderByDayOrderCount = orderByday.map((day: OrderByDayType) => day.orderCount);

        let orderByPeriod = response.data.salesByTime;
        orderByPeriod.sort((a: OrderByPeriodType, b: OrderByPeriodType) => {
          const timeA = parseInt(a.period.split(':')[0]);
          const timeB = parseInt(b.period.split(':')[0]);
          return timeA - timeB;
        });
        let orderByPeriodLabel = orderByPeriod.map((val: OrderByPeriodType) => val.period);
        let orderByPeriodTotalSales = orderByPeriod.map((val: OrderByPeriodType) => val.totalSales);
        let orderByPeriodOrderCount = orderByPeriod.map((val: OrderByPeriodType) => val.orderCount);

        let topSellingAmount = response.data.topSellingItemsByAmount.slice(0, 10);
        let topSellingAmountLabel = topSellingAmount.map((val: { name: string, totalSoldAmount: number }) => val.name)
        let topSellingAmountValue = topSellingAmount.map((val: { name: string, totalSoldAmount: number }) => val.totalSoldAmount)

        let topSellingQuantity = response.data.topSellingItemsByQuantity.slice(0, 10);
        let topSellingQuantityLabel = topSellingQuantity.map((val: { name: string, totalSoldQuantity: number }) => val.name)
        let topSellingQuantityValue = topSellingQuantity.map((val: { name: string, totalSoldQuantity: number }) => val.totalSoldQuantity)

        let topProductsByPeriod = response.data.mostSoldItemsByTime;
        topProductsByPeriod.sort((a: any, b: any) => {
          const timeA = parseInt(a.period.split(':')[0]);
          const timeB = parseInt(b.period.split(':')[0]);
          return timeA - timeB;
        });
        let topProductsByPeriodLabel = topProductsByPeriod.map((val: TopProductByPeriodType) => val.period);
        let topProductsByPeriodOrderValues = topProductsByPeriod.map((val: TopProductByPeriodType) => val.items);

        let leastSellingAmount = response.data.leastSellingItemsByAmount.slice(0, 10);
        let leastSellingAmountLabel = leastSellingAmount.map((val: { name: string, totalSoldAmount: number }) => val.name)
        let leastSellingAmountValue = leastSellingAmount.map((val: { name: string, totalSoldAmount: number }) => val.totalSoldAmount)

        let leastSellingQuantity = response.data.leastSellingItemsByQuantity.slice(0, 10);
        let leastSellingQuantityLabel = leastSellingQuantity.map((val: { name: string, totalSoldQuantity: number }) => val.name)
        let leastSellingQuantityValue = leastSellingQuantity.map((val: { name: string, totalSoldQuantity: number }) => val.totalSoldQuantity)

        setSalesData(prev => ({
          ...prev,
          dailySalesLabel,
          dailySalesTotal,
          dailySalesOrderCount,
          outletNames, outletSales, outletOrderCount,
          totalSales,
          customerCount: totalOrderCount,
          averageSpend: totalSales / totalOrderCount,
          orderByDayLabel,
          orderByDayTotalSales,
          orderByDayOrderCount,
          orderByPeriodLabel,
          orderByPeriodTotalSales,
          orderByPeriodOrderCount,
          topSellingAmountLabel,
          topSellingAmountValue,
          topSellingQuantityLabel,
          topSellingQuantityValue,
          topProductsByPeriodLabel,
          topProductsByPeriodOrderValues,
          leastSellingAmountLabel,
          leastSellingAmountValue,
          leastSellingQuantityLabel,
          leastSellingQuantityValue,
        }))

        let productTotalSale = response.data.totalSalesOfProduct
        let productWeeklySale = response.data.salesByProductWeekly
        let productMonthlySale = response.data.salesByProductMonthly

        if (productTotalSale.length > 0) {
          setSalesData(prev => ({
            ...prev,
            productTotalSales: productTotalSale[0].totalSales,
            productTotalOrders: productTotalSale[0].totalOrders
          }))
        }else{
         if(product) toast.error("No Sale record found ")
        }

        if (productWeeklySale.length > 0) {
          let productWeeklySaleLabel = productWeeklySale.map((val: { totalSales: number, orderCount: number, week: number }) => val.week)
          let productWeeklySaleValue = productWeeklySale.map((val: { totalSales: number, orderCount: number, week: number }) => val.totalSales)
          let productWeeklySaleCount = productWeeklySale.map((val: { totalSales: number, orderCount: number, week: number }) => val.orderCount)
          setSalesData(prev => ({
            ...prev,
            productWeeklySaleLabel,
            productWeeklySaleValue,
            productWeeklySaleCount,
          }))
        }else{
          if(product) toast.error("No Weekly sale record found")
        }

        if (productMonthlySale.length > 0) {
          let productMonthlySaleLabel = productMonthlySale.map((val: { totalSales: number, orderCount: number, month: number }) => val.month)
          let productMonthlySaleValue = productMonthlySale.map((val: { totalSales: number, orderCount: number, month: number }) => val.totalSales)
          let productMonthlySaleCount = productMonthlySale.map((val: { totalSales: number, orderCount: number, month: number }) => val.orderCount)
          setSalesData(prev => ({
            ...prev,
            productMonthlySaleLabel,
            productMonthlySaleValue,
            productMonthlySaleCount,
          }))
        }else{
          if(product) toast.error("No Monthly sale record found")
        }

      }

    },
    onError: err => {
      console.log(err)
      toast.error("An internal error occurred, Try again")
    }
  })



  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <>
      {(loadingData || fetchingData) && <Loader />}
      <div className="w-full h-auto bg-scale bg-gray-200 dark:bg-gray-900">
        <div className="pb-12 px-14">
          {/* Header Stat Cards */}
          {!product &&
            <>
              <div className="w-full overflow-auto flex flex-row justify-between">
                <StatCard
                  data={formatNumber(salesData.totalSales | 0)}
                  statTitle="Total Sales"
                  statPercentage={0}
                  statDescription={"Total sales for the period"}
                  icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
                />
                <StatCard
                  data={formatNumber(salesData.customerCount | 0, 0)}
                  statTitle="Customer Count"
                  statPercentage={0}
                  statDescription={"Total orders made"}
                  icon={<FaUsers className="text-green-600 dark:text-green-500" />}
                />
                <StatCard
                  data={formatNumber(salesData.averageSpend | 0)}
                  statTitle="Average Spend"
                  statPercentage={0}
                  statDescription={"Average order value"}
                  icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
                />
                {/* <StatCard
              data={``}
              statTitle=""
              statPercentage={0}
              statDescription={""}
              icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
            /> */}
              </div>

              <div className="w-full flex flex-col">
                {outletId === "0" && <div className="w-full flex flex-row justify-between mx-auto my-2">
                  <BarChartCard
                    // horizontal={true}
                    labels={salesData.outletNames}
                    title="Sales by outlet"
                    subtitle={["Total sales ₦", "Customer Count"]}
                    values={[salesData.outletSales, salesData.outletOrderCount]}
                  />
                </div>
                }
                <div className="w-full flex flex-row justify-between mx-auto my-2">
                  {/* <StackedBarChartCard title="Top Products (by Period)" subtitle={""} labels={salesData.topProductsByPeriodLabel}
                values={salesData.topProductsByPeriodOrderValues} /> */}
                  <LineChartCard
                    title="Outlets Daily Sales"
                    labels={salesData.dailySalesLabel}
                    subtitle={["Total sales ₦", "Customer Count"]}
                    values={[salesData.dailySalesTotal, salesData.dailySalesOrderCount]}
                  />
                </div>
                <div className="w-full overflow-auto flex flex-row  items-start justify-between mx-auto my-2">
                  <BarChartCard
                    title="Sales by Time of the Day"
                    labels={salesData.orderByPeriodLabel}
                    subtitle={["Total sales ₦", "Customer Count"]}
                    values={[salesData.orderByPeriodTotalSales, salesData.orderByPeriodOrderCount]}
                  />
                  <BarChartCard
                    title="Sales by Day of the Week"
                    subtitle={["Total sales ₦", "Customer Count"]}
                    labels={salesData.orderByDayLabel}
                    values={[salesData.orderByDayTotalSales, salesData.orderByDayOrderCount]}
                  />
                </div>
                <div className="w-full overflow-auto flex flex-row  items-start justify-between mx-auto my-2">
                  {salesData.topProductsByPeriodOrderValues.length > 0 && <MultiBarChartCard
                    title="Top Products (by Period)"
                    labels={salesData.topProductsByPeriodLabel}
                    subtitle={["", ""]}
                    values={salesData.topProductsByPeriodOrderValues}
                  />}
                </div>
                <div className="w-full flex flex-col md:flex-row items-start justify-between my-2">
                  <PieChartCard title="Top Products (by Amount)" labels={salesData.topSellingAmountLabel} values={salesData.topSellingAmountValue} />
                  <PieChartCard title="Least Sold Products (by Amount)" labels={salesData.leastSellingAmountLabel} values={salesData.leastSellingAmountValue} />
                </div>
                <div className="w-full flex flex-col md:flex-row items-start justify-between my-2">
                  <PieChartCard title="Top Products (by Quantity)" labels={salesData.topSellingQuantityLabel} values={salesData.topSellingQuantityValue} />
                  <PieChartCard title="Least Sold Products (by Quantity)" labels={salesData.leastSellingQuantityLabel} values={salesData.leastSellingQuantityValue} />
                </div>



                {/* <div className="w-full flex flex-col md:flex-row items-start justify-between my-2">
            <PieChartCard title="Top Products (by Quantity)" labels={salesData.topSellingQuantityLabel} values={salesData.topSellingQuantityValue} />
              <PieChartCard title="Least Sold Products (by Quantity)" labels={salesData.leastSellingQuantityLabel} values={salesData.leastSellingQuantityValue} />
            </div> 
            <div className="w-full flex flex-col md:flex-row items-start justify-between my-2">
            <MostSoldTableCard title="Top Products (by Period)" data={salesData.topProductsByPeriod } /> 
              <OutletTableCard title="Top Products (by Quantity)" type="quantity" data={salesData.topSellingQuantity} />
            </div> */}
                <hr className="my-3 border shadow" />

                <div className="w-full flex flex-col md:flex-row items-start justify-between my-2">
                  {data && <ChatAi orderInfo={data} />}
                </div>

              </div>
            </>}

          {product &&
            <>
              <h1 className="font-bold text-3xl uppercase dark:text-gray-100 text-black pt-5 mb-3">{product}</h1>
              <div className="w-full overflow-auto flex flex-row justify-between">
                <StatCard
                  data={formatNumber(salesData.productTotalSales | 0)}
                  statTitle="Total Product Sales"
                  statPercentage={0}
                  statDescription={"Total sales for the period"}
                  icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
                />
                <StatCard
                  data={formatNumber(salesData.productTotalOrders | 0, 0)}
                  statTitle="Total Product Orders"
                  statPercentage={0}
                  statDescription={"Total orders made"}
                  icon={<FaUsers className="text-green-600 dark:text-green-500" />}
                />
              </div>



              <div className="w-full flex flex-col">
                <div className="w-full flex flex-row justify-between mx-auto my-2">
                  <LineChartCard
                    labels={salesData.productWeeklySaleLabel.map(item=>`Week ${item}`)}
                    title={`Weekly Sales for ${product}`}
                    subtitle={["Total sales ₦", "Order Count"]}
                    values={[salesData.productWeeklySaleValue, salesData.productWeeklySaleCount]}
                  />
                </div>

                <div className="w-full flex flex-row justify-between mx-auto my-2">
                  <LineChartCard
                    labels={salesData.productMonthlySaleLabel.map(item=>monthsOfYear[item - 1])}
                    title={`Monthly Sales for ${product}`}
                    subtitle={["Total sales ₦", "Order Count"]}
                    values={[salesData.productMonthlySaleValue, salesData.productMonthlySaleCount]}
                  />
                </div>

              </div>
            </>
          }
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
