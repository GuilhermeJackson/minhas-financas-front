import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';
import LancamentosTable from './lancamento-table';
import LocalStorageService from '../../app/service/localstorageService';
import { IUsuarioLogado } from '../../model/interfaces/usuario.model';
import LancamentoService from '../../app/service/lancamentoService';
import { mensagemErro, mensagemSucesso } from '../../components/toastr';
import { mensagemAlert } from '../../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';


function ConsultaLancamentos() {
    const localStorage = new LocalStorageService();
    const lancamentoService = LancamentoService();
    const navigate = useNavigate();
    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [lancamentoDeletar, setLancamentoDeletar] = useState<ILancamento>();
    const [lancamentos, setLancamentos] = useState<ILancamento[]>([]);


    const buscar = () => {
        if (!ano) {
            mensagemErro('O preenchimento do campo Ano é obrigatório.');
            return false;
        }
        const usuarioLogadoJSON = localStorage.obterItem('_usuario_logado');
        const usuarioLogado: IUsuarioLogado | null = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null;

        if (usuarioLogado !== null) {
            const lancamentoFiltro = {
                ano,
                mes,
                tipo,
                descricao,
                usuario: usuarioLogado.id,
            };

            lancamentoService
                .consultar(lancamentoFiltro)
                .then((resposta) => {
                    if (Array.isArray(resposta.data)) {
                        const lista: ILancamento[] = resposta.data;
                        if (lista.length < 1) {
                            mensagemAlert('Nenhum resultado encontrado.');
                        }
                        setLancamentos(lista);
                    } else {
                        mensagemAlert('A resposta não é um array válido de lançamentos.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const editar = (id?: number) => {
        navigate(`/cadastro-lancamentos/${id}`);
    };

    const abrirConfirmacao = (lancamento: ILancamento) => {
        setLancamentoDeletar(lancamento);
        setShowConfirmDialog(true);
    };

    const cancelarDelecao = () => {
        setShowConfirmDialog(false);
        const lancamento2: Partial<ILancamento> = {}
        setLancamentoDeletar(lancamento2 as ILancamento);
    };

    const deletar = () => {
        if (lancamentoDeletar)
            lancamentoService
                .deletar(lancamentoDeletar.id)
                .then(() => {
                    const updatedLancamentos = lancamentos.filter(
                        (lancamento) => lancamento.id !== lancamentoDeletar.id
                    );
                    setLancamentos(updatedLancamentos);
                    setShowConfirmDialog(false);
                    mensagemSucesso('Lançamento deletado com sucesso!');
                })
                .catch((error) => {
                    console.log("Erro: " + error.message)
                    mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento');
                });

    };

    const preparaFormularioCadastro = () => {
        navigate('/cadastro-lancamentos');
    };

    const alterarStatus = (lancamento: ILancamento, status: string) => {
        lancamentoService
            .alterarStatus(lancamento.id, status)
            .then(() => {
                const index = lancamentos.findIndex((item) => item.id === lancamento.id);
                if (index !== -1) {
                    const updatedLancamentos = [...lancamentos];
                    updatedLancamentos[index].status = status;
                    setLancamentos(updatedLancamentos);
                }
                mensagemSucesso('Status atualizado com sucesso!');
            });
    };

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={cancelarDelecao}
                className="p-button-secondary"
            />
        </div>
    );

    const meses = lancamentoService.obterListaMeses;
    const tipos = lancamentoService.obterListaTipos

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAno"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                placeholder="Digite o Ano"
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu
                                className="form-control"
                                id="inputMes"
                                value={mes}
                                onChange={(e) => setMes(e.target.value)}
                                lista={meses}
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" label="Descrição: ">
                            <input
                                type="text"
                                className="form-control"
                                id="inputDesc"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Digite a descrição"
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                            <SelectMenu
                                id="inputTipo"
                                className="form-control"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                lista={tipos}
                            />
                        </FormGroup>

                        <button
                            onClick={buscar}
                            type="button"
                            className="btn btn-success"
                        >
                            <i className="pi pi-search"></i> Buscar
                        </button>
                        <button
                            onClick={preparaFormularioCadastro}
                            type="button"
                            className="btn btn-danger"
                        >
                            <i className="pi pi-plus"></i> Cadastrar
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable
                            lancamentos={lancamentos}
                            deleteAction={abrirConfirmacao}
                            editAction={editar}
                            alterarStatus={alterarStatus}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    header="Confirmação"
                    visible={showConfirmDialog}
                    style={{ width: '50vw', backgroundColor: 'green' }}
                    footer={confirmDialogFooter}
                    modal={true}
                    onHide={() => setShowConfirmDialog(false)}
                >
                    Confirma a exclusão deste Lançamento?
                </Dialog>
            </div>
        </Card>
    );
}

export default ConsultaLancamentos;
