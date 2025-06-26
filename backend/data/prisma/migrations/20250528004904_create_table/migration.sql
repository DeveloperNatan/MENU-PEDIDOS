-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "categoria" TEXT NOT NULL,
    "imagemurl" TEXT,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);
