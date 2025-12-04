
const URL_BASE:string = "http://localhost:3000/tarefas"

const nova_Tarefa = {
  nome: "Nome da tarefa",
  descricao: "Descrição da tarefa",
}
const tarefa_atualizada = {
  nome: "Nome da tarefa atualizada",
  descricao: "Descrição atualizada da tarefa",
}

let tarefa_id: number = 0


test("GET: /tarefas = 200", async () => {
  const res = await fetch(URL_BASE)
  expect(res.status).toBe(200)
  
  const body = await res.json()
  expect(Array.isArray(body)).toBe(true)
})

test("POST: /tarefas = 201 (criar tarefa)", async () => {
  const res = await fetch(URL_BASE, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(nova_Tarefa)
  })
  expect(res.status).toBe(201)

  const content = await res.json()
  tarefa_id = content.id
  expect(content).toHaveProperty("id")
  expect(content).toHaveProperty("nome")
  expect(content).toHaveProperty("descricao")
})
   
test("GET: /tarefas/1 = 200", async () => {
  const res = await fetch(`${URL_BASE}/${tarefa_id}`)
  expect(res.status).toBe(200);

  const content = await res.json()
  expect(content).toHaveProperty("id")
  expect(content).toHaveProperty("nome", nova_Tarefa["nome"])
  expect(content).toHaveProperty("descricao" , nova_Tarefa["descricao"])
})

test("PUT: /tarefas/1 = 201 (atualizar tarefa)", async () => {
  const res = await fetch(`${URL_BASE}/${tarefa_id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(tarefa_atualizada)
  })
  expect(res.status).toBe(201);
})

test("DELETE: /tarefas/1 = 200 (deletar tarefa)", async () => {
  const res = await fetch(`${URL_BASE}/${tarefa_id}`, {
    method: "DELETE",
  })
  expect(res.status).toBe(200);

  const content = await res.json()
  expect(content).toHaveProperty("id")
  expect(content).toHaveProperty("nome")
  expect(content).toHaveProperty("descricao")
})

//----------TESTES PARA ERROS----------//

test("GET:/tarefas/id ==404", async() => {
  const res =  await fetch(`${URL_BASE}/9999`)
  expect (res.status).toBe (404)
})

test("POST: /tarefas = 400", async () => {
 const res = await fetch(URL_BASE, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({})
  })
  expect(res.status).toBe(400);

  const content = await res.json()
  console.log(content)
  expect(content).toHaveProperty("erro","dados incompletos")
})
 