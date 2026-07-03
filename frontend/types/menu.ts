//
// TYPES FOR DISHES
//


export interface Tag {
  id: number;
  title: string;
  show_on_card: boolean;
  color_text: string;
  color_bg: string;
  order: number;
}

export interface Dish {
  id: number;
  title: string;
  short_description: string;
  description?: string;
  price: number;
  tags: Tag[];

  images: string[]; // ← главное поле

  category_name?: string;
}

//
// TYPES FOR CATEGORIES
//
export interface Category {
  id: number;
  title: string;
  description: string | null;

  // Django сериализатор возвращает icon как абсолютный URL или null
  icon: string | null;

  // CategoryWithDishesSerializer → dishes: Dish[]
  dishes: Dish[];
}

//
// TYPES FOR COMBO ITEMS
//
export interface Combo {
  id: number;
  title: string;
  short_description: string;
  description: string;
  price: number;

  // ComboListSerializer / ComboDetailSerializer → images: string[]
  images: string[];

  // ComboDetailSerializer → dishes: Dish[]
  dishes?: Dish[];

  // ComboDetailSerializer → category_name
  category_name?: string;
}

//
// TYPES FOR COMBO CATEGORIES
//
export interface ComboCategory {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;

  // ComboCategoryWithCombosSerializer → combos: Combo[]
  combos: Combo[];
}
