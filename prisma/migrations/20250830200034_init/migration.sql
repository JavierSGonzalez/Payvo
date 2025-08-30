-- CreateTable
CREATE TABLE "Savingplan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "goal" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Savingplan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Selecciondos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "savingplanId" INTEGER NOT NULL,
    CONSTRAINT "Selecciondos_savingplanId_fkey" FOREIGN KEY ("savingplanId") REFERENCES "Savingplan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Botondos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "selecciondosId" INTEGER NOT NULL,
    CONSTRAINT "Botondos_selecciondosId_fkey" FOREIGN KEY ("selecciondosId") REFERENCES "Selecciondos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Selecciondos_savingplanId_key" ON "Selecciondos"("savingplanId");
