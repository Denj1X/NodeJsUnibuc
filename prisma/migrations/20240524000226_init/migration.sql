/*
  Warnings:

  - You are about to drop the column `hotelId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurantId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_hotelId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hotelId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "hotelId",
DROP COLUMN "roomId",
ADD COLUMN     "restaurantId" INTEGER NOT NULL,
ADD COLUMN     "tableId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Hotel";

-- DropTable
DROP TABLE "Room";

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "available_tables" INTEGER NOT NULL,
    "allowPets" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "reservedOn" TIMESTAMP(3),
    "availableFrom" TIMESTAMP(3) NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "allowPets" BOOLEAN NOT NULL,
    "offersParkingSpot" BOOLEAN NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;
