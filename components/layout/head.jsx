import NextHead from "next/head";

const siteDescription =
  "Design & print Business Cards, flyers, mugs and other print products online and we will deliver your doorstep. Get instant quotes.";
const siteTitle = "Design and Print Business Cards, Flyers Online in Nigeria";
const siteKeywords =
  "design, printivo, print, business cards, flyers, banners, printing, letterheads, print mugs, print in nigeria";
const siteImage =
  "https://printivo.s3.amazonaws.com/img/image-seo-share-large.png";

const Head = ({ title, description, keywords, children, image, url }) => {
  return (
    <NextHead>
      <title>
        {title || "Design and Print Business Cards, Flyers Online in Nigeria"}
      </title>
      <meta name="keywords" content={keywords || siteKeywords} />
      <meta name="description" content={description || siteDescription} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || process.env.NEXT_PUBLIC_BASE_URL}
      />
      <meta
        property="og:description"
        content={description || siteDescription}
      />
      <meta property="og:image" content={image || siteImage} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        name="google-site-verification"
        content="-oWRsxQSz6hMQKGEtpz8lpJAVivXjAQKxBT1Nc8tPOM"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NDFDW49Z');
        `,
        }}
      />

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NDFDW49Z"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      {children}
      <script
        id="CcIframeApiScript"
        type="text/javascript"
        src="https://sp.printivo.com/Resources/SPEditor/Scripts/IFrame/IframeApi.js"
      ></script>

      <script
        type="text/javascript"
        charSet="UTF-8"
        dangerouslySetInnerHTML={{
          __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5e7866fe8d24fc2265896648/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();`,
        }}
      />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css"
      />
      <script src="https://js.paystack.co/v1/inline.js"></script>

      {/* <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NDFDW49Z');`,
        }}
      /> */}

      {/* <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-46049504-1"
      ></script>
      <script>
        window.dataLayer = window.dataLayer || []; function gtag()
        {window.dataLayer.push(arguments)}
        gtag('js', new Date()); gtag('config', 'UA-46049504-1');
      </script> */}
    </NextHead>
  );
};

export default Head;
