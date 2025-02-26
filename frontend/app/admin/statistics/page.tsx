"use client";

import {Bar, BarChart, XAxis} from "recharts";
import React, {useEffect, useState} from "react";
import {client} from "@/app/api/client";
import {ChartContainer} from "@/components/ui/chart";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns"
import {cn} from "@/lib/utils";

// 데이터 변환 함수
const transformData = (jsonData: Record<string, number>[]) => {
    return jsonData.map(item => {
        const time = Object.keys(item)[0];
        return {
            time,
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
    const [date, setDate] = React.useState<Date>()

    useEffect(() => {
        client.GET('/v1/statistics/hourly', {
            params: {
                query: {
                    date: date?.toISOString(),
                },
            }
        })
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
        <div className={"flex flex-col gap-5"}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={data}>
                    <XAxis dataKey="time"/>
                    <Bar dataKey="sales" className="fill-chart2" radius={4}/>
                </BarChart>
            </ChartContainer>
        </div>
    );
};

export default SalesChart;