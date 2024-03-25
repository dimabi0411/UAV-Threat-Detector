-- CreateTable
CREATE TABLE "Threat" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Threat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plane" (
    "id" SERIAL NOT NULL,
    "icao24" TEXT NOT NULL,
    "callSign" TEXT,
    "originCountry" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "altitude" DOUBLE PRECISION NOT NULL,
    "heading" DOUBLE PRECISION NOT NULL,
    "velocity" DOUBLE PRECISION NOT NULL,
    "onGround" BOOLEAN NOT NULL,
    "squawk" TEXT,
    "threatId" INTEGER NOT NULL,

    CONSTRAINT "Plane_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_threatId_fkey" FOREIGN KEY ("threatId") REFERENCES "Threat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
