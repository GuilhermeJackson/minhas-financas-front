interface ILancamento {
    id: number;
    descricao: string;
    valor: number;
    tipo: string;
    mes: string;
    status: string;
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

interface ILancamentoEditar {
    id?: number;
    descricao?: string;
    valor?: number;
    tipo?: string;
    mes?: string;
    ano?: string
    status?: string
    usuario_id?: string
}