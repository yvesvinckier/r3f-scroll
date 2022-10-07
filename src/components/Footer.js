import React from "react";
import styled from "styled-components";

const StyledCredit = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
  z-index: 20;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  line-height: 2;
  z-index: 5;

  a {
    color: #fff;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

const Footer = () => {
  return (
    <StyledCredit>
      <small>
        Images from Unsplash by{" "}
        <a
          href="https://unsplash.com/photos/S-llxYh3GzI"
          target="_Blank"
          rel="noreferrer"
        >
          Haley Phelps
        </a>
      </small>

      <small>
        Images from Unsplash by{" "}
        <a
          href="https://unsplash.com/photos/n5wwck8ES4w"
          target="_Blank"
          rel="noreferrer"
        >
          Jakob Owens
        </a>
      </small>
      <small>
        Images from Unsplash by{" "}
        <a
          href="https://unsplash.com/photos/LZykn1xi4ek"
          target="_Blank"
          rel="noreferrer"
        >
          Jeremy Bishop
        </a>
      </small>
    </StyledCredit>
  );
};

export default Footer;
