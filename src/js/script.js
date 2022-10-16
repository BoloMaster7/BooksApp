/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';



  const select = {
    dataSource: {
      data: dataSource.books,
      detailsAdults: 'adults',
      nonFiction: 'nonFiction',
    },
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.books-list .book__image',
    }
  };
  const classNames = {
    favorite: 'favorite',
  };
  const favoriteBooks = [];
  const filters = [];
  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const books = document.querySelectorAll(select.book.image);
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



    for (let book of books) {
      /* add event listner */
      book.addEventListener('dblclick', function (event) {
        if (event.target.offsetParent.classList.contains('.book__image')) {
          /* prevent default actions */
          event.preventDefault();
          /* add class favorite*/
          //  book.classList.add(classNames.favorite);
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
    const formRef = document.querySelector(select.containerOf.filters);
    formRef.addEventListener('click', function (event) {
      const filter = event.target;
      if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
        let filterValue = filter.value;
        console.log('filterValue', filterValue);
        if (filter.checked == true) {
          filters.push.value;
        } else {
          filters.splice.value;
        }
        console.log('filters', filters);
      }
      filterBooks();
    });
  }

  function filterBooks() {

    for (let dataBook of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!dataBook.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden == true) {
        const bookImage = document.querySelector('.book__image[data-id="' + dataBook.id + '"]');
        bookImage.classList.add('hidden');
      } else if (shouldBeHidden == false) {
        const bookImage = document.querySelector('.book__image[data-id="' + dataBook.id + '"]');
        bookImage.classList.remove('hidden');
      }

    }
  }
  render();
  initActions();

}
