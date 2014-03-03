//Creo mi constructor
function Range (element,options){
  _.bindAll(this, "on_down","on_move");
  this.options = $.extend({}, Range.DEFAULTS, options);
  this.element = element;
  this.$element = $(element);
  this.range_button = this.$element.find('[data-range-button]');
  this.range_button_width =this.range_button.width(); 
  this.range_position = this.$element.offset().left;
  this.range_max = this.$element.find('[data-range-bar]').width() - this.range_button_width;
  this.range_min = 0;
  this.init();
}



//extiendo mis funciones en mi prototipo
$.extend(Range.prototype,{
  init:function() {
    //$('body').on('mousedown',this.is_range_button);
    this.range_button.on('mousedown',this.on_down);
    // this.range_button.on('mouseup',this.on_up);
  },
  on_down:function() {
    $(document).on('mousemove',this.on_move);
    $('body').on('mouseup',this.on_up);
    
  },
  on_move:function(e){
    var mouse_position = e.pageX;
    this.move_to_position(mouse_position);
  },
  move_to_position:function(position){
    var real_position = this.get_range_position(position)
    this.move_range(real_position);
  },
  get_range_position: function(mouse_position){
    mouse_position = mouse_position - this.range_position;
    if(mouse_position >= this.range_max) {
      mouse_position = this.range_max;
    }else if (mouse_position <= this.range_min) {
      mouse_position = this.range_min;
    }

    return mouse_position;
  },
  move_range:function(value) {
    this.range_button.css( "left", value );
  },
  on_up:function(){
    $(document).off('mousemove', this.on_move);
    $('body').off('mouseup', this.on_up);
  }

});


//propiedades de mi plugin por defecto
Range.DEFAULTS = {
  
  
};

//

$.fn.range = function(options){
  return $(this).each(function(){
    var self = $(this);
    if(!self.data("range")){
      self.data("range", new Range(this, options));
    }
  });
};