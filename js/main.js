var app = {

  initialize: function() {
    var self = this;

    this.registerEvents( );

    this.homeTpl = Handlebars.compile( $( "#home-tpl" ).html( ) );
    this.employeeLiTpl = Handlebars.compile( $( "#employee-li-tpl" ).html( ) );

    // this.store = new MemoryStore();
    // this.store = new LocalStorageStore();
    // this.store = new WebSqlStore();

    this.store = new WebSqlStore( function( ) {
      $( 'body' ).html( new HomeView( self.store ).render( ).el );
    } );

    $( '.search-key' ).on( 'keyup', $.proxy( this.findByName, this ) );
  },

  registerEvents: function() {
    var self = this;
    // Check of browser supports touch events...
    if (document.documentElement.hasOwnProperty('ontouchstart')) {
      // ... if yes: register touch event listener to change the "selected" state of the item
      $('body').on('touchstart', 'a', function(event) {
          $(event.target).addClass('tappable-active');
      });
      $('body').on('touchend', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
      });
    } else {
      // ... if not: register mouse events instead
      $('body').on('mousedown', 'a', function(event) {
          $(event.target).addClass('tappable-active');
      });
      $('body').on('mouseup', 'a', function(event) {
          $(event.target).removeClass('tappable-active');
      });
    }
  },

  showAlert: function ( message, title ) {
    if( navigator.notification ) {
      navigator.notification.alert( message, null, title, 'OK' );
    } else {
      alert( title ? ( title + ": " + message ) : message );
    }
  },

};

app.initialize( );