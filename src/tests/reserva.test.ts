// src/tests/reserva.test.ts
const url_reserva = "http://localhost:3000/api/reservas";

describe("POST /api/reservas - Criar Pedido + Reserva", () => {
    
    test("201 - cria pedido e reserva com sucesso", async () => {
        const res = await fetch(url_reserva, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente_id: 1,         // ⚠️ Certifique-se que existe
                pagamento: "PIX",
                quarto_id: 3,          // ⚠️ Certifique-se que existe
                adicional_id: 2,       // ⚠️ Certifique-se que existe
                inicio: "2026-02-15",
                fim: "2026-02-18"
            })
        });

        expect(res.status).toBe(201);

        const json = await res.json();
        console.log("SUCESSO:", json);

        expect(json).toHaveProperty("pedido_id");
        expect(json).toHaveProperty("reserva_id");
        expect(typeof json.pedido_id).toBe("number");
        expect(typeof json.reserva_id).toBe("number");
    });

    test("400 - campos inválidos", async () => {
        const res = await fetch(url_reserva, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente_id: "abc",      // inválido
                pagamento: 123,         // inválido
                quarto_id: 1,
                adicional_id: 1,
                inicio: "data errada",
                fim: "também errado"
            })
        });

        expect(res.status).toBe(400);

        const json = await res.json();
        console.log("ERRO CAMPOS INVÁLIDOS:", json);

        expect(json).toHaveProperty("erro");
    });

    test("409 - quarto indisponível (conflito de período)", async () => {
        // ⚠️ Isso só funciona se o primeiro teste tiver criado uma reserva
        const res = await fetch(url_reserva, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente_id: 1,
                pagamento: "PIX",
                quarto_id: 3,             // mesmo quarto do teste anterior
                adicional_id: 2,
                inicio: "2026-02-16",    // intervalo que conflita
                fim: "2026-02-17"
            })
        });

        expect(res.status).toBe(409);

        const json = await res.json();
        console.log("CONFLITO ESPERADO:", json);

        expect(json).toHaveProperty("erro");
    });

    test("400 - FK inválida (IDs inexistentes)", async () => {
        const res = await fetch(url_reserva, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente_id: 9999,      // não existe
                pagamento: "PIX",
                quarto_id: 9999,       // não existe
                adicional_id: 9999,    // não existe
                inicio: "2026-02-15",
                fim: "2026-02-18"
            })
        });

        expect(res.status).toBe(400); // FK inválida

        const json = await res.json();
        console.log("FK INVÁLIDA:", json);

        expect(json).toHaveProperty("erro");
    });

});