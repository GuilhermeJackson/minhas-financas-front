import { useCallback } from 'react';
import createApiService from '../apiservice';


const useUsuarioService = () => {
    const apiService = createApiService('/api/usuarios');

  const autenticar = useCallback((credenciais: UsuarioLogin) => {
    return apiService.post('/autenticar', credenciais);
  }, [apiService]);

  const obterSaldoPorUsuario = useCallback((id: number) => {
    return apiService.get(`/${id}/saldo`);
  }, [apiService]);

  const salvar = useCallback((usuario: any) => {
    return apiService.post('', usuario);
  }, [apiService]);

  const validar = useCallback((usuario: any) => {
    const erros: string[] = [];

    if (!usuario.nome) {
      erros.push('O campo Nome é obrigatório.');
    }

    if (!usuario.email) {
      erros.push('O campo Email é obrigatório.');
    } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      erros.push('Informe um Email válido.');
    }

    if (!usuario.senha || !usuario.senhaRepeticao) {
      erros.push('Digite a senha 2x.');
    } else if (usuario.senha !== usuario.senhaRepeticao) {
      erros.push('As senhas não batem.');
    }

    // Se você deseja lançar exceções, ajuste essa parte do código
    // throw new ErroValidacao(erros);

    // Retorne os erros ou qualquer outro resultado necessário
    return erros;
  }, []);

  return {
    autenticar,
    obterSaldoPorUsuario,
    salvar,
    validar,
  };
};

export default useUsuarioService;
