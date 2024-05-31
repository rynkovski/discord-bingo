// import { useState } from "react";

function BingoTitle() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="mt-16">
      <h1 className="mb-6 text-4xl font-bold text-center sm:text-6xl">
        Discord Bingo 🎰
      </h1>
      <div className="flex flex-col items-center justify-between gap-4 sm:justify-center sm:flex-row">
        <div className="flex gap-1">
          <p className="font-semibold">Today is:</p>
          <p>{today}</p>
        </div>
      </div>
    </div>
  );
}

export default BingoTitle;
