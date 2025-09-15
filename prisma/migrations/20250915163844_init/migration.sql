-- CreateTable
CREATE TABLE "public"."Photo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhotoOnAlbum" (
    "photoId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "PhotoOnAlbum_pkey" PRIMARY KEY ("photoId","albumId")
);

-- AddForeignKey
ALTER TABLE "public"."PhotoOnAlbum" ADD CONSTRAINT "PhotoOnAlbum_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "public"."Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PhotoOnAlbum" ADD CONSTRAINT "PhotoOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
