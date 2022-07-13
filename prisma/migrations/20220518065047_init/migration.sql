/*
  Warnings:

  - You are about to drop the column `onlineMeetingUrl` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "onlineMeetingUrl",
ADD COLUMN     "joinOnlineMeetingUrl" TEXT,
ADD COLUMN     "startOnlineMeetingUrl" TEXT;
