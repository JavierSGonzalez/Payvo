-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Incomes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "paymentday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Incomes" ("amount", "frequency", "id", "name", "paymentday", "userId") SELECT "amount", "frequency", "id", "name", "paymentday", "userId" FROM "Incomes";
DROP TABLE "Incomes";
ALTER TABLE "new_Incomes" RENAME TO "Incomes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
