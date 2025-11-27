class Tarefa {
  id: number;
  nome: string;
  descricao: string;

  private static proximoID = 1;

  constructor(nome: string, descricao: string){
    this.id = Tarefa.proximoID++;
    this.nome = nome;
    this.descricao = descricao;
  }
}
export default Tarefa;
