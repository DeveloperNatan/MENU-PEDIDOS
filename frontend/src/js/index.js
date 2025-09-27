const container = document.getElementById("menu-container");
const OpenModalEdit = document.getElementById("OpenModalEdit");
const ModalEditdiv = document.getElementById("ModalEdit");
const DivModalCreate = document.getElementById("ModalCreate");
const ButtonNovoItem = document.getElementById("button-novo-item");
const ButtonClose = document.getElementById("Button-close");
const ButtonHome = document.getElementById("menu-inicial");
const DivBurguer = document.getElementById("DivBurguer");
const DivBebidas = document.getElementById("DivBebidas");
const DivCombo = document.getElementById("DivCombo");
const DivPorcao = document.getElementById("DivPorcao");

// listagem
async function FetchApiMenu() {
  try {
    const url = "/api/produtos";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API resquest failed, status: ${response.status}`);
    }

    const menu = await response.json();

    menu.forEach((menu) => {
      const menuItens = document.createElement("div");
      menuItens.className =
        "grid grid-cols-4 w-full text-black bg-gray-100 border-b border-gray-300 p-2 text-center";

      menuItens.innerHTML = `
   
    <span class="my-auto">${menu.nome}</span>
    <span class="my-auto">R$${menu.preco}</span>
    <span class="my-auto">${menu.categoria}</span>
    <div class="flex justify-center gap-2 my-auto">
      <form method="post" action="/delete">
        <input type="hidden" name="id" value="${menu.id}" />
        <button type="submit"
          class="bg-red-500 h-full text-white p-1 rounded-sm hover:bg-red-400 cursor-pointer button-excluir">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </form>
      <button class="bg-gray-400 text-gray-800 p-1 rounded-sm cursor-pointer hover:bg-gray-300"
        onclick="OpenModal(${menu.id})" id="OpenModalEdit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
      `;

      switch (menu.categoria) {
        case "Burguer":
          DivBurguer.appendChild(menuItens);
          break;
        case "Bebidas":
          DivBebidas.appendChild(menuItens);
          break;
        case "Combo":
          DivCombo.appendChild(menuItens);
          break;
        case "Porcoes":
          DivPorcao.appendChild(menuItens);
          break;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

// Modal Create
async function ModalCreate() {
  DivModalCreate.innerHTML = `
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full mx-4">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Adicionar Produtos
        </h1>
        <form action="/cadastro" method="post" class="space-y-4" enctype="multipart/form-data">
            <div class="hidden">
                <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
                <input type="text" name="id" id="menu-id"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="nome" id="menu-name" placeholder="Nome do produto"
                    class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição</label>
                <input type="text" name="descricao" id="menu-description" placeholder="Descrição do produto"
                    class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label for="preco" class="block text-sm font-medium text-gray-700">Preço</label>
                <input type="number" min="0" step="0.01" name="preco" id="menu-price" placeholder="Preço do produto"
                    class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div>
                <label for="categoria" class="block text-sm font-medium text-gray-700">Categoria</label>
                <select name="categoria" id="menu-category"
                    class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    <option value="Burguer">Burguer</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Combo">Combo</option>
                    <option value="Porcoes">Porções</option>
                </select>
            </div>
            <div>
                <label for="ImagemURL" class="block text-sm font-medium text-gray-700">Imagem</label>
                <input type="file" name="ImagemURLedit" id="ImagemURLedit" class="border w-full p-1 rounded-sm">
                <div id="Stylepreview" class="flex justify-center w-20 h-20 px-1 py-1">
                    <input type="text" name="ValueURL" class="hidden">
                    <img id="ImagemURL" src="" alt="" class="w-3xs">
                </div>
                <!-- notices -->
                <div>
                    <p class="text-red-500 hidden" id="warn-nome">⚠️ O nome do produto é obrigatório.</p>
                    <p class="text-red-500 hidden" id="warn-descricao">⚠️ A descrição não pode estar vazia.</p>
                    <p class="text-red-500 hidden" id="warn-preco">⚠️ Informe um preço válido (ex: 10.99).</p>
                </div>
                <div class="flex justify-center mt-4">
                    <div class="w-full my-auto">
                        <button type="submit" id="Submit-Create"
                            class="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer">
                            Adicionar
                        </button>
                    </div>
                    <div class="w-full my-auto">
                        <input type="button" id="Button-close" value="Fechar" onclick="CloseModalCreate()"
                            class="bg-red-500 text-white py-2 px-4 w-full rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer" />
                    </div>
                </div>
        </form>
    </div>
</div>
  `;

  const SubmitCreate = document.getElementById("Submit-Create");
  const ImagemURLedit = document.getElementById("ImagemURLedit");
  const ImagemURL = document.getElementById("ImagemURL");
  const InputNome = document.getElementById("menu-name");
  const InputDescricao = document.getElementById("menu-description");
  const InputPreco = document.getElementById("menu-price");
  const WarnNome = document.getElementById("warn-nome");
  const WarnDescricao = document.getElementById("warn-descricao");
  const WarnPreco = document.getElementById("warn-preco");
  const form = DivModalCreate.querySelector("form");

  // preview change img
  ImagemURLedit.addEventListener("change", () => {
    const file = ImagemURLedit.files[0];
    if (file) {
      const ImageURL = URL.createObjectURL(file);
      ImagemURL.src = ImageURL;
    }
  });

  // validacao
  form.addEventListener("submit", (e) => {
    let isValid = true;

    ClearWarnings();

    if (InputNome.value.trim() === "") {
      WarnNome.classList.remove("hidden");
      isValid = false;
    }

    if (InputDescricao.value.trim() === "") {
      WarnDescricao.classList.remove("hidden");
      isValid = false;
    }

    if (InputPreco.value.trim() === "" || parseFloat(InputPreco.value) <= 0) {
      WarnPreco.classList.remove("hidden");
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault();
      return;
    }
  });
  function ClearWarnings() {
    [WarnNome, WarnDescricao, WarnNome].forEach((warn) =>
      warn.classList.add("hidden")
    );
  }
}

// Modal edit
async function ModalEdit(id) {
  try {
    const url = `/api/produtos/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed, status:${response.status}`);
    }

    const menu = await response.json();

    const ModalEdit = document.getElementById("ModalEdit");

    ModalEdit.innerHTML = `
  <div class="fixed inset-0 flex items-center justify-center z-50 ">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        Editar Produtos
      </h1>
      <form action="/edit" method="post" enctype="multipart/form-data" class="space-y-4">
        <div class="hidden">
          <label for="id" class="block text-sm font-medium text-gray-700">ID</label>
          <input type="text" name="id" value="${menu.id}"
            class="mt-1 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" name="nome" id="menu-name" value="${menu.nome}"
            class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
          <input type="text" name="descricao" id="menu-description" value="${
            menu.descricao
          }"
            class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
          <input type="number" min="0" step="0.01" name="preco" id="menu-price" value="${
            menu.preco
          }"
            class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>
          <select name="categoria" id="menu-category"
            class="mt-1 p-2 block w-full rounded-md shadow border border-black bg-white text-gray-800 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            <option ${
              menu.categoria === "Burguer" ? "selected" : ""
            } value="Burguer">Burguer</option>
            <option ${
              menu.categoria === "Bebidas" ? "selected" : ""
            } value="Bebidas">Bebidas</option>
            <option ${
              menu.categoria === "Combo" ? "selected" : ""
            } value="Combo">Combo</option>
            <option ${
              menu.categoria === "Porcoes" ? "selected" : ""
            } value="Porcoes">Porções</option>
          </select>
        </div>
        <div>
          <label for="ImagemURL" class="block text-sm font-medium text-gray-700">Imagem</label>
          <input type="file" name="ImagemURLedit" id="ImagemURLedit" class="border p-1 rounded-sm w-full">
          <div id="Stylepreview" class="flex justify-center h-20 w-20 px-1 py-1">
            <input type="text" name="ValueURL" class="hidden" value="${
              menu.imagemurl
            }">
            <img id="ImagemURL" src="../views${
              menu.imagemurl
            }" alt="" class="w-3xs">
          </div>
        </div>
        <div class="flex justify-center mt-2 space-x-2">
          <div class="w-full">
            <button type="submit"
              class="w-full bg-gray-700 text-white py-2 px-4 rounded-md shadow hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer">
              Finalizar
            </button>
          </div>
          <div class="w-full">
            <input type="button" onclick="CloseModal()" value="Cancelar"
              class="w-full bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer" />
          </div>
        </div>
      </form>
    </div>
  </div>
