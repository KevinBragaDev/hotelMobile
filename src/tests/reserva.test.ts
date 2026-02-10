const url_BASE:string = "http://localhost:3000/api/reservas";

test("POST /", async () => {
    const res = await fetch(url_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            pedido_id: 3,
            quarto_id: 2,
            adicional_id: 1,
            fim: "2025-12-31",
            inicio: "2025-01-01"
        })
    });
    expect(res.status).toBe(200);
    const json = await res.json()
    console.log(json);
});