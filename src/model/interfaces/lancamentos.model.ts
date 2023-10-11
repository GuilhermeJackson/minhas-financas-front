interface ILancamento {
    id: number;
    descricao: String;
    valor: number;
    tipo: String;
    mes: String;
    status: String;
}

interface ILancamentoCadastro {
    id?: number;
    descricao?: string;
    valor?: number;
    tipo?: string;
    mes?: string;
    ano?: string;
    status?: string
}

interface ILancamentoAtualizado {
    id?: number;
    descricao?: String;
    valor?: number;
    tipo?: String;
    mes?: String;
    ano?: String
}