`;

    const ImagemURLedit = document.getElementById("ImagemURLedit");
    const ImagemURL = document.getElementById("ImagemURL");
    ImagemURLedit.addEventListener("change", () => {
      const file = ImagemURLedit.files[0];
      if (file) {
        const ImageURL = URL.createObjectURL(file);
        ImagemURL.src = ImageURL;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function OpenModal(id) {
  ModalEditdiv.classList.remove("hidden");
  ModalEditdiv.classList.add("flex");
  ModalEdit(id);
}

function CloseModal() {
  ModalEditdiv.classList.remove("flex");
  ModalEditdiv.classList.add("hidden");
}

ButtonNovoItem.onclick = function () {
  DivModalCreate.classList.remove("hidden");
  DivModalCreate.classList.add("flex");
  ModalCreate();
};

function CloseModalCreate() {
  DivModalCreate.classList.remove("flex");
  DivModalCreate.classList.add("hidden");
}

ButtonHome.onclick = function () {
  window.location.href = window.location.origin;
};

// lib
document.body.addEventListener("click", (event) => {
  const button = event.target.closest(".button-excluir");
  if (button) {
    event.preventDefault(); // previne ação padrão para esperar confirmação

    Swal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Se confirmou, envia o formulário
        event.target.closest("form").submit();
      }
      // Se cancelou, não faz nada
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  FetchApiMenu();
});
