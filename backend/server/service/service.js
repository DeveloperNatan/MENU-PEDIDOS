// aqui sera feito as funcoes que vao pro banco de dados
// sendo necessario a importacao do prisma
// criacao de funcoes usando os features do prisma ou se caso fosse SQL na mao
// realizar tratamento de erros com codigos
const { parse } = require("path");
const prisma = require("../../data/prisma");
const { resourceLimits } = require("worker_threads");
// criar funcoes

// cadastro
exports.Cadastro = async function (req, res) {
  const { nome, descricao, categoria } = req.body;
  const preco = parseFloat(req.body.preco);
  const imagemurl = req.file ? `/assets/${req.file.filename}` : null;
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

exports.EncontarUm = async function (req, res) {
  try {
    const id = parseInt(req.params.id);
    const result = await prisma.menu.findUnique({
      where: {
        id: id,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(404).redirect("/notfound");
  }
};

exports.EncontarTodos = async function (req, res) {
  try {
    const result = await prisma.menu.findMany();
    res.status(201).json(result);
  } catch (error) {
    res.status(404).redirect("/notfound");
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
    res.status(400).redirect("/error");
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
