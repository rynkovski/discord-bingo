import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const today = new Date().toISOString().slice(0, 10);

export const getBingoData = async () => {
  const { data }: any = await supabase
    .from("daily_bingo")
    .select("*")
    .eq("date", today);

  return createNewRow(data);
};

export const useGetBingoData = () => {
  const queryFN = () => getBingoData();
  return useQuery({
    queryKey: ["bingo-data"],
    queryFn: queryFN,
    refetchOnWindowFocus: false,
    retry: 0,
  });
};

async function createNewRow(data: any) {
  if (data === undefined || data.length === 0) {
    const { data }: any = await supabase
      .from("daily_bingo")
      .insert([{ date: today }])
      .select();
    return data[0];
  } else {
    return data[0];
  }
}
