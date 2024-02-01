/*
  Warnings:

  - A unique constraint covering the columns `[pokemonId]` on the table `Pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_pokemonId_key" ON "Pokemon"("pokemonId");
