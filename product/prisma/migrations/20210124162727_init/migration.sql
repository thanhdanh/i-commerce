-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('Samsung', 'Apple', 'Gigabyte', 'Corsair', 'Intel', 'Adata');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Gray', 'White', 'Gold', 'Black', 'Blue', 'Red', 'Green', 'Pink', 'Purple');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "description" TEXT,
    "brand" "Brand" NOT NULL DEFAULT E'Samsung',
    "color" "Color" NOT NULL DEFAULT E'Gray',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
