-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "about" TEXT,
    "imageUrl" TEXT,
    "backgroundUrl" TEXT,
    "address" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "tiktokName" TEXT,
    "twitterName" TEXT,
    "vkName" TEXT,
    "telegramName" TEXT,
    "instagramName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "shopName" TEXT NOT NULL,
    "shopUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "isGifted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "giftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gifterId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
