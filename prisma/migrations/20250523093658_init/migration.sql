-- CreateTable
CREATE TABLE "specialists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cal_user_id" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT,
    "photo_url" TEXT,
    "bio" TEXT,
    "price_per_session" INTEGER,
    "city" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "education" TEXT,
    "certifications" TEXT NOT NULL,
    "specializations" TEXT NOT NULL,
    "therapy_methods" TEXT NOT NULL,
    "experience_years" INTEGER,
    "offers_online" BOOLEAN NOT NULL DEFAULT false,
    "offers_in_person" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "contact_requests" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "specialist_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "contact_requests_specialist_id_fkey" FOREIGN KEY ("specialist_id") REFERENCES "specialists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "specialists_cal_user_id_key" ON "specialists"("cal_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "specialists_email_key" ON "specialists"("email");
