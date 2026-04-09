-- CreateTable
CREATE TABLE "Process" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProcessBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    CONSTRAINT "ProcessBlock_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProcessBlockRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "outputId" TEXT NOT NULL,
    "outputPort" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "inputPort" TEXT NOT NULL,
    CONSTRAINT "ProcessBlockRelation_outputId_fkey" FOREIGN KEY ("outputId") REFERENCES "ProcessBlock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProcessBlockRelation_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "ProcessBlock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
