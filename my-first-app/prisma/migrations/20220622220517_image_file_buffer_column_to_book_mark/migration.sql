/*
  Warnings:

  - You are about to drop the column `is_active` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `screenShotImageBuffer` to the `BookMark` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookMark" ADD COLUMN     "screenShotImageBuffer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "is_active",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
