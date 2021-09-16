import userImg from "../../../Assets/Admin/user.png";
import reviewerImg from "../../../Assets/Admin/reviewer.png";

const data = [
  {
    id: 1,
    name: "Donald Trump",
    image: userImg,
    address: "221B Baker Street....",
    phone: "+8801812345678",
    phone2: "+8801812345678",
    email: "loremipsum@gmail.com",
    reviews: [
      {
        id: 1,
        star: 4,
        name: "Mahir Ashef Vhubon",
        title: "Totally Amazing!",
        image: reviewerImg,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 15,
        dislike: 1,
      },
      {
        id: 2,
        star: 4.5,
        name: "Mahir Ashef",
        image: reviewerImg,
        title: "2 Totally Amazing!",
        description:
          "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 12,
        dislike: 14,
      },
      {
        id: 3,
        star: 5,
        name: "Mahir Ashef Vhubon",
        image: reviewerImg,
        title: "3 Totally Amazing!",
        description:
          "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 17,
        dislike: 31,
      },
    ],
  },
  {
    id: 2,
    name: "Donald Trump 2",
    image: userImg,
    address: "221B Baker Street....",
    phone: "+8801812345678",
    phone2: "+8801812345679",
    email: "loremipsum@gmail.com",
    reviews: [
      {
        id: 1,
        star: 4,
        name: "Mahir Ashef Vhubon",
        image: reviewerImg,
        title: "Totally Amazing!",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 14,
        dislike: 1,
      },
      {
        id: 2,
        star: 4.5,
        name: "Mahir Ashef",
        title: "2 Totally Amazing!",
        image: reviewerImg,
        description:
          "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 5,
        dislike: 16,
      },
      {
        id: 3,
        star: 5,
        name: "Mahir Ashef Vhubon",
        title: "3 Totally Amazing!",
        description:
          "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        image: reviewerImg,
        like: 19,
        dislike: 3,
      },
    ],
  },
  {
    id: 3,
    name: "Donald Trump 3",
    image: userImg,
    address: "221B Baker Street....",
    phone: "+8801812345678",
    phone2: "+8801812345678",
    email: "loremipsum@gmail.com",
    reviews: [
      {
        id: 1,
        star: 4,
        name: "Mahir Ashef Vhubon",
        title: "Totally Amazing!",
        image: reviewerImg,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 5,
        dislike: 12,
      },
      {
        id: 2,
        star: 4.5,
        name: "Mahir Ashef",
        title: "2 Totally Amazing!",
        image: reviewerImg,
        description:
          "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 6,
        dislike: 8,
      },
      {
        id: 3,
        star: 5,
        name: "Mahir Ashef Vhubon",
        title: "3 Totally Amazing!",
        image: reviewerImg,
        description:
          "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida vitae.",
        time: "2 hours ago",
        like: 2,
        dislike: 3,
      },
    ],
  },
];

export default data;
