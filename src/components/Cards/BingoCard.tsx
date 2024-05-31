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
    <Button
      onClick={handleClick}
      className="text-xs shadow-md sm:text-md sm:h-24"
      variant={checked ? "secondary" : "destructive"}
    >
      {title}
    </Button>
  );
}

export default BingoCard;
