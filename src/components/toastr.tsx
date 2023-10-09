import toastr from 'toastr';

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

// Defina um tipo de união para os tipos de mensagem
type ToastrMessageType = 'error' | 'success' | 'warning' | 'info';

export function mostrarMensagem(titulo: string, mensagem: string, tipo: ToastrMessageType) {
  if (tipo === 'error') {
    toastr.error(mensagem, titulo);
  } else if (tipo === 'success') {
    toastr.success(mensagem, titulo);
  } else if (tipo === 'warning') {
    toastr.warning(mensagem, titulo);
  } else {
    toastr.info(mensagem, titulo);
  }
}

export function mensagemErro(mensagem: string) {
  mostrarMensagem('Erro', mensagem, 'error');
}

export function mensagemSucesso(mensagem: string) {
  mostrarMensagem('Sucesso', mensagem, 'success');
}

export function mensagemAlert(mensagem: string) {
  mostrarMensagem('Alerta', mensagem, 'warning');
}
