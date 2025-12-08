export type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: number;
};

export type MenuItem = {
  id: string;
  label: string;
  iconSrc?: string;
  href?: string;
  items: Item[];
};
export const menu: MenuItem[] = [
  {
    id: "soups",
    label: "Супы",
    items: [
      {
        id: "1",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 490,
      },

      {
        id: "2",
        name: "Бун Ча",
        price: 400,
        image: " public/meal1.webp",
        description: "Жареная свинина с рисовой вермишелью и зеленью",
        weight: 400,
      },
    ],
  },
  {
    id: "snacks",
    label: "Закуски",
    items: [
      {
        id: "3",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "noodles",
    label: "Рис и лапша",
    items: [
      {
        id: "4",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "meat",
    label: "Мясо",
    items: [
      {
        id: "5",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "duck",
    label: "Утка от шефа",
    items: [
      {
        id: "6",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "salads",
    label: "Салаты",
    items: [
      {
        id: "7",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "drinks",
    label: "Напитки",
    items: [
      {
        id: "8",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "dessert",
    label: "Десерты",
    items: [
      {
        id: "9",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "goods",
    label: "Вьетнамсикй рынок",
    items: [
      {
        id: "10",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
  {
    id: "sauce",
    label: "Гарниры и соусы",
    items: [
      {
        id: "11",
        name: "Фо Бо",
        price: 450,
        image: " public/meal1.webp",
        description:
          "Классический вьетнамский суп с говядиной и рисовой лапшой",
        weight: 400,
      },
    ],
  },
];
