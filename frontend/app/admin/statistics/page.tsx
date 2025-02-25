"use client";

import {Bar, BarChart, XAxis} from "recharts";
import {useEffect, useState} from "react";
import {client} from "@/app/api/client";
import {ChartContainer} from "@/components/ui/chart";

// 데이터 변환 함수
const transformData = (jsonData: Record<string, number>[]) => {
    return jsonData.map(item => {
        const time = Object.keys(item)[0]; // 시간 키 가져오기
        return {
            time, // "0", "1", "2", ... (문자열)
            sales: item[time] // 매출 값
        };
    });
};

// 인터페이스 정의
interface SalesData {
    time: string;
    sales: number;
}

const SalesChart = () => {
    const [data, setData] = useState<SalesData[]>([]);

    useEffect(() => {
        client.GET('/v1/statistics/hourly')
            .then(res => res.data!.data) // API 응답 데이터 가져오기
            .then(sales => {
                const formattedData = transformData(sales!); // 데이터 변환
                setData(formattedData); // 변환된 데이터 상태 업데이트
            })
            .catch(err => console.error("Error fetching sales data:", err));
    }, []);

    const chartConfig = {
        sales: {
            label: "Sales",
        },
    };

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={data}>
                <XAxis dataKey="time"/>
                <Bar dataKey="sales" className="fill-chart2" radius={4}/>
            </BarChart>
        </ChartContainer>
    );
};

export default SalesChart;