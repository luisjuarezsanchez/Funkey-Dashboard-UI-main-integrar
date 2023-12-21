import { ConfigProvider } from "antd";
import { Metadata } from "next";
import React from "react";
import { Providers } from "redux/provider";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import "../styles/globals.css";
import theme from "../themes/defaultTheme";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Códice Azul",
  description: "",
};

interface IRootLayoutProps {
  children: React.ReactElement;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <ConfigProvider theme={theme}> {children}</ConfigProvider>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
