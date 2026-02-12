const url_pedido: string = "http://localhost:3000/api/pedidos";

test("POST /pedidos = 201 - cria um pedido", async () => {
    const res = await fetch(url_pedido, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: 1,
            cliente_id: 4,
            pagamento: "PIX"
        })
    });

    expect(res.status).toBe(201);

    const json = await res.json();
    console.log(json);

    expect(json).toHaveProperty("mensagem");
    expect(json).toHaveProperty("pedido_id");
    expect(typeof json.pedido_id).toBe("number");
});