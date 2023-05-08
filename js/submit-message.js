// const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onDocumentClick = () => closeMessage();

function closeMessage () {
  const messageElement = document.querySelector('.error') || document.querySelector('.success');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onDocumentClick);
  bodyElement.style.overflow = 'auto';
}

// Для обработки ошибок в будущем
// const showErrorMessage = () => {
//   const errorMessageElement = errorMessageTemplate.cloneNode(true);
//   errorMessageElement.querySelector('.error__button').addEventListener('click', onDocumentClick);
//   document.addEventListener('keydown', onMessageEscKeydown);
//   document.addEventListener('click', onDocumentClick);
//   bodyElement.appendChild(errorMessageElement);
//   bodyElement.style.overflow = 'hidden';
// };

const showSuccessMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  successMessageElement.querySelector('.success__button').addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onDocumentClick);
  bodyElement.appendChild(successMessageElement);
  bodyElement.style.overflow = 'hidden';
};

export {showSuccessMessage};