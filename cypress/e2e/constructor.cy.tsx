
import * as orderData from '../fixtures/orders.json';

const BUN_ID = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const MAIN_IDS = [
  `[data-cy=${'643d69a5c3f7b9001cfa093e'}]`,
  `[data-cy=${'643d69a5c3f7b9001cfa0940'}]`,
  `[data-cy=${'643d69a5c3f7b9001cfa0947'}]`,
  `[data-cy=${'643d69a5c3f7b9001cfa0949'}]`,
  `[data-cy=${'643d69a5c3f7b9001cfa094a'}]`
];
const SAUCE_ID = `[data-cy=${'643d69a5c3f7b9001cfa0944'}]`;

beforeEach(() => {
  cy.intercept('GET', `api/ingredients`, {
    fixture: 'ingredients.json'
  });

  cy.intercept('POST', `api/auth/login`, {
    fixture: 'user.json'
  });

  cy.intercept('GET', `api/auth/user`, {
    fixture: 'user.json'
  });

  cy.intercept('POST', `api/orders`, {
    fixture: 'orders.json'
  });

  cy.visit('http://localhost:4000/');
});

describe('Тестирование загрузки списка ингредиентов в конструктор', () => {
  it('Добавление булок и ингредиентов в заказ', () => {
    cy.get(BUN_ID).children('button').click();

    cy.get(MAIN_IDS[0]).children('button').click();
    cy.get(MAIN_IDS[1]).children('button').click();
    cy.get(MAIN_IDS[2]).children('button').click();
    cy.get(MAIN_IDS[3]).children('button').click();
    cy.get(MAIN_IDS[4]).children('button').click();

    cy.get(SAUCE_ID).children('button').click();

    const burgerCunstructor = {
      constructorBunTop: cy.get(
        '.constructor-element_pos_top > .constructor-element__row > .constructor-element__text'
      ),

      constructoMainIngredients: [
        cy.get(
          '#root > div > main > div > section:nth-child(2) > ul > li:first-child > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
        ),
        cy.get(
          '#root > div > main > div > section:nth-child(2) > ul > li:nth-child(2) > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
        ),
        cy.get(
          '#root > div > main > div > section:nth-child(2) > ul > li:nth-child(3) > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
        ),
        cy.get(
          '#root > div > main > div > section:nth-child(2) > ul > li:nth-child(4) > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
        ),
        cy.get(
          '#root > div > main > div > section:nth-child(2) > ul > li:nth-child(5) > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
        )
      ],

      constructoSauce: cy.get(
        '#root > div > main > div > section:nth-child(2) > ul > li:last-child > div:nth-child(2) > .constructor-element > .constructor-element__row > span.constructor-element__text'
      ),

      constructorBunBottom: cy.get(
        '.constructor-element_pos_bottom > .constructor-element__row > .constructor-element__text'
      )
    };

    burgerCunstructor.constructorBunTop.contains(
      'Флюоресцентная булка R2-D3 (верх)'
    );

    burgerCunstructor.constructoMainIngredients[0].contains(
      'Филе Люминесцентного тетраодонтимформа'
    );
    burgerCunstructor.constructoMainIngredients[1].contains(
      'Говяжий метеорит (отбивная)'
    );
    burgerCunstructor.constructoMainIngredients[2].contains(
      'Плоды Фалленианского дерева'
    );
    burgerCunstructor.constructoMainIngredients[3].contains(
      'Мини-салат Экзо-Плантаго'
    );
    burgerCunstructor.constructoMainIngredients[4].contains(
      'Сыр с астероидной плесенью'
    );

    burgerCunstructor.constructoSauce.contains(
      'Соус традиционный галактический'
    );

    burgerCunstructor.constructorBunBottom.contains(
      'Флюоресцентная булка R2-D3 (низ)'
    );
  });
});

describe('Тестирование работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модального окна ингредиента', () => {
    const ingredient = cy.get(BUN_ID);
    ingredient.click();

    const modal = cy.get('#modals').as('modal');
    const header = modal.get('div:first-child > h3');

    header.contains('Флюоресцентная булка R2-D3');
  });

  it('Закрытие модального окна по клику на крестик [х]', () => {
    const ingredient = cy.get(':nth-child(4) > :nth-child(5)');

    ingredient.click();

    const modal = cy.get('#modals > div:first-child').as('modal');
    const button = modal.get('div:first-child > button > svg');

    button.click();

    cy.get('modal').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    const ingredient = cy.get(':nth-child(4) > :nth-child(5)');

    ingredient.click();

    const modal = cy.get('#modals > div:first-child').as('modal');
    const overlay = modal.get('#modals > div:nth-child(2)');

    overlay.click({ force: true });

    cy.get('modal').should('not.exist');
  });
});

describe('Тестирование создания заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'ipsum');
    cy.setCookie('accessToken', 'lorem');
    cy.getAllLocalStorage().should('be.not.empty');
    cy.getCookie('accessToken').should('be.not.empty');
  });

  afterEach(() => {
    cy.clearAllCookies();
    localStorage.removeItem('refreshToken');
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Создание заказа и проверка его номера в открытом модальной окне', () => {
    cy.get(BUN_ID).children('button').click();

    cy.get(MAIN_IDS[0]).children('button').click();
    cy.get(MAIN_IDS[1]).children('button').click();
    cy.get(MAIN_IDS[2]).children('button').click();
    cy.get(MAIN_IDS[3]).children('button').click();
    cy.get(MAIN_IDS[4]).children('button').click();

    cy.get(SAUCE_ID).children('button').click();

    const orderButton = cy.get(
      '#root > div > main > div > section:nth-child(2) > div > button'
    );

    orderButton.click();

    const orderModal = cy.get('#modals > div:first-child').as('modal');
    const orderNumber = orderModal.get('div:nth-child(2) > h2');

    orderNumber.contains(orderData.order.number);

    const button = orderModal.get(
      'div:first-child > div:first-child > button > svg'
    );

    button.click();

    cy.get('modal').should('not.exist');
  });

  it('Проверка, что конструктор пуст', () => {
    const burgerCunstructor = {
      constructorBunTop: cy.get('div > section:nth-child(2) > div'),
      constructoMainIngredient: cy.get('div > section:nth-child(2) > ul > div'),
      constructorBunBottom: cy.get(
        'div > section:nth-child(2) > div:nth-child(3)'
      )
    };

    burgerCunstructor.constructorBunTop.contains('Выберите булки');
    burgerCunstructor.constructoMainIngredient.contains('Выберите начинку');
    burgerCunstructor.constructorBunBottom.contains('Выберите булки');
  });
});
