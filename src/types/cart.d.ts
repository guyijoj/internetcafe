export type CartItem = {
  id: number; // id блюда
  name: string; // название
  price: number; // цена за 1 шт
  image?: string; // ссылка на фото
  quantity: number; // кол-во
};

export type category = {
  category_id: number;
  category_name: string;
};

export type menuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  weight: number;
  image_url: string;
};

export type categoryWithMenu = category & {
  items: menuItem[];
};
