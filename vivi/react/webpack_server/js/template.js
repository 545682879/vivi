import React from 'react';
import bookListingTemplate from './template/book-listing.handlebars';

let Template = React.createClass({

  render() {
    return(<div dangerouslySetInnerHTML={{__html : 
    		bookListingTemplate({
				username: "test",
				info: "Your books are due next Tuesday",
				books: [
					{ title: "A book", synopsis: "With a description" },
					{ title: "Another book", synopsis: "From a very good author" },
					{ title: "Book without synopsis" }
				]
			})
		}}></div>);

  }
});

export default Template;
