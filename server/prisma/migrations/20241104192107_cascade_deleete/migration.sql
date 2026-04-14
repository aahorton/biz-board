-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProcessBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "x" REAL NOT NULL DEFAULT 0,
    "y" REAL NOT NULL DEFAULT 0,
    "processId" TEXT NOT NULL,
    CONSTRAINT "ProcessBlock_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProcessBlock" ("data", "id", "name", "processId", "type", "x", "y") SELECT "data", "id", "name", "processId", "type", "x", "y" FROM "ProcessBlock";
DROP TABLE "ProcessBlock";
ALTER TABLE "new_ProcessBlock" RENAME TO "ProcessBlock";
CREATE TABLE "new_ProcessBlockRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "outputId" TEXT NOT NULL,
    "outputPort" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "inputPort" TEXT NOT NULL,
    CONSTRAINT "ProcessBlockRelation_outputId_fkey" FOREIGN KEY ("outputId") REFERENCES "ProcessBlock" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProcessBlockRelation_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "ProcessBlock" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProcessBlockRelation" ("id", "inputId", "inputPort", "outputId", "outputPort") SELECT "id", "inputId", "inputPort", "outputId", "outputPort" FROM "ProcessBlockRelation";
DROP TABLE "ProcessBlockRelation";
ALTER TABLE "new_ProcessBlockRelation" RENAME TO "ProcessBlockRelation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
