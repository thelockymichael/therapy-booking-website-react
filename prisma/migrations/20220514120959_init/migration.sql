/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `bookingHolderId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `therapistId` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_bookingHolderId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_therapistId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "bookingHolderId" SET NOT NULL,
ALTER COLUMN "therapistId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BookingHolder" ALTER COLUMN "streetAddress" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Therapist" ALTER COLUMN "streetAddress" DROP NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_bookingHolderId_fkey" FOREIGN KEY ("bookingHolderId") REFERENCES "BookingHolder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
