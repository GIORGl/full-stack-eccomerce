import React from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="main__banner">
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
          "https://previews.123rf.com/images/varijanta/varijanta1605/varijanta160500044/56755965-thin-line-flat-design-banner-for-sale-web-page-shopping-e-commerce-discounts-and-clearance-sale-mode.jpg"
        )`,
          backgroundPosition: "center center",
        }}
      ></header>

      <div className="fade-bottom"></div>
    </div>
  );
}
export default Banner;
