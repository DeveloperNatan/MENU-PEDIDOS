// aqui sera feito as funcoes que vao pro banco de dados
// sendo necessario a importacao do prisma
// criacao de funcoes usando os features do prisma ou se caso fosse SQL na mao
// realizar tratamento de erros com codigos
const prisma = require("../../data/prisma");
// criar funcoes

// cadastro
exports.Cadastro = async function (req, res) {
  const { nome, descricao, categoria } = req.body;
  const preco = parseFloat(req.body.preco);
  const imagemurl = req.file ? `/assets/${req.file.filename}` : null;
  console.log(req.body);
  try {
    await prisma.menu.create({
      data: {
        nome,
        descricao,
        preco,
        categoria,
        imagemurl: imagemurl,
      },
    });
    res.status(201).redirect("/admin");
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar", details: error.message });
  }
};

// edit
exports.Edit = async function (req, res) {
  const { nome, descricao, categoria, ValueURL } = req.body;
  const preco = parseFloat(req.body.preco);
  const id = parseInt(req.body.id);
  const ImagemURLedit = req.file ? `/assets/${req.file.filename}` : null;

  try {
    const dadosAtualizados = {
      nome: nome,
      descricao: descricao,
      preco: preco,
      categoria: categoria,
      imagemurl: ImagemURLedit || ValueURL,
    };

    await prisma.menu.update({
      where: {
        id: id,
      },
      data: dadosAtualizados,
    });
    res.status(201).redirect("/admin");
  } catch (error) {
    res.status(400).json({ error: "Erro ao editar", details: error.message });
  }
};

// delete
exports.Delete = async function (req, res) {
  const id = parseInt(req.body.id);

  try {
    await prisma.menu.delete({
      where: {
        id: id,
      },
    });
    res.status(201).redirect("/admin");
  } catch (error) {
    res.status(400).json({ error: "Error ao excluir", details: error.message });
  }
};
