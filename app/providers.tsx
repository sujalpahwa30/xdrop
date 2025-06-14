"use client";

import type { ThemeProviderProps } from "next-themes";
import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import { ToastProvider } from "@heroui/toast";
import { createContext } from "react";

export interface ProvidersProps {
    children: React.ReactNode;
    themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NonNullable< 
            Parameters<ReturnType<typeof useRouter>["push"]>[1]
        >;
    }
}

// Create a context for imagekit authentication 
export const ImageKitContext = createContext<{
    authenticate: () => Promise<{
        signature: string;
        token: string;
        expire: number;
    }>;
}>({
    authenticate: async () => ({ signature: "", token: "", expire: 0 }),
});

// ImageKit authentication function 
const authenticator = async () => {
    try {
        const response = await fetch("/api/imagekit-auth");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Authentication error:", error);
        throw error;
    }
};

export function Providers({ children, themeProps }: ProvidersProps) {
    const router = useRouter();

    return (
        <HeroUIProvider navigate={router.push}>
            <ImageKitProvider
                authenticator={authenticator}
                publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
                urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || ""}
            >
                <ImageKitContext.Provider value={{ authenticate: authenticator }}>
                    <ToastProvider placement="top-right" />
                    <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
                </ImageKitContext.Provider>
            </ImageKitProvider>
        </HeroUIProvider>
    );
}