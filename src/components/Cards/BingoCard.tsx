import { useState } from "react";
import { Button } from "../ui/button";
import { updateBingo } from "../../actions/update-bingo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function BingoCard({
  column,
  title,
  status,
}: {
  column: string;
  title: string;
  status: boolean;
}) {
  const queryClient = useQueryClient();

  const [checked, setChecked] = useState(status);

  const { mutateAsync: updateBingoMutation } = useMutation({
    mutationFn: updateBingo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bingo-data"] });
    },
  });

  const handleClick = () => {
    setChecked(!checked);
    updateBingoMutation({ column, checked });
  };

  return (
    <>
      {title === "DISCORD" ? (
        <Button
          className="text-xs shadow-md min-w-12 min-h-12 sm:h-24 sm:text-md text-wrap"
          variant={"secondary"}
        >
          {title}
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className="text-xs shadow-md min-w-12 min-h-12 sm:h-24 sm:text-md text-wrap"
          variant={checked ? "secondary" : "destructive"}
        >
          {title}
        </Button>
      )}
    </>
  );
}

export default BingoCard;
