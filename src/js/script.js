/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

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
    },
  };
  const classNames = {
    favorite: 'favorite',
  };
  const favoriteBooks = [];
  const filters = [];

  const templates = {
    books: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };
  let books;
  console.log(books);


  class BooksList {
    constructor() {

      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData() {
      this.data = dataSource.books;


      for (let book of this.data) {
        const ratingBgc = determineRatingBgc(book.rating);
        const ratingWidth = ratingBgc * 10;
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;
        console.log('ratingWidth', ratingWidth);
        /* generate HTML based on template */
        const generatedHTML = templates.books(book);
        /* create element using utils.createElementFromHTML */
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        /* find menu container */
        const menuContainer = document.querySelector(
          select.containerOf.booksList
        );
        /* add element to menu */
        menuContainer.appendChild(generatedDOM);
      }

      books = document.querySelectorAll(select.book.image);
    }
    getElements() {
      const thisBooksList = this;


      thisBooksList.books = document.querySelectorAll(select.book.image);
      thisBooksList.container = document.querySelector(select.containerOf.booksList);
      thisBooksList.formRef = document.querySelector(select.containerOf.filters);

    }
    initActions() {
      //const booksList = document.querySelector(select.containerOf.booksList);

      const thisBooksList = this;
      thisBooksList.container.addEventListener('dblclick', function (event) {
        const book = event.target.closest('.book__image');
        const bookID = book.getAttribute('data-id');

        if (!favoriteBooks.includes(bookID)) {
          book.classList.add(classNames.favorite);
          favoriteBooks.push(bookID);
        } else {
          book.classList.remove(classNames.favorite);
          const index = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(index, 1);
        }
      });

      thisBooksList.formRef.addEventListener('click', function (event) {
        const filter = event.target;
        if (
          filter.tagName == 'INPUT' &&
          filter.type == 'checkbox' &&
          filter.name == 'filter'
        ) {
          let filterValue = filter.value;
          console.log('filterValue', filterValue);
          if (filter.checked == true) {
            filters.push(filterValue);
          } else {
            filters.splice(filterValue);
          }
          console.log('filters', filters);
        }
        thisBooksList.filterBooks();
      });
    }
    filterBooks() {

      for (let dataBook of dataSource.books) {
        let shouldBeHidden = false;
        for (const filter of filters) {
          if (!dataBook.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden == true) {
          const bookImage = document.querySelector(
            '.book__image[data-id="' + dataBook.id + '"]'
          );
          bookImage.classList.add('hidden');
        } else if (shouldBeHidden == false) {
          const bookImage = document.querySelector(
            '.book__image[data-id="' + dataBook.id + '"]'
          );
          bookImage.classList.remove('hidden');
        }
      }
    }
    determineRatingBgc(rating) {
      let ratingBgc = '';
      if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      }
      else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      }
      else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      }
      else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }
      return ratingBgc;
    }

  }

  const app = new BooksList();
}





