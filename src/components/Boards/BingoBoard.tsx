import { useGetBingoData } from "../../actions/get-bingo-data";
import BingoCard from "../Cards/BingoCard";
import BingoSkeleton from "../Skeletons/BingoSkeleton";

const bingoOptions = [
  { column: "loldle", title: "loldle", status: false },
  { column: "pokedle", title: "pokedle", status: false },
  { column: "stop_cham", title: "stop cham", status: false },
  { column: "tft", title: "tft", status: false },
  { column: "wyslane_cv", title: "wyslane cv", status: false },
  { column: "dzieki_za_dzisiaj", title: "dzieki za dzisiaj", status: false },
  { column: "szymek_fomo", title: "szymek fomo", status: false },
  { column: "jolie_jolie", title: "jolie jolie", status: false },
  { column: "classcat", title: "classcat", status: false },
  { column: "larox_barman", title: "larox barman", status: false },
  { column: "kosa_szymek_daniel", title: "kosa szymek-daniel", status: false },
  { column: "tirem", title: "{...} tirem", status: false },
  { column: "object_object", title: "[Object object]", status: false },
  { column: "stylowanie_buttona", title: "stylowanie buttona", status: false },
  { column: "pisanie_endpointow", title: "pisanie endpointow", status: false },
  {
    column: "daniel_wejdzie_na_disc",
    title: "daniel wejdzie na disc",
    status: false,
  },
];

function BingoBoard() {
  const { data, isLoading } = useGetBingoData();

  // Hashing function to generate a unique hash based on the input string
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

  // Function to shuffle an array using Fisher-Yates algorithm
  function shuffleArray<T>(array: T[], seed: number): T[] {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue: T;
    let randomIndex: number;

    // Use the seeded random number generator
    const seededRandom = (max: number) => {
      const x = Math.sin(seed++) * 10000;
      return Math.floor((x - Math.floor(x)) * max);
    };

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = seededRandom(currentIndex);
      currentIndex--;

      // And swap it with the current element.
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }

  // Example usage

  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const hash = hashString(currentDate);
  const shuffledBingoCards = shuffleArray(bingoOptions, hash);

  // Example bingo grid represented as a 1-dimensional array

  // Function to check for a win condition (e.g., a full row)
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

  // console.log(data);
  // const bingoWin = Object.entries(data);
  // console.log(shuffledBingoCards); // Check if there's a win condition
  // console.log(bingoWin); // Check if there's a win condition
  // console.log(checkWin(shuffledBingoCards)); // Check if there's a win condition

  return (
    <>
      {isLoading ? (
        <BingoSkeleton />
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {shuffledBingoCards?.map((board: any) => (
            <BingoCard
              key={board.title}
              status={data[board.column]}
              column={board.column}
              title={board.title}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default BingoBoard;
