import { ContextProvider } from "@/contexts/ContextProvider";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

// custom font
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "500", "700", "900"],
});

// title
export const metadata = {
  title: "Dua & Ruqyah || All Duas Collection",
  description: "Dua & Ruqyah App",
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
