
test("POST /api/reserva = 200", async () => {
    const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify ({
        email: "teste2@gmail.com",
        senha: "123"}
        )
    });
    expect(res.status).toBe(200);
    const token = await res.json()
    console.log(token);
    
    // const body = await res.json();
    // expect(body.message).toBe("Login recebido com sucesso");
    
    const resp = await fetch("http://localhost:3000/api/reservas", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            pagamento: "pix",
            quartos: [
                {
                    id: 5,
                    dataInicio: "2024-07-01",
                    dataFim: "2024-07-05",
                },
                {
                    id: 9,
                    dataInicio: "2024-07-02",
                    dataFim: "2024-07-06",
                }
            ]
        })
    })
    expect(resp.status).toBe(200);
    const json = await resp.json();
    console.log(json);
});

    