import { useGetBingoData } from "../../actions/get-bingo-data";
import BingoSkeleton from "../Skeletons/BingoSkeleton";
import { defaultBingoOptions } from "@/lib/constants";
import BingoCards from "../Cards/BingoCards";
import { useToast } from "../ui/use-toast";

function BingoBoard() {
  const { isLoading, isError, error: errorMessage } = useGetBingoData();
  const { toast } = useToast();

  function hashString(input: string): number {
    let hash = 0;
    if (input.length === 0) return hash;

    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }

  function shuffleArray<T>(array: T[], seed: number): T[] {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue: T;
    let randomIndex: number;

    const seededRandom = (max: number) => {
      const x = Math.sin(seed++) * 10000;
      return Math.floor((x - Math.floor(x)) * max);
    };

    while (currentIndex !== 0) {
      randomIndex = seededRandom(currentIndex);
      currentIndex--;

      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  const hash = hashString(currentDate);
  const shuffledBingoCards = shuffleArray(defaultBingoOptions, hash);

  if (isError) {
    toast({
      title: "Error!",
      description: `Something went wrong ${errorMessage}!`,
      variant: "destructive",
    });
  }

  return (
    <>
      {isLoading ? <BingoSkeleton /> : <BingoCards data={shuffledBingoCards} />}
    </>
  );
}

export default BingoBoard;
