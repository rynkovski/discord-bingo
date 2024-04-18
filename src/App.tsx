import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BingoBoard from "./components/Boards/BingoBoard";
import BingoTitle from "./components/Titles/BingoTitle";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center gap-8">
        <BingoTitle />
        <BingoBoard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
