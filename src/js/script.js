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
    book: {
      image: '.books-list .book__image',
    }
  };
  const classNames = {
    favorite: 'favorite',
  };
  const favoriteBooks = [];

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

  function initActions() {

    const books = document.querySelectorAll(select.book.image);


    for (let book of books) {
      /* add event listner */
      book.addEventListener('dblclick', function (event) {
        if (event.target.offsetParent.classList.contains('.book__image')) {
          /* prevent default actions */
          event.preventDefault();
          /* add class favorite*/
          //  book.classList.dd(classNames.favorite);
          /* get books id */
          const bookID = book.getAttribute('data-id');
          /* add element to array*/
          // favoriteBooks.push(bookID);
          if (!favoriteBooks.includes(bookID)) {
            book.classList.add(classNames.favorite);
            favoriteBooks.push(bookID);

          } else {
            book.classList.remove(classNames.favorite);
            const index = favoriteBooks.indexOf(bookID);
            favoriteBooks.splice(index, 1);
          }

        }
      });
    }
  }

  render();
  initActions();

}
