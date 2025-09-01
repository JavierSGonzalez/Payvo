/*
  Warnings:

  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `amount` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `paymentday` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" DECIMAL,
    "category" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "billingday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("amount", "billingday", "category", "frequency", "id", "name", "userId") SELECT "amount", "billingday", "category", "frequency", "id", "name", "userId" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" DECIMAL,
    "frequency" TEXT NOT NULL,
    "paymentday" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("amount", "frequency", "id", "name", "paymentday", "userId") SELECT "amount", "frequency", "id", "name", "paymentday", "userId" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
