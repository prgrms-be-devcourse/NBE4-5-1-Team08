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
            },
        },
    },
    plugins: [],
} satisfies Config;
