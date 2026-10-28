import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SoclProvider } from "./context/SoclContext";
import ToastContainer from "./components/ui/ToastContainer";
import SplashCursor from "./components/SplashCursor";
import SoclChatbot from "./components/SoclChatbot";
import ClerkSetupGuide from "./components/ClerkSetupGuide";
import { clerkCustomAppearance } from "./components/auth/clerkAppearance";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#051F20" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "SocialInt",
    template: "%s | SocialIntel",
  },
  description:
    "AI-powered social media intelligence, sentiment analysis, trend detection, audience insights, and influence analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const isRealClerkConfigured = Boolean(
    clerkKey &&
    (clerkKey.startsWith("pk_test_") || clerkKey.startsWith("pk_live_")) &&
    !clerkKey.includes("placeholder")
  );

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var initKey = 'socialint_theme_init_light';
                var hasInit = localStorage.getItem(initKey);
                if (!hasInit) {
                  localStorage.setItem(initKey, 'true');
                  localStorage.setItem('socialint_theme', 'LIGHT');
                  document.documentElement.classList.remove('dark');
                } else {
                  var t = localStorage.getItem('socialint_theme');
                  if (t === 'DARK') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                }
              } catch (_) {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-[#051F20] dark:text-zinc-100 selection:bg-[#8EB69B]/35 selection:text-[#051F20] dark:selection:bg-[#235347]/40 dark:selection:text-[#DAF1DE] transition-colors duration-150">
        {!isRealClerkConfigured ? (
          <ClerkSetupGuide />
        ) : (
          <ClerkProvider
            publishableKey={clerkKey}
            appearance={clerkCustomAppearance}
          >
            <ThemeProvider>
              <NotificationProvider>
                <SoclProvider>
                  <SplashCursor />
                  <ToastContainer />
                  <SoclChatbot />
                  {children}
                </SoclProvider>
              </NotificationProvider>
            </ThemeProvider>
          </ClerkProvider>
        )}
      </body>
    </html>
  );
}