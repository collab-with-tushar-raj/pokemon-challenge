/*
  Warnings:

  - You are about to drop the column `types` on the `Pokemon` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    CONSTRAINT "Types_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "specialAttack" INTEGER NOT NULL,
    "specialDefense" INTEGER NOT NULL
);
INSERT INTO "new_Pokemon" ("attack", "defense", "hp", "id", "name", "pokemonId", "specialAttack", "specialDefense", "speed") SELECT "attack", "defense", "hp", "id", "name", "pokemonId", "specialAttack", "specialDefense", "speed" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
