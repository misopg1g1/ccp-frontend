type Message = {
  title: string,
  content: string,
  type: string,
};

export function handleSuccess(content: string, title: string = '') {
  const message: Message = {
    title: title ? title : 'Proceso exitoso',
    type: 'success',
    content: getContent(content)
  }
  return message;
}

const getContent = (message: string): string => {
  const array = message.split('|');
  return array.length > 1 ? array[1] : message
}

export function handledError(error: any, title: string = ''): Message {
  let content = '';
  if (error.data) {
    content = error.data.error;
  } 
  if (error.message) {
    content = error.message;
  }
  return {
    title: title !== '' ? title : 'Error al ejecutar el proceso',
    type: 'error',
    content: getContent(content)
  }
}

export function checkData(data: any) {
  if (data.error) {
    throw { data };
  }
}