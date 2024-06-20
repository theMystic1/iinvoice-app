import { League_Spartan } from "next/font/google";
import "./_styles/globals.css";
import RightNav from "./_components/RightNav";
import { DarkModeProvider } from "./_contexts/DarkModeContext";
import { auth } from "./_lib/auth";
// import { Toaster } from "react-hot-toast";

const Spartan = League_Spartan({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s /  Invoice",
    default: "Invoice  ",
  },
  description: "A nice invoice issuance service",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <DarkModeProvider>
      <html lang="en">
        <body
          className={`${Spartan.className} relative  min-h-screen antialiased flex flex-col`}
        >
          <RightNav session={session} />
          <div className="flex-1 px-4 md:px-8 py-12 grid mt-20 xl:mt-10">
            <main className=" lg:max-w-5xl  mx-auto w-full h-full pb-40 top-10  md:top-20">
              {children}
            </main>
          </div>
        </body>
      </html>
    </DarkModeProvider>
  );
}
