/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `InventoryItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InventoryItem_userId_key" ON "InventoryItem"("userId");
