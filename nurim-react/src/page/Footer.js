import React from "react";
// import line1 from "./img/asd.png";
import "./Footer.css";
import Logo from "../img/Logo.w.PNG";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="rectangle" />

      <div className="group">
        <div className="text-wrapper">Website Links</div>

        <div className="div">Home</div>

        <div className="text-wrapper-2">Product</div>

        <div className="text-wrapper-3">Subscribe</div>

        <div className="text-wrapper-4">FAQs</div>
      </div>

      <div className="text-wrapper-5">Short Brief About Us</div>

      <div className="group-2">
        <div className="text-wrapper-6">Services</div>

        <div className="text-wrapper-7">Mobile</div>

        <div className="text-wrapper-8">QnA</div>

        <div className="text-wrapper-9">Terms of Use</div>
      </div>

      <div className="group-3">
        <div className="text-wrapper-10">Developers</div>

        <div className="text-wrapper-7">Fetures</div>

        <div className="text-wrapper-8">Testomonials</div>

        <div className="text-wrapper-11">Referals</div>
      </div>

      <div className="group-4">
        <img className="Logo" alt="Logo" src={Logo} />
        <div className="line-separator">
          {" "}
          <p className="p">2025. NURIM. All rights reserved</p>
        </div>
      </div>

      <p className="rather-than-simply">
        Rather than simply providing a &#39;rental service&#39; that provides
        products, we partner with lifestyle partners who &#39;enjoy&#39; the
        value and environment that benefits from the products, rather than
        customers.
      </p>

      <div className="group-5">
        <div className="frame">
          <div className="text-wrapper-12">Enter your email</div>
        </div>

        <div className="div-wrapper">
          <div className="text-wrapper-13">Subscribe Now</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
