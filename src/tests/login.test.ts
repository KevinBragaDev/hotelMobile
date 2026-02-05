const url_base:string = "http://localhost:3000/api/login";
 
test("POST /", async () => {
    const res = await fetch(url_base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        email: "teste2@gmail.com",
        senha: "123"})
    });
    expect(res.status).toBe(200);
    const json = await res.json()
    console.log(json);
    // const body = await res.json();
    // expect(body.message).toBe("Login recebido com sucesso");
 
});