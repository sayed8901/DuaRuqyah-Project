import { ContextProvider } from "@/contexts/ContextProvider";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

export const metadata = {
  title: "Dua Ruqyah",
  description: "Dua & Ruqyah || All Duas Collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-2`}>
        <ContextProvider>
          {/* main contents */}
          {children}

          {/* to use react-toastify globally across the nextJS project */}
          <ToastContainer></ToastContainer>
        </ContextProvider>
      </body>
    </html>
  );
}
