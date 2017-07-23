/* global $, materials, SAVE_URL */
function make_new_material_section(name, id, quantity, measurement ) {
	quantity = typeof quantity !== 'undefined' ? quantity : 0;
	measurement = typeof measurement !== 'undefined' ? measurement : "kg";

	var $li = $('<li></li>', {
		"class": 'material-section'
	});

	var $head = $('<div></div>', {
		"class": 'material',
		"text": name,
		"data-id": id,
		"data-name": name,
		"quantity": quantity,
		"measurement": measurement
	});

	var $body = $('<ul></ul>', {
		"class": 'collection processes'
	});

	var $procdrop = $('<li></li>', {
		"class": 'collection-item',
		"text": "Drop your " + name + " processes here."
	});

	// console.log("Creating a new Material..");

	$procdrop.appendTo($body);
	$head.appendTo($li);
	$body.appendTo($li);
	add_inputs($head, 'material');
	$head.find("#quantity").val(quantity);
	$head.find("#measurement").val(measurement);

	$li.droppable({
		greedy: true,

		drop: function(event, ui) {
			var from = ui.draggable[0];
			var id = $(from).data("id");
			var name = $(from).data("name");
			if ($(from).data('type') == 'procedure') {
				//console.log($(this).processes.offsetparent.childElementCount);
				// console.log($(this).find(".processes").children().length);
				if ($(this).find(".processes").children().length > 1) {
					add_proc_to($li, name, id, 0,$head.find("#measurement").val());
				}
				else {
					add_proc_to($li, name, id, $head.find("#quantity").val(),$head.find("#measurement").val());
				}
			}

		}
	});

	var $delButton = make_delete_button($li, 'material');
	$delButton.appendTo($head);
	return $li;
}

function make_new_subassembly(name) {

    if (!name){
        name = "Subassembly";
    }

    var $li = $('<li></li>', {
        "class": 'subassembly-section'
    });

    var $head = $('<div></div>', {
        "class": 'subassembly',
        "text": String(name)
    });

    $head.click(function(){
        if ( !( $( this ).attr("contenteditable") == null || $( this ).attr("contenteditable") == "false" ) ) {
            $(this).attr("contenteditable", "false");
        } else {
            $(this).attr("contenteditable", "true");
            $(this).children('span').attr("contenteditable", "false");
            $(this).focus();
        }
    });

    $head.keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            // save subassembly to database
            $( '#save' ).trigger( "click" );
            var str = $( this ).text().replace("×", "");
            alert( str + " saved! ");
            $( this ).attr("contenteditable", "false");
        }
    });

    $head.hover(function() {
            if ( !$(this).is(":focus") ){
                $( this ).css("color", "blue");
            }
        }, function() {
        $( this ).css("color", "black");
        }
    );

    var $delButton = make_delete_button($li, 'material');
    $delButton.appendTo($head);

    var $body = $('<ul></ul>', {
        "class": 'collection processes'
    });

    var $procdrop = $('<li></li>', {
        "class": 'subassembly-item',
        "text": "Drop items into subassembly here."
    });

    $procdrop.appendTo($body);
    $head.appendTo($li);
    $body.appendTo($li);
    // add_inputs($head, 'material');

    $li.droppable({
        greedy: true,

        drop: function(event, ui) {
            var from = ui.draggable[0].outerHTML; // ui.draggable[0] is HTML obj. outerHTML grabs the string version
            //console.log(from);
            $from = $('<div/>').html(from).contents(); // trick to convert string to jquery object
            if(!$from.hasClass("material-section")){
                console.log("THIS IS A MATERIAL FROM LIBRARY"); //If so, will need to create new li object
                var item = ui.draggable[0];
                var id = $(from).data("id");
                var name = $(from).data("name");
                var units = $(from).data("units")
                if (units == ""){ units = undefined }
                var type = $(item).data('type')
                var quantity = typeof quantity !=='undefined'? quantity : 1;
                var measurement = typeof measurement !=='undefined'? measurement : "kg";
                var $new_li = $('<li></li>', {
                    "class": 'material-section'
                });
                var $new_head = $('<div></div>', {
                    "class": 'material',
                    "text": name,
                    "data-id": id,
                    "data-name": name,
                    "quantity": quantity,
                    "measurement": measurement
                });
                var $new_body = $('<ul></ul>', {
                    "class": 'collection processes'
                });
                var $new_procdrop = $('<li></li>', {
                    "class": 'collection-item',
                    "text": "Drop your " + name + " processes here."
                });
                $new_procdrop.appendTo($new_body);
                $new_head.appendTo($new_li);
                $new_body.appendTo($new_li);
                // console.log($new_li);
                add_inputs($new_head, 'material');
                $new_head.find("#quantity").val(quantity);
                $new_head.find("#measurement").val(measurement);
                var $delButton = make_delete_button($new_li, 'material');
                $delButton.appendTo($new_head);
                $from = $new_li;
            }
            $from.css('position', 'relative');
            $from.css('top', '0px');
            $from.css('left', '0px');
            $from.css('margin-bottom', '0px');
            $from.css('z-index', 'auto');
            $body.find('.processes :last').prevObject.before($from);
            //$from.appendTo($body);
            ui.draggable[0].remove();
            //console.log("after");
            //console.log($body[0]);
        }
    });

    $li.appendTo($("#build")); //appends material to bottom of build
    return $li;
}

