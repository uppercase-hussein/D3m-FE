"use client";
import React, { useEffect, useState } from "react";
import {
  BarChartCard,
  LineChartCard,
  PieChartCard,
  StatCard,
} from "../components/Cards/DataCards";
import { FaMoneyCheck, FaNairaSign } from "react-icons/fa6";
import { OutletTableCard } from "../components/Cards/TableCards";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { OutletType } from "../upload/page";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getReport } from "@/app/api/app.api";
import { formatNumber } from "@/app/utils/helpers";
import moment from "moment";

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



const DashboardPage = () => {
  const router = useRouter()
  let token = Cookies.get("d3m-auth-token");
  let stringedUser = Cookies.get("d3m-outlet");
  let user: OutletType = stringedUser ? JSON.parse(stringedUser) : null;
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    customerCount: 0,
    averageSpend: 0,
    outletNames: [""],
    outletSales: [0],
    outletOrderCount:[0],
    dailySalesLabel: [""],
    dailySalesTotal: [0],
    dailySalesOrderCount: [0],

  })



  const [barChartData, setBarChartData] = useState({
    label: salesData.outletNames,
    value: salesData.outletSales,
    subTitle: "Total sales ₦"
  })
  const [lineChartData, setLineChartData] = useState({
    label: salesData.dailySalesLabel,
    value: salesData.dailySalesTotal,
    subTitle: "Daily Sales ₦"
  })

  const checkAuth = () => {
    if (!user) {
      router.push("/login")
    }
  }

  const { data } = useQuery({
    queryKey: ['getAnalytics', `${token}`],
    queryFn: getReport,
    refetchOnWindowFocus: false,
    onSuccess: response => {
      console.log(response)
      if (response.status === "error") {
        return toast.error(response.message)
      }
      let allOutletSales: AllOutletDataType[] = response.data.allOutletdata;
      let outletData: OutletDataType[] = response.data.outletData;
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

        let summedOutletData = Object.values(groupedOutletData);
        summedOutletData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let dailySalesLabel = summedOutletData.map(data => moment(data.date).format('Do MMM  YYYY'));
        let dailySalesTotal = summedOutletData.map(data => data.totalSales);
        let dailySalesOrderCount = summedOutletData.map(data => data.orderCount);
        
        
        setSalesData({
          dailySalesLabel,
          dailySalesTotal,
          dailySalesOrderCount,
          outletNames, outletSales, outletOrderCount,
          totalSales: totalSales,
          customerCount: totalOrderCount,
          averageSpend: totalSales / totalOrderCount,
        })
      }

    },
    onError: err => {
      console.log(err)
      toast.error("An internal error occurred, Try again")
    }
  })

  const toggleLineChart = (value:string) => {
    if(value === "count"){
      setLineChartData({
        label: salesData.dailySalesLabel,
        value: salesData.dailySalesOrderCount,
        subTitle: "Customer Count"
      })
    }else{
      setLineChartData({
      label: salesData.dailySalesLabel,
      value: salesData.dailySalesTotal,
      subTitle: "Daily Sales ₦"
      })
    }
  }

  const toggleBarChart = (value:string) => {
    if(value === "count"){
      setBarChartData({
        label: salesData.outletNames,
        value: salesData.outletOrderCount,
        subTitle: "Customer Count"
      })
    }else{
      setBarChartData({
      label: salesData.outletNames,
      value: salesData.outletSales,
      subTitle: "Total sales ₦"
      })
    }
  }
  useEffect(() => {
    checkAuth()
  }, [])
  useEffect(() => {
    toggleLineChart("sales")
    toggleBarChart("sales")
  }, [salesData])
  
  return (
    <>
      <div className="w-full h-auto bg-scale bg-gray-200 dark:bg-gray-900">
        <div className="pt-80 md:pt-44 pb-12 px-14">
          {/* Header Stat Cards */}
          <div className="w-full overflow-auto flex flex-row justify-between">
            <StatCard
              data={formatNumber(salesData.totalSales)}
              statTitle="Total Sales"
              statPercentage={0}
              statDescription={"Total sales for the period"}
              icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
            />
            <StatCard
              data={formatNumber(salesData.customerCount, 0)}
              statTitle="Customer Count"
              statPercentage={0}
              statDescription={"Total orders made"}
              icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
            />
            <StatCard
              data={formatNumber(salesData.averageSpend)}
              statTitle="Average Spend"
              statPercentage={0}
              statDescription={"Average order value"}
              icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
            />
            <StatCard
              data={``}
              statTitle=""
              statPercentage={0}
              statDescription={""}
              icon={<FaNairaSign className="text-green-600 dark:text-green-500" />}
            />
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row justify-between mx-auto my-2">
              <BarChartCard title="Sales by outlet" subtitle={barChartData.subTitle} labels={barChartData.label} values={barChartData.value} toggleChart={toggleBarChart} />
            </div>
            <div className="w-full flex flex-row justify-between mx-auto my-2">
              <LineChartCard title="Outlets Daily Sales" subtitle={lineChartData.subTitle} labels={lineChartData.label} values={lineChartData.value} toggleChart={toggleLineChart} />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between my-2">
              <OutletTableCard title="All Outlets" />
            </div>
            <div className="w-full overflow-auto flex flex-row justify-between mx-auto my-2">
              {/* <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff satisfaction" />
              <PieChartCard statTitle="Staff retainment" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
