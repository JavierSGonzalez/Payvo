-- CreateTable
CREATE TABLE "Incomes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "paymentday" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Incomes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
