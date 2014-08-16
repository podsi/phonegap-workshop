var app = {

  findByName: function() {
    var self = this;

    this.store.findByName( $( '.search-key' ).val( ), function( employees ) {
      $( '.employee-list' ).html( self.employeeLiTpl( employees ) );
    } );
  },

  initialize: function() {
    var self = this;

    this.homeTpl = Handlebars.compile( $( "#home-tpl" ).html( ) );
    this.employeeLiTpl = Handlebars.compile( $( "#employee-li-tpl" ).html( ) );

    // this.store = new MemoryStore();
    // this.store = new LocalStorageStore();
    // this.store = new WebSqlStore();

    this.store = new WebSqlStore( function( ) {
      self.renderHomeView( );
    } );

    $( '.search-key' ).on( 'keyup', $.proxy( this.findByName, this ) );
  },

  renderHomeView: function( ) {
    $( 'body' ).html( this.homeTpl );
    $( '.search-key' ).on( 'keyup', $.proxy( this.findByName, this ) );
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