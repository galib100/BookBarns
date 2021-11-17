import img from "./img/book1.png";
import img1 from "./img/book2.png";
import img2 from "./img/book3.png";
import img3 from "./img/book4.png";

export const ItemList = [
  {
    id: 1,
    image: img,
    title: "The Sherlock Effect",
    author: "R. K. Lyon",
    catagory: "Novel",
    price: "850",
  },
  {
    id: 2,
    image: img1,
    title: "The Sherlock Effect ",
    author: "R. K. Lyon",
    catagory: "Drama",
    price: "850",
  },
  {
    id: 3,
    image: img3,
    title: "the loyal beliefs",
    author: "R. K. logg",
    catagory: "Novel",
    price: "550",
  },
  {
    id: 4,
    image: img,
    title: "The Mechatronics ",
    author: "R.j mechine",
    catagory: "Acedemic",
    price: "553",
  },
  {
    id: 5,
    image: img,
    title: "The Ece book of Ruet ",
    author: "R.j Hedu",
    catagory: "Acedemic",
    price: "555",
  },
  {
    id: 6,
    image: img1,
    title: "The Sherlock Effect ",
    author: "R. K. Lyon",
    catagory: "Drama",
    price: "850",
  },
  {
    id: 7,
    image: img3,
    title: "the loyal beliefs",
    author: "R. K. logg",
    catagory: "Novel",
    price: "550",
  },
  {
    id: 8,
    image: img,
    title: "The Sherlock Effect",
    author: "R. K. Lyon",
    catagory: "Novel",
    price: "850",
  },
  {
    id: 9,
    image: img1,
    title: "The Sherlock Effect ",
    author: "R. K. Lyon",
    catagory: "Drama",
    price: "850",
  },
];

export const selectBooksForBestSeller = () => {
  return ItemList;
};

export const selectBooksForNewArrivals = () => {
    return ItemList;
};

export const selectBooksForOnSale = () => {
    return ItemList;
};

export const selectBooksForPreorder = () => {
    return ItemList;
};

export const selectBooksForTrending = () => {
    return ItemList;
};