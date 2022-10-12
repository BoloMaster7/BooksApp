/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };


  function render() {
    for (let book of dataSource.books) {
      /* generate HTML based on template */
      const generatedHTML = templates.books(book);
      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.booksList);
      /* add element to menu */
      menuContainer.appendChild(generatedDOM);
    }
  }
  render();
}