function add_inputs($obj, obj_type, css_type) {
	if (obj_type == "material" || obj_type == "process") {
		var $quant = $('<label for="quantity" class="label">Quantity</label> <input id="quantity" type="number" class="input-{#obj_type}">');
		$quant.appendTo($obj);
		var $measure = $('<label for="measurement" class="label">Measure</label> <input id="measurement" type="text" class="input-{#obj_type}">');
		$measure.appendTo($obj);
	}
}

function add_proc_to($mat, name, id, quantity, measurement) {
	quantity = typeof quantity !== 'undefined' ? quantity : 0;
	measurement = typeof measurement !== 'undefined' ? measurement : "";
	var $proc = $('<li></li>', {
		"class": 'collection-item process',
		"text": name,
		"data-id": id,
		"data-name": name,
		"quantity": quantity,
		"measurement": measurement
	});
	var $delButton = make_delete_button($proc, 'process');
	$delButton.appendTo($proc);
	add_inputs($proc, 'process');

	$proc.find("#quantity").val(quantity);
	$proc.find("#measurement").val(measurement);

	// $mat.find('.processes :last-child').before($proc);
	$mat.find('.processes :last').before($proc);
}

function make_delete_button(element, css_type) {
	var $delButton = $('<span></span>', {
		"class": 'close-' + css_type,
		"text": "×"
	}).click(function() {element.remove();});
	return $delButton;
}

function build_data() {
	var result = [];
	$('#build > li').each(function( index ) {

        if ($(this).attr('class') == "material-section ui-droppable"){
        // This is a material
            var material = {};
            material["name"] = $(this).find(".material").data("name");
            material["id"] = $(this).find(".material").data("id");
            material["quantity"] = $(this).find("input#quantity").val();
            material["measurement"] = $(this).find("input#measurement").val();

            var procedures = [];
            $(this).find(".process").each(function (index) {
                procedures.push({"name": $(this).data("name"), "id": $(this).data("id"), "quantity": $(this).find("input#quantity").val(), "measurement": $(this).find("input#measurement").val()});
            });
            material["procedures"] = procedures;

            result.push(material);

        }else if ( $(this).attr('class') == "subassembly-section ui-droppable"){
        // This is a subassembly
            subassembly = [];
            subassembly_name = {};

            var name = $(this).find("div.subassembly").text();

            subassembly_name ["name"] = name.replace("×", "");
            subassembly.push(subassembly_name);

            $(this).children(".material-section").each(function( index ) {
                var material = {};
                material["name"] = $(this).find(".material").data("name");
                material["id"] = $(this).find(".material").data("id");
                material["quantity"] = $(this).find("input#quantity").val();
                material["measurement"] = $(this).find("input#measurement").val();

                var procedures = [];
                $(this).find(".process").each(function (index) {
                    procedures.push({"name": $(this).data("name"), "id": $(this).data("id"), "quantity": $(this).find("input#quantity").val(), "measurement": $(this).find("input#measurement").val()});
                });

                material["procedures"] = procedures;
                subassembly.push(material);
            });
            result.push(subassembly);
        }else{
            // console.log("Selecting wrong class name");
        }
	});
	console.log(result);
	return result;
}

