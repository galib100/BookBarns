import books from "./books";
import users from "./users";

const data = [
  {
    id: 1,
    date: "16-06-2021",
    phone: "+88-01812-345678",
    address: "221B Baker Street London, UK",
    status: "placed",
    client: users[0],
    order: [
      {
        id: 1,
        book: books[0],
        quantity: 2,
        discounted_price: books[0].price * (1 - books[0].discount / 100),
      },
      {
        id: 2,
        book: books[2],
        quantity: 3,
        discounted_price: books[2].price * (1 - books[2].discount / 100),
      },
      {
        id: 3,
        book: books[6],
        quantity: 1,
        discounted_price: books[6].price * (1 - books[6].discount / 100),
      },
    ],
  },
  {
    id: 2,
    date: "16-06-2021",
    phone: "+88-01812-345678",
    address: "221B Baker Street London, UK",
    status: "processing",
    client: users[0],
    order: [
      {
        id: 1,
        book: books[4],
        quantity: 2,
        discounted_price: books[4].price * (1 - books[4].discount / 100),
      },
      {
        id: 2,
        book: books[3],
        quantity: 3,
        discounted_price: books[3].price * (1 - books[3].discount / 100),
      },
      {
        id: 3,
        book: books[8],
        quantity: 1,
        discounted_price: books[8].price * (1 - books[8].discount / 100),
      },
    ],
  },
  {
    id: 3,
    date: "16-06-2021",
    phone: "+88-01812-345678",
    address: "221B Baker Street London, UK",
    status: "shipped",
    client: users[0],
    order: [
      {
        id: 1,
        book: books[0],
        quantity: 2,
        discounted_price: books[0].price * (1 - books[0].discount / 100),
      },
      {
        id: 2,
        book: books[2],
        quantity: 3,
        discounted_price: books[2].price * (1 - books[2].discount / 100),
      },
      {
        id: 3,
        book: books[3],
        quantity: 1,
        discounted_price: books[3].price * (1 - books[3].discount / 100),
      },
    ],
  },
  {
    id: 4,
    date: "16-06-2021",
    phone: "+88-01812-345678",
    address: "221B Baker Street London, UK",
    status: "pending",
    client: users[0],
    order: [
      {
        id: 1,
        book: books[0],
        quantity: 2,
        discounted_price: books[0].price * (1 - books[0].discount / 100),
      },
      {
        id: 2,
        book: books[4],
        quantity: 3,
        discounted_price: books[4].price * (1 - books[4].discount / 100),
      },
      {
        id: 3,
        book: books[4],
        quantity: 1,
        discounted_price: books[6].price * (1 - books[6].discount / 100),
      },
    ],
  },
  {
    id: 5,
    date: "16-06-2021",
    phone: "+88-01812-345678",
    address: "221B Baker Street London, UK",
    status: "delivered",
    client: users[0],
    order: [
      {
        id: 1,
        book: books[0],
        quantity: 2,
        discounted_price: books[0].price * (1 - books[0].discount / 100),
      },
      {
        id: 2,
        book: books[2],
        quantity: 3,
        discounted_price: books[2].price * (1 - books[2].discount / 100),
      },
      {
        id: 3,
        book: books[6],
        quantity: 1,
        discounted_price: books[6].price * (1 - books[6].discount / 100),
      },
    ],
  },
];

export default data;
