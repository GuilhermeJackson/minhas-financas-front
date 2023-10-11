import { useState } from "react";
import LancamentoService from "../../app/service/lancamentoService";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/select-menu";
import { useNavigate } from "react-router-dom";
import LocalStorageService from "../../app/service/localstorageService";
import { mensagemErro, mensagemSucesso } from "../../components/toastr";
import { IUsuarioLogado } from "../../model/interfaces/usuario.model";


function CadastroLancamento() {
  const lancamentoService = LancamentoService();
  const localStorage = new LocalStorageService();
  const navigate = useNavigate();
  const listaTipos = lancamentoService.obterListaTipos;
  const listaMeses = lancamentoService.obterListaMeses;
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [tipo, setTipo] = useState('');
  const [status] = useState('');
  const [atualizando] = useState(false);

  const submit = () => {
    const usuarioLogadoJSON = localStorage.obterItem('_usuario_logado');
    const usuarioLogado: IUsuarioLogado | null = usuarioLogadoJSON ? JSON.parse(usuarioLogadoJSON) : null;
    if (usuarioLogado) {
      const idUsuarioNumberConvertInteger: number = parseInt(usuarioLogado.id)
      const novoLancamento = {
        usuario_id: idUsuarioNumberConvertInteger,
        descricao,
        valor,
        mes,
        ano,
        tipo,
      };
      try {
        lancamentoService.validar(novoLancamento);
      } catch (erro) {
        mensagemErro((erro as Error).message)
        return false;
      }
      lancamentoService
        .salvar(novoLancamento)

        .then((response) => {
          navigate('/consulta-lancamentos');
          mensagemSucesso('Lançamento cadastrado com sucesso!');
        })
        .catch((error) => {
          mensagemErro(error.response.data);
        });
    }
  };

  return (
    <Card title={atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento'}>
      <div className="row">
        <div className="col-md-12">
          <FormGroup id="inputDescricao" label="Descrição: *" >
            <input id="inputDescricao" type="text"
              className="form-control"
              name="descricao"
              value={descricao}
              onChange={e => { setDescricao(e.target.value) }}
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <FormGroup id="inputAno" label="Ano: *">
            <input id="inputAno"
              type="text"
              name="ano"
              value={ano}
              onChange={e => { setAno(e.target.value) }}
              className="form-control" />
          </FormGroup>
        </div>
        <div className="col-md-6">
          <FormGroup id="inputMes" label="Mês: *">
            <SelectMenu id="inputMes"
              value={mes}
              onChange={e => { setMes(e.target.value) }}
              lista={listaMeses}
              name="mes"
              className="form-control" />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <FormGroup id="inputValor" label="Valor: *">
            <input id="inputValor"
              type="text"
              name="valor"
              value={valor}
              onChange={e => { setValor(e.target.value) }}
              className="form-control" />
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup id="inputTipo" label="Tipo: *">
            <SelectMenu id="inputTipo"
              lista={listaTipos}
              name="tipo"
              value={tipo}
              onChange={e => { setTipo(e.target.value) }}
              className="form-control" />
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup id="inputStatus" label="Status: ">
            <input type="text"
              className="form-control"
              name="status"
              value={status}
              disabled />
          </FormGroup>
        </div>


      </div>
      <div className="row">
        <div className="col-md-6" >
          <button onClick={submit}
            className="btn btn-success">
            <i className="pi pi-save"></i> Salvar
          </button>
          <button onClick={e => navigate('/consulta-lancamentos')}
            className="btn btn-danger">
            <i className="pi pi-times"></i>Cancelar
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CadastroLancamento;