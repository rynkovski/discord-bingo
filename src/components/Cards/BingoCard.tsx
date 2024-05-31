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
          className="w-20 h-20 text-xs shadow-md sm:w-full sm:text-md sm:h-24 text-wrap"
          variant={"secondary"}
        >
          {title}
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          className="w-20 h-20 text-xs shadow-md sm:w-full sm:text-md sm:h-24 text-wrap"
          variant={checked ? "secondary" : "destructive"}
        >
          {title}
        </Button>
      )}
    </>
  );
}

export default BingoCard;
