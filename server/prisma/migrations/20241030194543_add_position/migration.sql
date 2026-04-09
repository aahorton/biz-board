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
    CONSTRAINT "ProcessBlock_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProcessBlock" ("data", "id", "name", "processId", "type") SELECT "data", "id", "name", "processId", "type" FROM "ProcessBlock";
DROP TABLE "ProcessBlock";
ALTER TABLE "new_ProcessBlock" RENAME TO "ProcessBlock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
