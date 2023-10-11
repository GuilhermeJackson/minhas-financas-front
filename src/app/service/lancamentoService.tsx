import createApiService from '../apiservice';

const LancamentoService = () => {
    const apiService = createApiService('/api/lancamentos');

    const obterListaMeses = [
        { label: "Selecione...", value: '' },
        { label: "Janeiro", value: '1' },
        { label: "Fevereiro", value: '2' },
        { label: "Março", value: '3' },
        { label: "Abri", value: '4' },
        { label: "Maio", value: '5' },
        { label: "Junho", value: '6' },
        { label: "Julho", value: '7' },
        { label: "Agosto", value: '8' },
        { label: "Setembro", value: '9' },
        { label: "Outubro", value: '10' },
        { label: "Novembro", value: '11' },
        { label: "Dezembro", value: '12' },
    ]

    const obterListaTipos = [
        { label: 'Selecione...', value: '' },
        { label: 'Despesa', value: 'DESPESA' },
        { label: 'Receita', value: 'RECEITA' },
    ];


    const obterPorId = (id: number) => {
        return apiService.get(`/${id}`);
    }

    const alterarStatus = (id?: number, status?: String) => {
        return apiService.put(`/${id}/atualiza-status`, { status });
    }

    const validar = (lancamento: any) => {
        const erros: string[] = [];

        if (!lancamento.ano) {
            erros.push("Informe o Ano.");
        }

        if (!lancamento.mes) {
            erros.push("Informe o Mês.");
        }

        if (!lancamento.descricao) {
            erros.push("Informe a Descrição.");
        }

        if (!lancamento.valor) {
            erros.push("Informe o Valor.");
        }

        if (!lancamento.tipo) {
            erros.push("Informe o Tipo.");
        }

        if (erros.length > 0) {
            throw new Error(erros.toString());
        }
    }

    const salvar = (lancamento: any) => {
        return apiService.post('', lancamento);
    }

    const atualizar = (lancamento: any) => {
        return apiService.put(`/${lancamento.id}`, lancamento);
    }

    const consultar = (lancamentoFiltro: any) => {
        let params = `?ano=${lancamentoFiltro.ano}`;

        if (lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`;
        }

        if (lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`;
        }

        if (lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`;
        }

        if (lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`;
        }

        if (lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`;
        }

        return apiService.get(params);
    }

    // Retorna um objeto com as funções que você deseja acessar externamente

    const deletar = (id: number) => {
        return apiService.delete(`/${id}`);
    }

    return {
        consultar,
        alterarStatus,
        obterListaTipos,
        obterListaMeses,
        deletar,
        validar,
        salvar
    }
}

export default LancamentoService;