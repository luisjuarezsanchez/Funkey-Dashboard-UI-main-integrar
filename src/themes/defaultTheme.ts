import { theme, type ThemeConfig } from "antd";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
});

const defaultTheme: ThemeConfig = {
  token: {
    fontFamily: nunito.style.fontFamily,
    colorPrimary: "#1890FF",
    fontWeightStrong: 300,
  },
  algorithm: theme.darkAlgorithm,
  components: {
    Layout: {
      // colorBgHeader: "white",
    },
  },
};

export default defaultTheme;