function fill_build(data, name) {
	$("#assembly-title").val(name);
	for (var key in data){
	    if ( data[key].id ){
            // Show material in assembly
            var material = data[key];
            var $mat = make_new_material_section(material["name"], material["id"], material["quantity"], material["measurement"]);
            $('#build').append($mat);
            for (var p in material["procedures"]) {
                var proc = material["procedures"][p];
                add_proc_to($mat, proc["name"], proc["id"], proc["quantity"], proc["measurement"]);
            }
        }else{
	     //   Show subassembly in assembly
            var sub_assembly_material_array = data[key];
            var current_sub_ass_li_obj = null;
            var i;
            for ( i = 0 ; i < getPropertyCount(sub_assembly_material_array) ; i++){
                if ( i == 0 ){
                    // This is the name field for subassembly
                    var $li = make_new_subassembly( sub_assembly_material_array[i]["name"] );
                    current_sub_ass_li_obj = $li;
                    $( current_sub_ass_li_obj ).append($li);
                }else{
                    // This is a list of materials for this subassembly
                    var sub_material = sub_assembly_material_array[i];
                    var $sub_mat = make_new_material_section(sub_material["name"], sub_material["id"], sub_material["quantity"], sub_material["measurement"] );

                    for (var j in sub_material["procedures"]) {
                        var sub_proc = sub_material["procedures"][j];
                        add_proc_to($sub_mat, sub_proc["name"], sub_proc["id"], sub_proc["quantity"], sub_proc["measurement"]);
                    }
                    $(current_sub_ass_li_obj).append($sub_mat);
                }
            }
        }
	}
}

// This is a helper function to calculate the length for a list of objects, see here for details https://stackoverflow.com/questions/4346358/how-to-get-size-of-jquery-object
function getPropertyCount(obj) {
    var count = 0,
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}

function clear_build() {
	$('#build *').remove();
}

function searchKeyPress(e){
	e = e||window.event;
    if (e.keyCode == 13) {
        $("#save").click();
        return false;
    }
    return true;
}

$(document).on('turbolinks:load', function() {
	$('.draggable').draggable({
		containment: 'window',
		appendTo: 'body',
		helper: function (event) {
			return $('<div></div>', {
				"class": "drag-thing",
				"text": event.currentTarget.innerText
			})
		},

		cursorAt: {
			top: 25,
			left: 50,
		}
	});

	$('#material-search').autocomplete({
		data: materials
	});

	$('.dropdown-content').css({'position': 'absolute', 'width': '350px'});


	$('#assembly').droppable({
		drop: function (event, ui) {
			var item = ui.draggable[0]
			var name = item.innerText;
			var id = $(item).data("id")

			if ($(item).data('type') == 'material') {

				var $li = make_new_material_section(name, id, 0, 0);
				$('#build').append($li);
			}
		}
	});

	$('#build').sortable({
		containment: "window",
		appendTo: 'body'
	});

    $('#add_subassembly').click(function() {
        var $li = make_new_subassembly();
    });

	$('#save').click(function() {
		Materialize.toast('Saving...', 2000);
		$.ajax({
			dataType: "json",
			type: "POST",
			url: SAVE_URL,
			data: { build: build_data(), assembly_name: $("#assembly-title").val() },
			success: function(response, status, xhr) {
                var msg = response;
                if (xhr.status != '200'){
                    msg = "fail to save";
                }
                Materialize.toast( msg , 2000);
			},

			error: function(xhr, status, errorThrown) {
				console.log(errorThrown);
			},

			complete: function (xhr, status) {
				// console.log(status);
			}
		});
	});

	$.ajaxSetup({
		headers: {
			'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
		}
	});

	// console.log(curr_assembly)
	if (curr_assembly !== null) {
		fill_build(curr_assembly, curr_name);
	}

	var menu_height = $('#menu .collapsible-header').first().height() * 5;
	var library_height = $('#library').height();

});

/* Material search feature: updates drop-down list every time material search text box is updated */
$(function(){

	$.expr[':'].Contains = function(a,i,m){
     return $(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};

	$('#material-search').keyup(function() {
		var input = $('#material-search').val();
		var categories = '#material-dropdown .collapsible';
		var materials = '#material-dropdown .collapsible .draggable';
		$(categories).hide();
		$(materials).hide();
		$(materials + ':Contains('+ input +')').show();
		$(materials + ':Contains('+ input +')').closest('.collapsible').show();
	});

	$('#manufacturing-search').keyup(function() {
		var input = $('#manufacturing-search').val();
		var categories = '#manufacturing-dropdown .collapsible';
		var materials = '#manufacturing-dropdown .collapsible .draggable';
		$(categories).hide();
		$(materials).hide();
		$(materials + ':Contains('+ input +')').show();
		$(materials + ':Contains('+ input +')').closest('.collapsible').show();
	});
	
});
