/*
  Warnings:

  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `amount` on the `Income` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `goal` on the `Savingplan` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `total` on the `Savingplan` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "billingday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expense" ("amount", "billingday", "frequency", "id", "name", "userId") SELECT "amount", "billingday", "frequency", "id", "name", "userId" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "paymentday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("amount", "frequency", "id", "name", "paymentday", "userId") SELECT "amount", "frequency", "id", "name", "paymentday", "userId" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
CREATE TABLE "new_Savingplan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Savingplan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Savingplan" ("frequency", "goal", "id", "total", "userId") SELECT "frequency", "goal", "id", "total", "userId" FROM "Savingplan";
DROP TABLE "Savingplan";
ALTER TABLE "new_Savingplan" RENAME TO "Savingplan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
