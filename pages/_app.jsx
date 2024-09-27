import { AuthProvider } from "@/hooks/useUser";
import { ProductProvider } from "@/hooks/useProducts";
import { CheckoutProvider } from "@/hooks/useCheckout";
import "../styles/index.css";
import "../styles/app.scss";
import GlobalStyles from "@/components/GlobalStyles";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import * as ga from "../lib/ga";
import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", (url) => {
  NProgress.done();
  ga.pageview(url);
});
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    window.fbq("track", "PageView");

    const handleRouteChange = () => {
      window.fbq("track", "PageView");
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* Global Site Code Pixel - Facebook Pixel */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${process.env.NEXT_PUBLIC_FB_PIXEL_ID});
          `,
        }}
      />
      <AuthProvider>
        <ProductProvider>
          <CheckoutProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </CheckoutProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
