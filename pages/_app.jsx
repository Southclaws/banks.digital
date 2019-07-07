import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import withGA from "next-ga";
import DefaultSeo from "next-seo";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <DefaultSeo
          config={{
            title: "Digital Banks List",
            description: "A comparison of digital banks and their features.",
            canonical: "https://www.banks.digital/",
            openGraph: {
              type: "website",
              locale: "en_GB",
              url: "https://www.banks.digital/",
              site_name: "Digital Banks List",
              images: [
                {
                  url: "/static/large.png",
                  width: 866,
                  height: 296,
                  alt: "Digital Banking Banner"
                }
              ]
            },
            twitter: {
              handle: "@Southclaws",
              site: "@Southclaws",
              cardType: "summary_large_image"
            }
          }}
        />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default withGA("UA-78828365-11", Router)(MyApp);
