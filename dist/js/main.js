document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const userName = document.getElementsByName('name')[0];
  const userLastName = document.getElementsByName('last-name')[0];
  const message = document.getElementsByName('message')[0];

  const checkRequired = (inputAll) => {
    inputAll.forEach((input) => {
      if (input.value.trim() === '') {
        showError(input, `Поле ${getFieldName(input)} должно быть заполнено`);
      } else {
        showSuccess(input);
      }
    });
  };
  const getFieldName = (input) => {
    return input.dataset.name;
  };
  const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    formControl.classList.remove('success');
    const messageContainer = formControl.querySelector('small');
    messageContainer.innerText = message;
  };

  const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    formControl.classList.add('success');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([userName, userLastName, message]);
  });

  new Swiper('.swiper', {
    spaceBetween: 0,
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  if (window.matchMedia('(max-width: 650px)').matches) {
    const buttonMenu = document.querySelector('.menu-toggle__button');
    const navigation = document.querySelector('.navigation');
    const parentMenuButton = buttonMenu.parentElement;

    const toggleMenu = () => {
      if (parentMenuButton.classList.contains('active')) {
        parentMenuButton.classList.remove('active');
      } else {
        parentMenuButton.classList.add('active');
      }

      if (navigation.classList.contains('active')) {
        navigation.classList.remove('active');
      } else {
        navigation.classList.add('active');
      }
    };
    buttonMenu.addEventListener('click', toggleMenu);
  }
});
