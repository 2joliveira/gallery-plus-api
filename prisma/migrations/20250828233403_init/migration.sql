-- CreateTable
CREATE TABLE "public"."Photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PhotosOnAlbums" (
    "photoId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "PhotosOnAlbums_pkey" PRIMARY KEY ("photoId","albumId")
);

-- AddForeignKey
ALTER TABLE "public"."PhotosOnAlbums" ADD CONSTRAINT "PhotosOnAlbums_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "public"."Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PhotosOnAlbums" ADD CONSTRAINT "PhotosOnAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
