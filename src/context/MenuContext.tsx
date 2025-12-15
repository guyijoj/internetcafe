import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { categoryWithMenu } from "../types/cart";
import { supabase } from "../libs/supabaseClient";

type MenuContextValue = {
  categories: categoryWithMenu[];
  loading: boolean;
  error: string | null;
  reload: () => void;
};

const MenuContext = createContext<MenuContextValue | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<categoryWithMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCategories() {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("categories")
      .select(
        `
       id,
        name,
        menu_items (
          id,
          category_id,
          name,
          description,
          price,
          weight,
          image_url
        ) `
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Ошибка загрузки меню с бд", error);
      setError(error.message);
      setCategories([]);
    } else if (data) {
      setError(null);
      setCategories(data as unknown as categoryWithMenu[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const value: MenuContextValue = {
    categories,
    loading,
    error,
    reload: loadCategories,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used inside MenuProvider");
  return ctx;
};
