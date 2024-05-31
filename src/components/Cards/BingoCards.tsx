import { useGetBingoData } from "@/actions/get-bingo-data";
import BingoCard from "./BingoCard";
import { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBingo } from "@/actions/update-bingo";

type Props = {
  data: TBingoCard[];
};

function BingoCards({ data }: Props) {
  const { data: statusData } = useGetBingoData();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: updateBingoMutation } = useMutation({
    mutationFn: updateBingo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bingo-data"] });
    },
  });

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const card = data[i];
      card.status = statusData[card.column];
    }
    console.log(data);

    if (checkWin(data)) {
      updateBingoMutation({ column: "completed", checked: false });
      toast({
        title: "Bingo!",
        description: "You have a bingo!",
        variant: "success",
      });
    }
  }, [statusData]);

  function checkWin(grid: any): boolean {
    // Check rows
    for (let row = 0; row < 5; row++) {
      const startIndex = row * 5;
      const rowValues = grid.slice(startIndex, startIndex + 5);

      if (rowValues.every((cell: any): any => cell.status)) {
        return true; // Full row found
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      const colValues: string[] = [];
      for (let row = 0; row < 5; row++) {
        colValues.push(grid[row * 5 + col]);
      }
      if (colValues.every((cell: any): any => cell.status)) {
        return true; // Full column found
      }
    }

    // Check diagonals
    const diagonal1: string[] = [
      grid[0],
      grid[6],
      grid[12],
      grid[18],
      grid[24],
    ];
    const diagonal2: string[] = [
      grid[4],
      grid[8],
      grid[12],
      grid[16],
      grid[20],
    ];
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
    <div className="grid grid-cols-5 gap-2 p-2 m-2 bg-gray-300 border border-gray-400 rounded-xl sm:p-8 sm:gap-4">
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
