-- CreateTable
CREATE TABLE "TodoProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TodoProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TodoLabel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TodoLabel_pkey" PRIMARY KEY ("id")
);
