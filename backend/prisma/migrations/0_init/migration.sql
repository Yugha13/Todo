-- CreateTable
CREATE TABLE "user" (
    "gmail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "task" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_gmail_key" ON "user"("gmail");

