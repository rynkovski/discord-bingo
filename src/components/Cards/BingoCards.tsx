import { useGetBingoData } from "@/actions/get-bingo-data";
import BingoCard from "./BingoCard";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  data: TBingoCard[];
};
function BingoCards({ data }: Props) {
  const { data: statusData } = useGetBingoData();
  const { toast } = useToast();

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const card = data[i];
      card.status = statusData[card.column];
    }

    if (checkWin(data)) {
      toast({
        title: "Bingo!",
        description: "You have a bingo!",
        variant: "success",
      });
    }
  }, [statusData]);

  function checkWin(grid: any): boolean {
    // Check rows
    for (let row = 0; row < 4; row++) {
      const startIndex = row * 4;
      const rowValues = grid.slice(startIndex, startIndex + 4);

      if (rowValues.every((cell: any): any => cell.status)) {
        return true; // Full row found
      }
    }

    // Check columns
    for (let col = 0; col < 4; col++) {
      const colValues: string[] = [];
      for (let row = 0; row < 4; row++) {
        colValues.push(grid[row * 4 + col]);
      }
      if (colValues.every((cell: any): any => cell.status)) {
        return true; // Full column found
      }
    }

    // Check diagonals
    const diagonal1: string[] = [grid[0], grid[5], grid[10], grid[15]];
    const diagonal2: string[] = [grid[3], grid[6], grid[9], grid[12]];
    if (
      diagonal1.every((cell: any): any => cell.status) ||
      diagonal2.every((cell: any): any => cell.status)
    ) {
      return true; // Full diagonal found
    }

    return false; // No win condition found
  }

  if (!statusData)
    return (
      <div className="flex justify-center">
        <p className="text-center text-red-500">Loading...</p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-2 p-2 m-2 border rounded-lg sm:p-8 sm:gap-6 bg-amber-50 border-amber-400">
      {data.map((card: TBingoCard) => (
        <BingoCard
          key={card.title}
          status={statusData[card.column]}
          column={card.column}
          title={card.title}
        />
      ))}
    </div>
  );
}

export default BingoCards;
