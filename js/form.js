import {showSuccessMessage} from './submit-message.js';

const userForm = document.querySelector('.ad-form');
const dateInput = userForm.querySelector('#date');
const timeInField = userForm.querySelector('#timein');
const timeOutField = userForm.querySelector('#timeout');

const pristine = new Pristine(userForm, {
  classTo: 'ad-form__element-box',
  errorTextParent: 'ad-form__element-box',
  errorTextTag: 'span',
  errorTextClass: 'add-form__text-error',
}, true);

function onDateChange() {
  pristine.validate(dateInput);
}

dateInput.addEventListener('change', onDateChange);

function changeTime () {
  const timeStart = timeInField.value.split(':');
  const timeEnd = timeOutField.value.split(':'); 
  const dateStart = new Date();
  dateStart.setHours(Number(timeStart[0]));
  dateStart.setMinutes(Number(timeStart[1]));
  const dateEnd = new Date();
  dateEnd.setHours(Number(timeEnd[0]));
  dateEnd.setMinutes(Number(timeEnd[1]));
  const date = dateEnd - dateStart;
  if(date <= 0) {
    return false;
  }
  return true;
}

function getTimeErrorMessage() {
  return 'Некорректный интервал. Время начала работы должно быть раньше времени окончания';
}

const onTimeChange = () => {
    pristine.validate(timeInField);
    pristine.validate(timeOutField);
};

pristine.addValidator(timeInField, changeTime, getTimeErrorMessage);
pristine.addValidator(timeOutField, changeTime, getTimeErrorMessage);

timeInField.addEventListener('change', onTimeChange);
timeOutField.addEventListener('change', onTimeChange);


// функции для блокировки/разблокировки кнопки отправки при медленном интернете
// const blockSubmitButton = () => {
//   buttonSubmit.setAttribute('disabled', true);
//   buttonSubmit.textContent = 'Публикуется...';
// };

// const unblockSubmitButton = () => {
//   buttonSubmit.removeAttribute('disabled');
//   buttonSubmit.textContent = 'Опубликовать';
// };

function adFormReset() {
    userForm.reset();
}

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValide = pristine.validate();
    const formData = new FormData(evt.target);
    if (isValide) {
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);
        const json = JSON.stringify(obj);
        console.log(json);
        showSuccessMessage();
        adFormReset();
        pristine.reset();
    }
  });
};

export {setUserFormSubmit};