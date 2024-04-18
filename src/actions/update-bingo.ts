import { supabase } from "@/utils/supabase";

type Props = {
  column: string;
  checked: boolean;
};

const today = new Date().toISOString().slice(0, 10);

export async function updateBingo({ column, checked }: Props) {
  const { data } = await supabase
    .from("daily_bingo")
    .update({ [column]: !checked })
    .eq("date", today)
    .select();
  return data;
}
