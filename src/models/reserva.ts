export type Reserva = {
    pedido_id: number;
    quarto_id: number;
    adicional_id: number;
    fim: string;
    inicio: string;
}

export type pedido =  {
    usuario_id: number;
    cliente_id: number;
    pagamento: string;
}