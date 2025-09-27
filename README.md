# 🍔 Menu Pedidos Online

**Lanchonete Online** é um sistema web para pedidos de lanchonete, permitindo que os clientes escolham produtos, montem seu pedido e finalizem de forma prática e rápida via WhatsApp.  
Ideal para lanchonetes que desejam digitalizar seus pedidos e melhorar a experiência do cliente.

---

## 🚀 Funcionalidades
- ✅ Listagem de produtos por categoria (Burguer, bebidas, combo e porções)  
- ✅ CRUD completo  
- ✅ Carrinho de compras  
- ✅ Painel administrativo para gerenciamento de produtos  
- ✅ Integração com banco de dados via Prisma (PostgreSQL)  
- ✅ Pedido com redirecionamento para WhatsApp  
- ✅ Estilização moderna com Tailwind CSS  
- ✅ Responsivo: funciona em desktop e mobile  

---

## 🛠 Tecnologias
- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Banco de dados:** PostgreSQL, Prisma ORM  
- **Deploy:** Render  

---

## 🔗 Endpoints da API
- `GET /admin/` → Acesso ao painel de produtos  
- `POST /login/` → Login obrigatório para acessar admin  
- `GET /api/produtos` → Lista todos os produtos  
- `GET /api/produtos/:id` → Retorna um produto específico  
- `POST /cadastro` → Adiciona um novo produto  
- `PUT /edit` → Atualiza um produto existente  
- `DELETE /delete` → Remove um produto  

---

## 🏗 Estrutura do Projeto
Este é um **projeto monolítico**, ou seja, o frontend e o backend estão no mesmo repositório e rodando juntos.

---

## 🌐 Acesse o Site
[Menu Pedidos Online](https://menu-pedidos.onrender.com)
