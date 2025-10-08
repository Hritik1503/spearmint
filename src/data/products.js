import GalaxyA14 from "../assets/GalaxyA14.jpg"; // relative to products.js
import macbookAirM2 from "../assets/macbookAirM2.jpeg";
import dellInspiron15 from "../assets/dellInspiron15.jpeg";
export const products = [
  {
    id: 1,
    name: "iPhone 13",
    category: "phone",
    price: 799,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935",
  },
  {
    id: 2,
    name: "Samsung Galaxy A14",
    category: "phone",
    price: 299,
    image: GalaxyA14, // use the imported image
  },
  {
    id: 3,
    name: "MacBook Air M2",
    category: "laptop",
    price: 1099,
    image:macbookAirM2,
  },
  {
    id: 4,
    name: "Dell Inspiron 15",
    category: "laptop",
    price: 499,
    image:dellInspiron15,
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    category: "headphones",
    price: 399,
    image: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
  },
];
