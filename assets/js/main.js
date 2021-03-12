/* JQUERY MATH RECAPTCHA FOR ELEMENTOR */
jQuery(document).ready(function($) {
	//INIT FUNCTION
		$(function(){
	        $('.elementor-form').ebcaptcha();
	    });
		$(document).arrive(".elementor-form", function() {
	        $('.elementor-form').ebcaptcha();
	});
	//CAPTCHA FUNCTIONS
	(function($){
		jQuery.fn.ebcaptcha = function(options){

		var element = this; 
		var submitcontainer = $(this).find('.elementor-field-type-submit')
		var submit = $(this).find('button[type=submit]');
		$('<div class="bs-math-captcha elementor-field-type-text elementor-field-group elementor-column elementor-field-group-name elementor-col-100"><label id="bs_ebcaptchatext" class="elementor-field-label"></label><input type="text" class="elementor-field elementor-size-sm  elementor-field-textual" id="bs_ebcaptchainput" required data-error="Please solve the math problem."/></div>').insertBefore(submitcontainer);
		var input = this.find('#bs_ebcaptchainput'); 
		var label = this.find('#bs_ebcaptchatext'); 
		
		$(element).find('button[type=submit]').attr('disabled','disabled'); 

		var operators = [{
	        sign: "+",
	        method: function(a,b){ return a + b; }
	    	},{
	        sign: "-",
	        method: function(a,b){ return a - b; }
   		},{
	        sign: "*",
	        method: function(a,b){ return a * b; }
   		}];
   		var selectedOperator = Math.floor(Math.random()*operators.length);


		var randomNr1 = 0; 
		var randomNr2 = 0;
		var totalNr = 0;
		randomNr1 = Math.floor(Math.random()*10);
		randomNr2 = Math.floor(Math.random()*10);
		totalNr = operators[selectedOperator].method(randomNr1, randomNr2)
		var texti = randomNr1+" "+operators[selectedOperator].sign+" "+randomNr2+" = ";
		$(label).text(texti);
		
	
		$(input).keyup(function(){

			var nr = $(this).val();
			if(nr==totalNr)
			{
				$(element).find('button[type=submit]').removeAttr('disabled');
				$(input).addClass('correct');
				$(input).removeClass('error');
			}
			else{
				$(element).find('button[type=submit]').attr('disabled','disabled');
				$(input).addClass('error');
				$(input).removeClass('correct');
			}
			
		});

		$(document).keypress(function(e)
		{
			if(e.which==13)
			{
				if((element).find('button[type=submit]').is(':disabled')===true)
				{
					e.preventDefault();
					return false;
				}
			}

		});

	};
})
 (jQuery);
	$('.elementor-field-type-submit').click(function(event){
		    if ($(".elementor-field-type-submit .elementor-button").is(":disabled"))
		    {
		    	if ($("#errorcaptcha").length == 0) {
		    		$('<p id="errorcaptcha">Math captcha Error</p>').insertBefore(this);
		    		$('#bs_ebcaptchainput').css('border-color', 'red');
		    	}
		    }
				else {
					$('#errorcaptcha').hide();
					$('#bs_ebcaptchainput').css('border-color', '');
				}
			});
});