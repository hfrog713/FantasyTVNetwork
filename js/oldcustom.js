// JavaScript Document

jQuery(document).ready(function() {
	
	jQuery(".slides li").hide();
	jQuery(".slides li:eq(0)").show();
	jQuery(".thumbs li:eq(0)").addClass("active");
	
	jQuery(".thumbs li").click(function() {
		
		jQuery(".thumbs li").removeClass("active");
		
		jQuery(this).addClass("active");
		
		jQuery(".slides li").hide();
		
		var target = jQuery(this).index();
		
		jQuery(".slides li:eq("+ target +")").fadeIn(200);
		
		});
		
		
}); // ready method