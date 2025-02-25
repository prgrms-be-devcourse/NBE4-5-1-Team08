import type {Config} from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                destructive: "#ef4444",
                primary: "#6366F1",
                primaryForeground: "#ffffff",
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "hsl(220, 13%, 91%)",
                ring: "hsl(220, 90%, 55%)",
                chart1: "hsl(var(--chart-1))",
                chart2: "hsl(var(--chart-2))",
                chart3: "hsl(var(--chart-3))",
                chart4: "hsl(var(--chart-4))",
                chart5: "hsl(var(--chart-5))",
            },
        },
    },
    plugins: [],
} satisfies Config;
