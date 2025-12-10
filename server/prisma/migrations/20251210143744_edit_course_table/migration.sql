/*
  Warnings:

  - Added the required column `enrolmentCount` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructor` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_description_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "enrolmentCount" INTEGER NOT NULL,
ADD COLUMN     "instructor" TEXT NOT NULL;
