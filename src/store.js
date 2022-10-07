import { createRef } from "react";

import image1 from "./assets/1.jpg";
import image2 from "./assets/2.jpg";
import image3 from "./assets/3.jpg";

const state = {
  sections: 4,
  pages: 4,
  zoom: 75,
  top: createRef(),
  projects: [
    {
      offset: 1,
      factor: 1.5,
      header: "Deep",
      image: image1,
      aspect: 1.51,
      text: "I'm baby vibecession four dollar toast dreamcatcher tote bag distillery keffiyeh forage franzen austin kale chips fit brunch fam craft beer. Jianbing ennui pug mustache. Food truck authentic man bun poutine hammock pork belly intelligentsia aesthetic.",
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Diving",
      image: image2,
      aspect: 1.5,
      text: "I'm baby vibecession four dollar toast dreamcatcher tote bag distillery keffiyeh forage franzen austin kale chips fit brunch fam craft beer. Jianbing ennui pug mustache. Food truck authentic man bun poutine hammock pork belly intelligentsia aesthetic.",
    },
    {
      offset: 3,
      factor: 1.5,
      header: "Exploration",
      image: image3,
      aspect: 1.5037,
      text: "I'm baby vibecession four dollar toast dreamcatcher tote bag distillery keffiyeh forage franzen austin kale chips fit brunch fam craft beer. Jianbing ennui pug mustache. Food truck authentic man bun poutine hammock pork belly intelligentsia aesthetic.",
    },
  ],
};

export default state;
