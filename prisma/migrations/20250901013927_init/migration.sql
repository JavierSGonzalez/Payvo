/*
  Warnings:

  - You are about to alter the column `goal` on the `Savingplan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.
  - You are about to alter the column `total` on the `Savingplan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Savingplan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" DECIMAL,
    "frequency" TEXT NOT NULL,
    "total" DECIMAL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Savingplan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Savingplan" ("frequency", "goal", "id", "total", "userId") SELECT "frequency", "goal", "id", "total", "userId" FROM "Savingplan";
DROP TABLE "Savingplan";
ALTER TABLE "new_Savingplan" RENAME TO "Savingplan";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
