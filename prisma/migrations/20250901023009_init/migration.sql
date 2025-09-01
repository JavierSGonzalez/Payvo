/*
  Warnings:

  - Added the required column `category` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" DECIMAL,
    "category" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "paymentday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("amount", "frequency", "id", "name", "paymentday", "userId") SELECT "amount", "frequency", "id", "name", "paymentday", "userId" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
