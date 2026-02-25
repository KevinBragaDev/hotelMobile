const url_pedido: string = "http://localhost:3000/api/pedidos";

test("POST /pedidos = 201 - cria um pedido", async () => {
    // Fazer login para obter token
    const loginRes = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "teste2@gmail.com",
            senha: "123"
        })
    });
    expect(loginRes.status).toBe(200);
    const token = await loginRes.json();
    console.log("Token recebido:", token);

    // Criar pedido com o token
    const res = await fetch(url_pedido, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            cliente_id: 1,
            pagamento: "PIX"
        })
    });

    const json = await res.json();
    console.log("Resposta do POST /pedidos:", json);
    console.log("Status recebido:", res.status);

    expect(res.status).toBe(201);

    expect(json).toHaveProperty("mensagem");
    expect(json).toHaveProperty("pedido_id");
    expect(typeof json.pedido_id).toBe("number");
});