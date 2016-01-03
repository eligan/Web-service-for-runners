var formValidator = (function(){
	var result = Object.create(null);

	function validateInput(input){
		var type = input.attr('type');

		switch(type){
			case "email":
				if( (new RegExp('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')).test(input.val()) )
					return true;
				else
					throw {msg: "invalid email value"};
			break;
			case "text":
				if( (new RegExp('^.{4,}$')).test(input.val()) ) 
					return true;
				else
					throw {msg: "invalid text value"};
			break;
			case "password": 
				if( (new RegExp('^[a-zA-Z0-9_\-]{6,18}$')).test(input.val()) )
					return true;
				else
					throw {msg: "invalid password value"};
			break;
			case "tel":
				if( (new RegExp('^\(\d\d\d\) ?\d\d\d-\d\d-\d\d$')).test(input.val()) ) 
					return true;
				else
					throw {msg: "invalid phone value"};
			break;
			case "date":
				if( (new RegExp('[0-9]{4}\-[0-9]{2}\-[0-9]{2}')).test(input.val()) )
					return true;
				else
					throw {msg: "invalid date value"};
			break;
			case "checkbox":
				if( input.is(':checked') )
					return true;
				else
					throw {msg: "checkbox unchecked"};
				break;
			default: 
				if (input.val() == "") {
					throw {msg: "empty input value"};
				}
			break;
		}
	}

/*	function validateSelect(select){
		if ($("option:selected", select).text() != "") 
			return true;
		else 
			throw {msg: "invalid select value"};
	}
*/
	//module methods:
	result.formValid = function(form){
		var fail = [];
		var inputs = $("input[required]", form);
		/*var selects = $("select[required]", form);*/

		if(inputs){
			inputs.each(function(index, elem) {
				try{
					validateInput($(elem));
				}
				catch(err){
					fail.push({msg: err.msg, elem: $(elem)});
				}
			});
		}

		/*if(selects){
			selects.each(function(index, elem) {
				try{
					validateSelect($(elem));
				}
				catch(err){
					throw {msg: err.msg, elem: $(elem)};
				}
			});
		}*/
		
		return  fail.length ? fail : true;
	};

	return result;
})();