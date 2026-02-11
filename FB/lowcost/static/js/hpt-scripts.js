// noinspection JSJQueryEfficiency,DuplicatedCode,JSUnresolvedFunction,JSUnresolvedVariable,JSDeprecatedSymbols

/**
 * Optimization iframes for Youtube
 */
function optimizeUI() {
	let vidDefer = document.getElementsByTagName( 'iframe' );
	for( let i = 0; i < vidDefer.length; i++ ) {
		if( vidDefer[ i ].getAttribute( 'data-src' ) ) {
			vidDefer[ i ].setAttribute( 'src', vidDefer[ i ].getAttribute( 'data-src' ) );
		}
	}
	
}

function checkCarModelByHash() {
	
	if( window.location.hash === "#nissan" ) {
		document.getElementById( "nissancontent" ).style.display = "block";
	}
	else if( window.location.hash === "#mercedes" ) {
		document.getElementById( "mercedescontent" ).style.display = "block";
	}
	else if( window.location.hash === "#jlr" ) {
		document.getElementById( "jlrcontent" ).style.display = "block";
	}
	else if( window.location.hash === "#toyota" ) {
		document.getElementById( "toyotacontent" ).style.display = "block";
	}
}

function set_element_state( element_id, state ) {
	if( state !== "" ) {
		let element = document.getElementById( element_id );
		if( element != null ) {
			if( state === 0 ) {
				element.style.display = "none";
			}
			else {
				element.style.display = "block";
			}
		}
	}
}

function toggle_element( element_id ) {
	let x = document.getElementById( element_id );
	if( x.style.display === "none" ) {
		x.style.display = "block";
		setCookie( element_id, 1, 10 );
	}
	else {
		x.style.display = "none";
		setCookie( element_id, 0, 10 );
	}
}

function x_close( element_id ) {
	let x = document.getElementById( element_id );
	x.style.display = "none";
	setCookie( element_id, 0, 30 );
}

function setCookie( name, value, days ) {
	let expires;
	if( days ) {
		let date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function setCookieToDefaultIfEmptyThenSetElementState( name, defaultValue, days ) {
	let cookie = getCookie( name );
	if( cookie === "" ) {
		setCookie( name, defaultValue, days );
	}
	set_element_state( name, getCookie( name ) );
}

function getCookie( name ) {
	if( document.cookie.length > 0 ) {
		let start = document.cookie.indexOf( name + "=" );
		if( start !== -1 ) {
			start = start + name.length + 1;
			let end = document.cookie.indexOf( ";", start );
			if( end === -1 ) {
				end = document.cookie.length;
			}
			return unescape( document.cookie.substring( start, end ) );
		}
	}
	return "";
}

// Autocomplete Pool Bank
function autocomplete( inp, arr ) {
	let currentFocus;
	inp.addEventListener( "input", function() {
		let a,
			b,
			i,
			val = this.value;
		closeAllLists();
		if( !val ) {
			return false;
		}
		currentFocus = -1;
		a = document.createElement( "DIV" );
		a.setAttribute( "id", this.id + "autocomplete-list" );
		a.setAttribute( "class", "autocomplete-items" );
		this.parentNode.appendChild( a );
		for( i = 0; i < arr.length; i++ ) {
			if( arr[ i ].substr( 0, val.length ).toUpperCase() === val.toUpperCase() ) {
				/*create a DIV element for each matching element:*/
				b = document.createElement( "DIV" );
				/*make the matching letters bold:*/
				b.innerHTML = "<strong>" + arr[ i ].substr( 0, val.length ) + "</strong>";
				b.innerHTML += arr[ i ].substr( val.length );
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[ i ] + "'>";
				/*execute a function when someone clicks on the item value (DIV element):*/
				b.addEventListener( "click", function() {
					inp.value = this.getElementsByTagName( "input" )[ 0 ].value;
					document.getElementById( 'transfer_serial_number' ).dispatchEvent( new Event( 'input' ) );
					// inp.focus();
					closeAllLists();
				} );
				a.appendChild( b );
			}
		}
	} );
	inp.addEventListener( "keydown", function( e ) {
		let x = document.getElementById( this.id + "autocomplete-list" );
		if( x ) x = x.getElementsByTagName( "div" );
		if( e.keyCode === 40 ) {
			currentFocus++;
			addActive( x );
		}
		else if( e.keyCode === 38 ) { //up
			currentFocus--;
			addActive( x );
		}
		else if( e.keyCode === 13 ) {
			e.preventDefault();
			if( currentFocus > -1 ) {
				if( x ) x[ currentFocus ].click();
			}
		}
	} );
	
	
	function addActive( x ) {
		if( !x ) return false;
		removeActive( x );
		if( currentFocus >= x.length ) currentFocus = 0;
		if( currentFocus < 0 ) currentFocus = ( x.length - 1 );
		x[ currentFocus ].classList.add( "autocomplete-active" );
	}
	
	function removeActive( x ) {
		for( let i = 0; i < x.length; i++ ) {
			x[ i ].classList.remove( "autocomplete-active" );
		}
	}
	
	function closeAllLists( elmnt ) {
		let x = document.getElementsByClassName( "autocomplete-items" );
		for( let i = 0; i < x.length; i++ ) {
			if( elmnt !== x[ i ] && elmnt !== inp ) {
				x[ i ].parentNode.removeChild( x[ i ] );
			}
		}
	}
	
	document.addEventListener( "click", function( e ) {
		closeAllLists( e.target );
	} );
}

// L5P 2-22-2021 - HPT-HS
function openMessage( evt, messageName ) {
	let i,
		L5PTabContent,
		tablinks;
	L5PTabContent = document.getElementsByClassName( "L5PTabContent" );
	for( i = 0; i < L5PTabContent.length; i++ ) {
		L5PTabContent[ i ].style.display = "none";
	}
	tablinks = document.getElementsByClassName( "tablinks" );
	for( i = 0; i < tablinks.length; i++ ) {
		tablinks[ i ].className = tablinks[ i ].className.replace( " active", "" );
	}
	document.getElementById( messageName ).style.display = "block";
	evt.currentTarget.className += " active";
}

document.addEventListener( "DOMContentLoaded", function() {
	let universalCreditElements = document.getElementsByClassName( 'universal_credit_select' );
	for( let i = 0; i < universalCreditElements.length; i++ ) {
		universalCreditElements[ i ].oninvalid = function( e ) {
			e.target.setCustomValidity( "" );
			if( !e.target.validity.valid ) {
				e.target.setCustomValidity( "Universal Credits cannot be added to the cart until the serial number is selected in the drop down menu below" );
			}
		};
		universalCreditElements[ i ].oninput = function( e ) {
			e.target.setCustomValidity( "" );
		};
	}
	
	let mpviElements = document.getElementsByClassName( 'upgrade_mpvi1' );
	for( let i = 0; i < mpviElements.length; i++ ) {
		mpviElements[ i ].oninvalid = function( e ) {
			e.target.setCustomValidity( "" );
			if( !e.target.validity.valid ) {
				e.target.setCustomValidity( "Interface Upgrade – MPVI to MPVI2 cannot be added to the cart until the serial number is selected in the drop down menu below" );
			}
		};
		mpviElements[ i ].oninput = function( e ) {
			e.target.setCustomValidity( "" );
		};
	}
} );

jQuery( document ).ready( function( $ ) {
	
	function changePrice( price, regular_price, quantity ) {
		let totalSalePrice = $( '.total_price_sale' ),
			priceParent = $( '.variable_price_parent' );
		totalSalePrice.hide();
		totalSalePrice.parent( '.price' ).removeClass( 'active_price_sale' );
		
		let price_credit = $( '.credit_price .details' ).data( 'price' );
		let price_credit_sale = $( '.credit_price .details ' ).data( 'sale' );
		let new_price = price + price_credit * quantity;
		
		priceParent.data( 'price', price );
		priceParent.data( 'sale', regular_price );
		priceParent.find( '.variable_price' ).text( new_price.toFixed( 2 ) );
		priceParent.find( 'ins .hpt-wc-price' ).text( new_price.toFixed( 2 ) );
		if( price !== regular_price ) {
			totalSalePrice.parent( '.price' ).addClass( 'active_price_sale' );
			totalSalePrice.show();
			let _regular_price = regular_price + price_credit_sale * quantity;
			priceParent.find( '.variable_price_sale' ).text( _regular_price.toFixed( 2 ) );
			priceParent.find( 'del .hpt-wc-price' ).text( _regular_price.toFixed( 2 ) );
		}
	}
	
	function set_configuration_section_dynamic_style_for_resellers() {
		if( $( '.mpvi2_prod form > div .component_inner .component_selections .component_options .component_options_inner .component_option_radio_buttons .component_option_radio_buttons_container:contains("Reseller")' ).length > 0 ) {
			if( $( window ).width() >= 400 ) {
				$( ".mpvi2_prod form > div .component_inner .component_selections .component_options .component_options_inner .component_option_radio_buttons .component_option_radio_buttons_container" ).css( { marginTop: "0px" } );
				$( '.composited_product_details_wrapper' ).css( { marginTop: "0px" } );
			}
			else {
				$( ".mpvi2_prod form > div .component_inner .component_selections .component_options .component_options_inner .component_option_radio_buttons .component_option_radio_buttons_container" ).css( { marginTop: "50px" } );
				$( '.composited_product_details_wrapper' ).css( { marginTop: "50px" } );
			}
		}
	}
	
	function device_edit_action( edit ) {
		let text = edit.text();
		let device_name = edit.closest( 'tr' ).find( '.device_name' );
		let save_device_data = edit.closest( 'tr' ).find( '.save_device_data' );
		let device_name_output = edit.closest( 'tr' ).find( '.device_name_output' );
		device_name_output.hide();
		device_name.show();
		if( text === 'Edit' ) {
			edit.text( 'Cancel' );
			device_name.val( device_name_output.text() );
			save_device_data.css( 'display', 'inline-block' );
		}
		else {
			edit.text( 'Edit' );
			save_device_data.hide();
			device_name.hide();
			device_name.val( '' );
			device_name_output.show();
		}
	}
	
	function device_save_action( save ) {
		let element_id = save.attr( 'id' );
		// noinspection RegExpRedundantEscape
		let device_id = element_id.match( /\[(.*)\]/ );
		let action = save.data( 'action' );
		let device_name = save.closest( 'tr' ).find( '.device_name' );
		let edit = save.closest( 'tr' ).find( '.edit_device_data' );
		let device_name_val = device_name.val();
		let device_user = device_name.data( 'user' );
		let device_name_output = save.closest( 'tr' ).find( '.device_name_output' );
		let data = {
			id: device_id[ 1 ],
			notes: device_name_val,
			user_id: device_user,
			action: action
		};
		$.ajax( {
			        type: 'POST',
			        url: MyAjax.ajaxurl,
			        data: data,
			        error: function( err ) {
				        console.log( err );
			        },
			        success: function() {
				        device_name.hide();
				        device_name_output.text( device_name_val ).show();
				        save.hide();
				        edit.text( 'Edit' );
			        }
		        } );
	}
	
	function search_device_in_list( input, table ) {
		let value = input.val().toLowerCase().trim();
		let table_id = table.attr( 'id' );
		
		$( "#" + table_id + " tr" ).not( ':first' ).each( function( index ) {
			if( !index )
				return;
			$( this ).find( "td" ).each( function() {
				let id = $( this ).text().toLowerCase().trim();
				let not_found = id.indexOf( value ) === -1;
				$( this ).closest( 'tr' ).toggle( !not_found );
				return not_found;
			} );
		} );
	}
	
	function betaconfirmation( event ) {
		if( confirm( 'The software you are about to download is BETA and not intended for use in a live production environment. We try to make our BETA software as stable as possible however bugs may exist. \nIf you do not feel comfortable using BETA software, please ensure you use the latest stable release which is also available on this page. \nAs always, please ensure you install the next stable release as soon as it becomes available.' ) ) {
			return true;
		}
		else {
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	}
	
	function register( $form, that ) {
		let result_class = $( that ).data( 'result' );
		let targetEl = $( '.' + result_class );
		$( that ).val( 'Sending...' );
		$.ajax( {
			        type: $form.attr( 'method' ),
			        url: $form.attr( 'action' ),
			        data: $form.serialize(),
			        cache: false,
			        dataType: 'json',
			        contentType: 'application/json; charset=utf-8',
			        error: function() {
				        alert( 'Could not connect to the registration server. Please try again later.' )
			        },
			        success: function( data ) {
				        $( that ).val( 'Subscribe' );
				        if( data.result === 'success' ) {
					        // Yeah
					        targetEl.css( 'color', 'rgb(53, 114, 210)' );
					        targetEl.html( '<p>' + data.msg + '</p>' );
				        }
				        else {
					        // Something went wrong, do something to notify the user.
					        targetEl.css( 'color', '#ff8282' );
					        targetEl.html( '<p>' + data.msg + '</p>' );
				        }
			        }
		        } );
	}
	
	function visibility_button( el ) {
		$( el ).css( {
			             'opacity': '1',
			             'pointer-events': 'auto'
		             } );
	}
	
	function disabled_button( el ) {
		$( el ).css( {
			             'opacity': '.5',
			             'pointer-events': 'none'
		             } );
	}
	
	function bindCountryChange() {
		if( $( '#billing_country' ).val() !== 'US' ) {
			$( '.add_new_message_checkout_page' ).show();
		}
		else {
			$( '.add_new_message_checkout_page' ).hide();
		}
	}
	
	function checkVatException() {
		let self = $( 'form.variations_form input[name="variation_id"]' ),
			alerts = $( '.hpt_variation_vin_restriction' );
		
		if( !self || !self.length || !alerts || !alerts.length ) {
			return;
		}
		
		let varId = self.val(),
			neededAlertId = alerts.filter( '#hpt_vin_restrict_' + varId );
		
		alerts.not( neededAlertId ).slideUp();
		neededAlertId.slideDown();
		let vinNumber = $( '#vin' );
		let vinYear = $( '#vin_year' );
		if(vinNumber.length)
		{
			if( neededAlertId && neededAlertId.text().trim().length ) {
				vinNumber.prop( 'required', false );
				vinNumber.prop( 'disabled', 'disabled' );
				vinNumber.addClass( 'hpt-disabled' );
                
				vinYear.prop( 'required', false );
				vinYear.prop( 'disabled', 'disabled' );
				vinYear.addClass( 'hpt-disabled' );
            }
			else {
				vinNumber.prop( 'required', self.attr( 'data-defaultdisabled' ) === '1' );
				vinNumber.prop( 'disabled', false );
				vinNumber.removeClass( 'hpt-disabled' );

				vinYear.prop( 'required', self.attr( 'data-defaultdisabled' ) === '1' );
				vinYear.prop( 'disabled', false );
				vinYear.removeClass( 'hpt-disabled' );
			}
		}

	}
	
	/**
	 * Validate Quantity inputs
	 * @package hptuners
	 */
	function checkEquipInput() {
		$( '#tbl_equipment_body input[type="number"]' ).not( '[min]' ).on( 'change input', function() {
			$( this ).attr( 'min', 0 ).val( Math.abs( +$( this ).val() ) );
		} );
		
	}
	
	/**
	 * Validate start and end dates
	 * @returns {boolean}
	 * @package hptuners
	 */
	function checkStartAndEndDates( startDateId = '', endDateId = '' ) {
		if ( !startDateId || !endDateId ) {
			return true;
		}
	
		let startDate = $( '#' + startDateId ),
			endDate = $( '#' + endDateId ),
			now = new Date();
	
		if ( !startDate.length || !endDate.length ) {
			return true;
		}
	
		function validateDates() {
			let parsedStart = new Date( startDate.val() ).getTime(),
				parsedEnd = new Date( endDate.val() ).getTime();
	
			if ( parsedEnd < parsedStart ) {
				endDate.val( startDate.val() );
			}
		}
	
		endDate.on( 'change input', validateDates );
	
		startDate.on( 'change input', function () {
			let parsedStart = new Date( startDate.val() ).getTime(),
				parsedEnd = new Date( endDate.val() ).getTime();
	
			if ( parsedEnd < parsedStart ) {
				startDate.val( endDate.val() );
			}
		});
	
		let formattedDate = now.toISOString().split( 'T' )[0];  // YYYY-MM-DD format
		startDate.attr( 'min', formattedDate );
		endDate.attr( 'min', formattedDate );
	}
	
	function registerCheckoutNewsletter( group1, group2, self ) {
		let url = 'https://hptuners.us4.list-manage.com/subscribe/post-json?u=c0cf81b7a0630195804f00e19&id=4e2f4495e6&c=?';
		let FNAME = $( '#billing_first_name' ).val();
		let LNAME = $( '#billing_last_name' ).val();
		let EMAIL = $( '#billing_email' ).val();
		let checkoutElm = $( '#subscribe-result_checkout' );
		
		$.ajax( {
			        type: 'GET',
			        url: url,
			        data: {
				        'FNAME': FNAME,
				        'LNAME': LNAME,
				        'EMAIL': EMAIL,
				        'group[24817][1]': group1,
				        'group[24817][2]': group2
			        },
			        cache: false,
			        dataType: 'json',
			        contentType: 'application/json; charset=utf-8',
			        error: function() {
				        alert( 'Could not connect to the registration server. Please try again later.' );
				        visibility_button( self )
			        },
			        success: function( data ) {
				        if( data.result === 'success' ) {
					        // Yeahhhh Success
					
					        // $('#mce-EMAIL').css('border', '3px solid #ffffff');
					        checkoutElm.css( 'color', 'rgb(53, 114, 210)' );
					        checkoutElm.html( '<p>' + data.msg + '</p>' );
				        }
				        else {
					
					        // Something went wrong, do something to notify the user.
					        // $('#mce-EMAIL').css('border', '3px solid #ff8282');
					        checkoutElm.css( 'color', '#ff8282' );
					        checkoutElm.html( '<p>' + data.msg + '</p>' );
				        }
			        },
			        complete: function() {
				        visibility_button( self )
			        },
		        } );
	}
	
	function setInvalid( e ) {
		e.css( 'border-color', 'red' );
		return false;
	}
	
	/*$('.variations_form .variations select').change(function(){
	 let _this_val = $(this).val();
	 if(_this_val !=''){
	 $('.custom-price-range').hide();
	 }else{
	 $('.custom-price-range').show();
	 }
	 })*/
	
	function register_to_mailchimp_and_continue_checkout( self ) {
		let targetFirstGroup = $( ".mc-newsletters-list input[name='group[24817][1]']" ),
			targetSecondGroup = $( ".mc-newsletters-list input[name='group[24817][2]']" );
		
		
		let group1 = targetFirstGroup.is( ':checked' ) ? targetFirstGroup.val() : false;
		let group2 = targetSecondGroup.is( ':checked' ) ? targetSecondGroup.val() : false;
		if( group1 || group2 ) {
			registerCheckoutNewsletter( group1, group2, self );
		}
		//Whether registered to mailchimp or not, trigger checkout again.
		check_validate_form_chechout = true;
		visibility_button( self );
		$( '#place_order' ).trigger( 'click' );
	}
	
	// noinspection JSUnusedLocalSymbols
	function check_captcha_then_continue_mailchimp_registration( captcha_key, self ) {
		let params = {
			action: 'check_captcha',
			secretKey: captcha_key,
		};
		$.ajax( {
			        type: 'post',
			        url: MyAjax.ajaxurl,
			        data: params,
			
			        error: function( xhr ) {
				        console.log( xhr );
				        visibility_button( self );
			        },
			        success: function( response ) {
				        if( response ) {
					        register_to_mailchimp_and_continue_checkout( self );
				        }
				        else {
					        $( '<div class="woocommerce-error captcha3">Failed to verify Google reCAPTCHA. Our systems have detected unusual traffic from your computer network.</div>' ).insertBefore( 'form.woocommerce-checkout' );
					
					        let body = $( "html, body" );
					        body.stop().animate( { scrollTop: 100 }, 500 );
					        setTimeout( function() {
						        $( '.woocommerce-error.captcha3' ).hide( 300 )
					        }, 5000 );
					
					
				        }
			        },
			        complete: function() {
				        visibility_button( self );
			        },
		        } );
	}
	
	function checkVariableProductPrice() {
		let variableProduct = $( '.variable_price_parent' );
		if( variableProduct.data( 'price' ) === variableProduct.data( 'sale' ) ) {
			$( '.total_price_sale' ).hide();
		}
	}
	
	function quantityCreditVariable() {
		let quantityCreditVar = $( '#quantity_credit_in_variable' );
		quantityCreditVar.bind( 'keyup mouseup focus', function() {
			let credit_quantity = $( this ).val();
			$( '#credit_mpvi2' ).val( credit_quantity );
			let variableParent = $( '.variable_price_parent' );
			let price = variableParent.data( 'price' );
			let regular_price = variableParent.data( 'sale' );
			$( '#custom_form_mpvi2 .custom_qty' ).text( $( this ).val() );
			changePrice( price, regular_price, credit_quantity );
		} );
		
		quantityCreditVar.on( 'input', function() {
			let reg = /^\d+$/;
			let value = $( this ).val();
			if( !value.match( reg ) ) {
				$( this ).val( 0 )
			}
		} )
	}
	
	set_configuration_section_dynamic_style_for_resellers();
	bindCountryChange();
	if( $( '#authorized_table' ).length > 0 ) {
		$( '#authorized_table' ).DataTable();
	}
	checkVatException();
	checkEquipInput();
	checkStartAndEndDates( 'startDate', 'endDate' );
	checkStartAndEndDates( 'start-date', 'expiration-date' );
	checkVariableProductPrice();
	quantityCreditVariable();
	
	$( window ).on( 'resize', function() {
		set_configuration_section_dynamic_style_for_resellers();
	} );
	
	// L5P 08-06-2021 - HPT-SM
	$( '#l5ptab1' ).click( function() {
		let i,
			L5PTabContent,
			tablinks;
		L5PTabContent = document.getElementsByClassName( "L5PTabContent" );
		for( i = 0; i < L5PTabContent.length; i++ ) {
			L5PTabContent[ i ].style.display = "none";
		}
		tablinks = document.getElementsByClassName( "tablinks" );
		for( i = 0; i < tablinks.length; i++ ) {
			tablinks[ i ].className = tablinks[ i ].className.replace( " active", "" );
		}
		document.getElementById( 'Note1' ).style.display = "block";
		$( '#l5ptab1' ).addClass( "active" );
	} );
	$( '#l5ptab2' ).click( function() {
		let i,
			L5PTabContent,
			tablinks;
		L5PTabContent = document.getElementsByClassName( "L5PTabContent" );
		for( i = 0; i < L5PTabContent.length; i++ ) {
			L5PTabContent[ i ].style.display = "none";
		}
		tablinks = document.getElementsByClassName( "tablinks" );
		for( i = 0; i < tablinks.length; i++ ) {
			tablinks[ i ].className = tablinks[ i ].className.replace( " active", "" );
		}
		document.getElementById( 'Note2' ).style.display = "block";
		$( '#l5ptab2' ).addClass( "active" );
	} );
	$( '#l5ptab3' ).click( function() {
		let i,
			L5PTabContent,
			tablinks;
		L5PTabContent = document.getElementsByClassName( "L5PTabContent" );
		for( i = 0; i < L5PTabContent.length; i++ ) {
			L5PTabContent[ i ].style.display = "none";
		}
		tablinks = document.getElementsByClassName( "tablinks" );
		for( i = 0; i < tablinks.length; i++ ) {
			tablinks[ i ].className = tablinks[ i ].className.replace( " active", "" );
		}
		document.getElementById( 'Note3' ).style.display = "block";
		$( '#l5ptab3' ).addClass( "active" );
	} );
	$( '#l5ptab4' ).click( function() {
		let i,
			L5PTabContent,
			tablinks;
		L5PTabContent = document.getElementsByClassName( "L5PTabContent" );
		for( i = 0; i < L5PTabContent.length; i++ ) {
			L5PTabContent[ i ].style.display = "none";
		}
		tablinks = document.getElementsByClassName( "tablinks" );
		for( i = 0; i < tablinks.length; i++ ) {
			tablinks[ i ].className = tablinks[ i ].className.replace( " active", "" );
		}
		document.getElementById( 'Note4' ).style.display = "block";
		$( '#l5ptab4' ).addClass( "active" );
	} );
	$( '#VCMBetaDownload1' ).click( function( ev ) {
		betaconfirmation( ev );
	} );
	$( '#VCMBetaDownload2' ).click( function( ev ) {
		betaconfirmation( ev );
	} );
	
	$( 'body' ).delegate( '.choose_free_product', 'click', function() {
		
		window.updated_element = $( this ).attr( 'id' );
		setTimeout( function() {
			$( "[name='update_cart']" ).trigger( "click" );
		}, 0 );
	} )
	
	$( '.add_rtd_logo' ).click( function( e ) {
		e.preventDefault();
		$( this ).parent().children( "input[type='file']" ).trigger( 'click' );
	} );
	$( "input[type='file']" ).change( function() {
		$( this ).parent().children( '.rtd_logo_name' ).text( this.value.replace( /C:\\fakepath\\/i, '' ) );
	} );
	
	$( document.body ).on( 'updated_cart_totals', function() {
		let updatedElement = $( '#' + window.updated_element );
		if( !updatedElement || !updatedElement.length ) {
			delete window.updated_element;
		}
		updatedElement.prop( "checked", true );
	} );
	
	$( document.body ).on( 'update_checkout', bindCountryChange );
	$( document.body ).on( 'updated_checkout', bindCountryChange );
	
	let vinNumber = $( '#vin' );
	if(vinNumber.length)
	{
		vinNumber.attr( 'data-defaultrequired', vinNumber.prop( 'required' ) ? '1' : '0' );
	}

	
	let variationInput = $( 'form.variations_form input[name="variation_id"]' );
	
	variationInput.change( function() {
		checkVatException();
	} )
	
	let mailchimp_form_list = $( '.mc-embedded-subscribe-form' );
	if( mailchimp_form_list.length > 0 ) {
		$( '.mc-embedded-subscribe-form input[type="submit"]' ).bind( 'click', function( event ) {
			let mailchimp_form = $( this ).closest( 'form' );
			if( event )
				event.preventDefault();
			register( mailchimp_form, this );
		} );
	}
	
	$( '#simple_form_' ).submit( function() {
		$( '.single_add_to_cart_button' ).addClass( 'disabled_button_' );
	} );
	
	let check_validate_form_chechout = false;
	$( document ).on( 'click', '#place_order', function( event ) {
		if( !check_validate_form_chechout ) {
			event.stopPropagation();
			disabled_button( this );
			// let captcha_key = $('#g-recaptcha-response').val();
			// if (typeof captcha_key !== 'undefined') {
			//     check_captcha_then_continue_mailchimp_registration(captcha_key, this);
			// }
			// else {
			register_to_mailchimp_and_continue_checkout( this );
			//}
			
		}
		//if reCaptcha failed, then check_validate_form_checkout will remain false and checkout process should be stopped
		return check_validate_form_chechout;
		
	} );
	
	$( '#serial_number_for_udp' ).on( 'change', function() {
		$( this ).next().val( ( this.value[ 0 ] == 1 ? 'mpvi1' : 'mpvi2' ) );
	} );
	
	$( 'body' ).delegate( '.coupon_process_udp_product', 'change', function() {
		$( this ).next().val( ( this.value[ 0 ] == 1 ? 'mpvi1' : 'mpvi2' ) );
	} );
	
	$( document.body ).on( 'updated_cart_totals', function() {
		let checkoutButton = $( "a.checkout-button" );
		if( checkoutButton.hasClass( "disabled_button_" ) ) {
			checkoutButton.removeClass( "disabled_button_" )
		}
	} );
	
	$( '#scheduleBSection input[type="number"]' ).on( 'change input', function() {
		$( this ).attr( 'min', 0 ).val( Math.abs( +$( this ).val() ) );
	} );
	
	$( '.edit_device_data' ).on( 'click', function( e ) {
		e.preventDefault();
		let edit = $( this );
		device_edit_action( edit );
	} );
	
	$( '.save_device_data' ).on( 'click', function( e ) {
		e.preventDefault();
		let save = $( this );
		device_save_action( save );
	} );
	
	$( '#search_device1_input' ).on( 'keyup', function(e) {
	
		e.preventDefault();
		//let input = $( this );
		//let table = $( '#device_list_table1' );
		//search_device_in_list( input, table );

		//let input = $( this );
		let search_serial = $( this ).val();
		if ( search_serial.length > 0 || search_serial == ''  ) {

			let params = {
				action: 'custom_serial_search_m1',
				serial_search: search_serial,
			};
	
			$.ajax( {
				type: 'post',
				url: MyAjax.ajaxurl,
				data: params,
				beforeSend: function() {
					$('#device_list_table1').addClass('show-loader');
				},
				complete: function() {
					$('#device_list_table1').removeClass('show-loader');
				},
				success: function( response ) {
					
					if ( !response.filter_satus  ) {
	
						$(".mpvi1-pagination").show();
					
					}
	
					if ( response.filter_satus  ) {
	
						$(".mpvi1-pagination").hide();
	
					}	
	
					if ( response.html != '' ) {
	
						$('table#device_list_table1 tr.mpvi1-data').remove();
						$("table#device_list_table1 tbody").append(response.html);
						
					}
	
					$( '.edit_device_data' ).on( 'click', function( e ) {
						e.preventDefault();
						let edit = $( this );
						device_edit_action( edit );
					} );	
	
					$( '.save_device_data' ).on( 'click', function( e ) {
						e.preventDefault();
						let save = $( this );
						device_save_action( save );
					} );
	
				},
			} );  

		}

	} );
	
	$( '#search_device2_input' ).on( 'keyup', function(e) {

		e.preventDefault();	
		let input = $( this );
		let search_serial = $( this ).val();
		//let table = $( '#device_list_table2' );
		//search_device_in_list( input, table );
		
		if ( search_serial.length > 0 || search_serial == ''  ) {
			let params = {
				action: 'custom_serial_search_m2',
				serial_search: search_serial,
			};
			
			$.ajax( {
				type: 'post',
				url: MyAjax.ajaxurl,
				data: params,
				beforeSend: function() {
					$('#device_list_table2').addClass('show-loader');
				},
				complete: function() {
					$('#device_list_table2').removeClass('show-loader');	
				},
				success: function( response ) {
					
					if ( !response.filter_satus  ) {

						$(".mpvi2-pagination").show();
					
					}

					if ( response.filter_satus  ) {

						$(".mpvi2-pagination").hide();

					}	


					if ( response.html != '' ) {

						$('table#device_list_table2 tr.mpvi2-data').remove();
						$("table#device_list_table2 tbody").append(response.html);
						
					}

					$( '.edit_device_data' ).on( 'click', function( e ) {
						e.preventDefault();
						let edit = $( this );
						device_edit_action( edit );
					} );	

					$( '.save_device_data' ).on( 'click', function( e ) {
						e.preventDefault();
						let save = $( this );
						device_save_action( save );
					} );

				},
			} );  
		}	
	} );
	
	$( '.mpvi2-custom-add-to-cart' ).on( 'click', function( e ) {
		e.preventDefault();
		let customMPVI2AddToCartButton = $( this );
		let form = customMPVI2AddToCartButton.closest( 'form' );
		let product_qty = form.find( 'input[name=quantity]' ).val() || 1;
		let credits_quantity = form.find( 'input[name=credit_quantity]' ).val() || 0;
		let mpvi2_selected_product = form.find( 'input[name=mpvi2_product_selection]:checked' ).data( 'sku' );
		let params = {
			action: 'custom_mpvi2_add_to_cart',
			sku: mpvi2_selected_product,
			quantity: product_qty,
			credits: credits_quantity,
			security: MyAjax.hpt_custom_mpvi2_security_nonce,
		};
		$( document.body ).trigger( 'adding_to_cart', [ customMPVI2AddToCartButton, params ] );
		$.ajax( {
			        type: 'post',
			        url: MyAjax.ajaxurl,
			        data: params,
			        beforeSend: function() {
				        form.find( '.form_footer_blok .form-response-fail' ).remove();
				        customMPVI2AddToCartButton.removeClass( 'added' ).addClass( 'loading' );
			        },
			        complete: function() {
				        customMPVI2AddToCartButton.addClass( 'added' ).removeClass( 'loading' );
			        },
			        success: function( response ) {
				        if( response.success === false && response.data ) {
					        form.find( '.form_footer_blok ' ).append( '<p class="form-response-fail error">' + response.data + '</p>' )
				        }
				        if( response.error && response.product_url ) {
					        window.location = response.product_url;
				        }
				        else {
					        $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, customMPVI2AddToCartButton ] );
				        }
			        },
		        } );
		return false;
	} );

	//set a default value for SKU
	$( "#custom_form_mpvi3 .blok_meta .sku" ).text( $( 'input[name=mpvi3_product_selection]:checked' ).data( 'sku' ) );

	$( '.mpvi3-custom-add-to-cart' ).on( 'click', function( e ) {
		e.preventDefault();
		let customMPVI3AddToCartButton = $( this );
		let form = customMPVI3AddToCartButton.closest( 'form' );
		let product_qty = form.find( 'input[name=quantity]' ).val() || 1;
		let credits_quantity = form.find( 'input[name=credit_quantity]' ).val() || 0;
		let mpvi3_selected_product = form.find( 'input[name=mpvi3_product_selection]:checked' ).data( 'sku' );
		let params = {
			action: 'custom_mpvi3_add_to_cart',
			sku: mpvi3_selected_product,
			quantity: product_qty,
			credits: credits_quantity,
			security: MyAjax.hpt_custom_mpvi3_security_nonce,
		};
		$( document.body ).trigger( 'adding_to_cart', [ customMPVI3AddToCartButton, params ] );
		$.ajax( {
			        type: 'post',
			        url: MyAjax.ajaxurl,
			        data: params,
			        beforeSend: function() {
				        form.find( '.form_footer_blok .form-response-fail' ).remove();
				        customMPVI3AddToCartButton.removeClass( 'added' ).addClass( 'loading' );
			        },
			        complete: function() {
				        customMPVI3AddToCartButton.addClass( 'added' ).removeClass( 'loading' );
			        },
			        success: function( response ) {
				        if( response.success === false && response.data ) {
					        form.find( '.form_footer_blok ' ).append( '<p class="form-response-fail error">' + response.data + '</p>' )
				        }
				        if( response.error && response.product_url ) {
					        window.location = response.product_url;
				        }
				        else {
					        $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, customMPVI3AddToCartButton ] );
				        }
			        },
		        } );
		return false;
	} );
	
	$( 'form.cart_group' ).on( 'submit', function() {
		$( '.single_add_to_cart_button' ).addClass( 'loading' );
	} );
	
	$( '.collapsibleheader' ).on( 'click', function( e ) {
		if( window.event && !e ) {
			e = window.event;
		}
		
		let parentdiv = e.target || e.srcElement;
		
		let divs = document.getElementsByTagName( "div" );
		for( let i = 0; i < divs.length; i++ ) {
			if( divs[ i ] === parentdiv ) {
				let next = divs[ i + 1 ];
				if( next.style.display === "block" ) {
					next.style.display = "none";
				}
				else {
					next.style.display = "block";
				}
			}
		}
	} );
	
	$( '.inputIncrementDecrement .arrows button' ).on( 'click', function( e ) {
		e.preventDefault()
		let credit_quantity = parseInt( $( this ).closest( '.inputIncrementDecrement' ).find( 'input' ).val() );
		let val;
		if( $( this ).hasClass( 'up' ) ) {
			val = credit_quantity + 1
		}
		else if( $( this ).hasClass( 'down' ) && credit_quantity > 1 ) {
			val = credit_quantity - 1
			
		}
		else {
			val = 0;
		}
		
		$( this ).closest( '.inputIncrementDecrement' ).find( 'input' ).val( val );
		
		let variableParent = $( '.variable_price_parent' );
		let price = variableParent.data( 'price' );
		let regular_price = variableParent.data( 'sale' );
		$( '#custom_form_mpvi2 .custom_qty' ).text( val );
		changePrice( price, regular_price, val );
	} )
	
	//set a default value for SKU
	$( "#custom_form_mpvi2 .blok_meta .sku" ).text( $( 'input[name=mpvi2_product_selection]:checked' ).data( 'sku' ) );
	
	$( "#custom_form_mpvi2 .mpvi2_radio" ).change( function() {
		let self = $( this );
		let price = self.data( 'priceprod' );
		let regular_price = self.data( 'sale' );
		let credit_quantity = $( '#quantity_credit_in_variable' ).val();
		let proSpan = $( '.pro_feature span' );
		// proSpan.text( 'NA' );
		$( "#custom_form_mpvi2 .blok_meta .sku" ).text( self.data( 'sku' ) );
		$( "#stock_manage_allow_date" ).text( self.data( 'available' ) );
		// $( "#custom_form_mpvi2 .blok_meta .category_meta_parent" ).html( self.data( 'category' ) );
		// $( "#custom_form_mpvi2 .blok_meta .tags_parent" ).html( self.data( 'tag' ) );
		proSpan.text( self.val() );
		changePrice( price, regular_price, credit_quantity );
		$( '#custom_form_mpvi2 button[type=submit]' ).prop( 'disabled', !self.attr( 'data-purchasable' ) );
		
		$( '#custom_form_mpvi2' ).submit( function( ev ) {
			if( !self.attr( 'data-purchasable' ) ) {
				ev.preventDefault();
			}
		} )
	} );
	
	$( '.form_footer_blok .quantity input' ).bind( 'keyup mouseup focus', function() {
		if( $( this ).val() >= 100 ) {
			$( this ).val( 100 );
		}
	} );
	
	// MPVI2 Configuration Style
	$( '.composite_button .quantity input' ).hasClass( 'qty' ) ? $( 'body' ).addClass( 'product_res' ) : '';
	$( ".product_meta" ).clone().appendTo( ".blok_p_conf" );
	
	$( ".component.first .radio_button_input .radio_button" ).change( function() {
		$( '.pro_feature span' ).text( 'NA' );
		if( $( this ).parents( '.component_option_radio_button' ).find( '.radio_button_description h5' ).text() !== 'No Pro Features' ) {
			$( this ).parents( '.component_option_radio_button.selected' ) ? $( '.pro_feature span' ).text( 'YES' ) : $( '.pro_feature span' ).text( 'NA' );
		}
	} );
	$( '.composite_button' ).append( '<div class="custom_quantity"></div>' );
	$( ".stock.available-on-backorder" ).clone().appendTo( ".custom_quantity" );
	$( '.composite_availability' ).remove();
	$( '.composite_form + .product_meta' ).addClass( 'hidden_meta' );
	$( '.hidden_meta' ).css( {
		                         visibility: 'hidden'
	                         } );
	$( ".component.last .quantity .qty" ).click( function() {
		$( '.custom_qty' ).text( $( ".component.last .quantity .qty" ).val() );
	} );
	$( '.composite_wrap' ).prepend( '<div class="mpvi2_blok"></div>' )
	$( '.mpvi2_blok' ).prepend( '<img id="theImg" class="mpvi2_img" src="' + $( "#mpvi2-section-1 img" ).attr( "src" ) + '" alt="MPVI2" />' )
	$( '.mpvi2_blok' ).append( '<p class="pro_feature">Pro Features: <span> NA </span></p>' );
	$( '.mpvi2_blok' ).append( '<p class="custom_credit">CREDITS: <span class="custom_qty">' + $( ".component.last .quantity .qty " ).val() + '</span></p>' );
	$( '.product_res .mpvi2_prod form > div .component_inner' ).css( {
		                                                                 height: '170px'
	                                                                 } );
	
	$( '.add_credits_bank ' ).click( function() {
		$( this ).closest( '.wrap_credits_row' ).find( '.wrap_credits' ).toggle( 200 );
	} );
	
	$( '#input_quantity' ).bind( 'keyup mouseup focus', function() {
		let credit_qty = $( this ).data( 'credit' );
		if( $( this ).val() >= credit_qty ) {
			$( this ).val( credit_qty );
		}
	} );
	
	$( '#transfer_serial_number' ).bind( 'input ', function() {
		$( '#transfer_submit' ).prop( 'disabled', true );
		$( '.name_customer_wraper' ).css( "display", "block" );
		$( '.name_customer_wraper .name_customer' ).empty();
		$( this ).css( "border", "#fff solid 1px" );
		if( $( this ).val().length > 10 ) {
			$( this ).css( "border", "red solid 1px" );
		}
		
		if( $( this ).val().length === 10 ) {
			$( this ).prop( 'disabled', true );
			$( '.input_quantity' ).focus();
			$( '.name_customer_wraper .button' ).addClass( 'loading' );
			
			let data = {
				serial_number: $( this ).val(),
				action: 'get_username_by_serial_number_and_check_serial_number'
			};
			// noinspection JSUnresolvedVariable
			$.ajax( {
				        type: 'POST',
				        url: MyAjax.ajaxurl,
				        data: data,
				        error: function( err ) {
					        console.log( err );
				        },
				        success: function( data_json ) {
							$( '.name_customer_wraper' ).css( "border", "1px solid #929292" );
					        let data_res = $.parseJSON( data_json );
					        if( data_res[ 'success' ] ) {
						        $( '.name_customer_wraper' ).css( 'border-color', '#0f75bd' ).find( '.name_customer' ).html( 'Name: '+data_res[ 'name' ] );
						        $( '#transfer_submit' ).prop( 'disabled', false );
						
					        }
					        else {
						        $( '.name_customer_wraper' ).css( 'border-color', 'red' ).find( '.name_customer' ).html( data_res[ 'error' ] );
						        if( data_res[ 'transfer' ] ) {
							        $( '#transfer_submit' ).prop( 'disabled', false );
						        }
						
					        }
					        $( '#transfer_serial_number' ).prop( 'disabled', false );
					        $( '.name_customer_wraper .button' ).removeClass( 'loading' );
					
				        }
			        } );
		}
	} );

	//jQuery( '#credit_transfer_history' ).DataTable({
	//	order: [[0, 'desc']]
	//});
	
	$( '#transfer_submit' ).click( function() {
		let isValid = true;
		let transferSerialNumber = $( '#transfer_serial_number' ),
			inputQuantity = $( '#input_quantity' ),
			inputNote = $( '#input_note' );
		$( '#transfer_submit' ).prop( 'disabled', true );
		let serial_number = transferSerialNumber.val();
		let serial_number_field = transferSerialNumber;
		let quantity_field = inputQuantity;
		let quantity = inputQuantity.val();
		let dealer_amount = inputQuantity.data( 'credit' );
		let captcha_key = $('#g-recaptcha-response').val();
		let captchaEnable = $('[name=captchaEnable]').val();
		let note = $( '#input_note' ).val();

		transferSerialNumber.css( 'border-color', '#fff' );
		inputQuantity.css( 'border-color', '#fff' );
		inputNote.css( 'border-color', '#fff' );
		
		if ( serial_number == '' ) {
			transferSerialNumber.css( 'border-color', 'red' );
			transferSerialNumber.css( 'border-style', 'solid' );
			transferSerialNumber.css( 'border-width', '2px' );
		}
		if ( quantity == '' ) {
			inputQuantity.css( 'border-color', 'red' );
			inputQuantity.css( 'border-style', 'solid' );
			inputQuantity.css( 'border-width', '2px' );
		}

		if( isNaN( serial_number ) || serial_number.length !== 10 ) {
			isValid = setInvalid( serial_number_field );
		}
		if( isNaN( quantity ) || quantity > dealer_amount || quantity <= 0 ) {
			isValid = setInvalid( quantity_field );
		}
		
		if( isValid ) {
			$( '#transfer_submit + .button' ).addClass( 'loading' );
			let data = {
				qty: quantity,
				serial_number: serial_number,
				captcha_key:captcha_key,
				captchaEnable:captchaEnable,
				input_note:note,
				action: 'transfer_credit_to_customer'
			};
			$.ajax( {
				        type: 'POST',
				        url: MyAjax.ajaxurl,
				        data: data,
				        error: function( err ) {
					        console.log( err );
				        },
				        success: function( data_json ) {
					
					        let data_res = $.parseJSON( data_json );
					        if( data_res[ 'success' ] ) {
						        $( '.error_server' ).empty().hide();
						        location.reload();
					        }
					        else {
						        $( '.error_server' ).show().html( data_res[ 'error' ] );
						        $( '#transfer_submit' ).prop( 'disabled', false );
						        $( '#transfer_submit + .button' ).removeClass( 'loading' );
						
					        }
					
				        }
			        } )
		}else{
			$( '#transfer_submit' ).prop( 'disabled', false );
		}
	} );
	
	// Enable/disable "Add to cart" button for "Dodge PCM Modification Service" product
	$( '#hpt_pcm_option' ).change( function() {
		let uploadButton = $( '#hpt-upload_button' );
		uploadButton.prop( 'required', false );
		uploadButton.css( 'width', '.1px' );
		let vinInput = $('.variations_form.cart .woocommerce-variation-add-to-cart #vin');

		if( this.value === 'Spare' || this.value === 'New' ) {
			if( !( $( '.singl_product_checkbox' ).is( ":checked" ) ) ) {
				uploadButton.prop( 'required', true );
				uploadButton.css( 'width', 'initial' );
			}
		}
		if( this.value === "Original" ) {
			$('.hpt-file-field > label .show_required').hide();
			vinInput.prop('disabled', true).addClass('hpt-disabled');
		} else {
			$('.hpt-file-field > label .show_required').show();
			vinInput.prop('disabled', false).removeClass('hpt-disabled');
		}
	} );
	
	$( '.singl_product_checkbox' ).click( function() {
		let uploadButton = $( '#hpt-upload_button' ),
			pcmSelectedValue = $( '#hpt_pcm_option option:selected' ).val();

		if( $( this ).is( ':checked' ) ) {
			uploadButton.prop( 'required', false );
			uploadButton.css( 'width', '.1px' );
		}
		else if ( pcmSelectedValue !== "Original" ) {
			uploadButton.prop( 'required', true );
			$('.hpt-file-field > label .show_required').show();
		}
	} );

    // Purchase/Update options custom dropdowns show/hide for a specific product
    if ( $('body').hasClass('consolidation-product') ) {
        // Initially hide some fields
        $('body .variations').find('select#pa_vehicle-make').parent().parent().hide();
        $('body .variations').find('select#pa_vehicle-model').parent().parent().hide();
        $('body .single_variation_wrap').find('.singl_product_checkbox').parent().hide();
		$('body .summary').find('select#hpt_pcm_option').parent().hide();
        // Get service attribute
        var serviceDropdown = $('select[name="attribute_service"]');
        // Capture the change event of the Service dropdown
        serviceDropdown.on('change', function () {
            // Get the selected variation value
            var selectedVariation = $(this).val();
            // If it's not the default, then show fields accordingly based on the service selection, else hide and revert everything to default
            if ( selectedVariation != '' ) {
                if ( selectedVariation === 'Purchase' ) {
                    // Purchase option: show Vehicle Make and Vehicle Model dropdowns, hide other fields except file upload
                    $('body .variations').find('select#pa_vehicle-make').parent().parent().show();
                    $('body .variations').find('select#pa_vehicle-model').parent().parent().show();
					$('table.variations > tbody > tr:nth-child(3) > th.label').show();
					$('table.variations select#pa_vehicle-model').show();
					$('body .summary').find('select#hpt_pcm_option').prop('required',false).parent().hide();
                } else if ( selectedVariation === 'Upgrade' ) {
                    // Upgrade option: show VIN and Ship MPVI3 options, hide other fields except file upload
                    $('body .single_variation_wrap').find('.singl_product_checkbox').parent().show();
                    $('body .variations').find('select#pa_vehicle-make').parent().parent().hide();
                    $('body .variations').find('select#pa_vehicle-model').parent().parent().show();
					$('table.variations > tbody > tr:nth-child(3) > th.label').hide();
					$('table.variations select#pa_vehicle-model').hide();
					$('body .summary').find('select#hpt_pcm_option').parent().show();
                    // Automatically choose Upgrade for both hidden fields to continue the variation selection process
                    $('body .variations').find('select#pa_vehicle-make option[value="upgrade"]').prop("selected", true);
                    $('body .variations').find('select#pa_vehicle-model option[value="upgrade"]').prop("selected", true);
					$('body .summary').find('.pcm_option_wrap').insertBefore($('.single_variation_wrap'));
                } else {
                }
            } else {
                $('body .variations').find('select#pa_vehicle-make').parent().parent().hide();
                $('body .variations').find('select#pa_vehicle-model').parent().parent().hide();
                $('body .single_variation_wrap').find('.singl_product_checkbox').parent().hide();
                // Revert Vehicle Make and Vehicle Model dropdown options to default
                $('body .variations').find('select#pa_vehicle-make option').prop("selected", function () { return this.defaultSelected; } );
                $('body .variations').find('select#pa_vehicle-model option').prop("selected", function () { return this.defaultSelected; });
            }
        });
		// Fix issues with not properly clearing
		let vinInput = $('.variations_form.cart .woocommerce-variation-add-to-cart #vin');
		let pcmOption = $('#hpt_pcm_option');
		let uploadButton = $( '#hpt-upload_button' );
		$('a.reset_variations').on('click', function() {
			uploadButton.prop( 'required', true ).css( 'width', 'initial' );
			pcmOption.prop('selectedIndex', 0);
			$('.pcm_option_wrap').hide();
			$('.hpt-file-field > label .show_required').show();
			vinInput.prop('disabled', false).removeClass('hpt-disabled');
			$('#service').prop('selectedIndex', 0);
		});
		$('#service').on('change', function() {
			if ($(this).prop('selectedIndex') === 0) {
				uploadButton.prop( 'required', true ).css( 'width', 'initial' );
				$('.hpt-file-field > label .show_required').show();
				pcmOption.prop('selectedIndex', 0);
				$('.pcm_option_wrap').hide();
				vinInput.prop('disabled', false).removeClass('hpt-disabled');
			}
		});
    }

    // Purchase/Upgrade & Program/Upgrade Only options custom dropdowns show/hide for a specific product
    if ( $('body').hasClass('t87a-product') ) {
        // Initially hide some fields but don't hide if error on page!
		if($(".woocommerce-error").length){
        } else {
			$('body .variations').find('select#pa_tcm-type').parent().parent().hide();
			$('body .single_variation_wrap').find('.custom_vin').hide();
		}
        // Get service attribute
        var serviceDropdown = $('select[name*="attribute_pa_tcm"]');
        // Capture the change event of the Service dropdown
        serviceDropdown.on('change', function () {
            // Get the selected variation value
            var selectedVariation = $(this).val();
            // If it's not the default, then show fields accordingly based on the service selection, else hide and revert everything to default
            if ( selectedVariation != '' ) {
                console.log(selectedVariation);
                if ( selectedVariation == 'purchase' ) {
                    $('body .variations').find('select#pa_tcm-type').parent().parent().show();
                    $('body .single_variation_wrap').find('.custom_vin').show();
					$('table.variations > tbody > tr:nth-child(2) > th.label').show();
					$('table.variations #pa_tcm-type').show();  
                } else if ( selectedVariation == 'upgrade-and-program' ) {
					$('body .variations').find('select#pa_tcm-type option[value="upgrade"]').prop("selected", true);
                    $('body .single_variation_wrap').find('.custom_vin').show();           
					$('body .variations').find('select#pa_tcm-type').parent().parent().show(); 
					$('table.variations > tbody > tr:nth-child(2) > th.label').hide();
					$('table.variations #pa_tcm-type').hide();      
                } else if ( selectedVariation == 'upgrade-only' ) {
					$('body .variations').find('select#pa_tcm-type option[value="upgrade"]').prop("selected", true);
                    $('body .single_variation_wrap').find('.custom_vin').hide();
					$('body .variations').find('select#pa_tcm-type').parent().parent().show(); 
					$('table.variations > tbody > tr:nth-child(2) > th.label').hide();
					$('table.variations #pa_tcm-type').hide();
                } else {
                    console.log("Something's wrong!");
                }
            } else {
                $('body .single_variation_wrap').find('.custom_vin').hide();
                // Revert TCM Tpye dropdown options to default
                $('body .variations').find('select#pa_tcm-type option').prop("selected", function () { return this.defaultSelected; } );
            }
        });
    }
});

window.onload = function() {
	//initialize
	
	let mpvi1_import_form = "dv-hpt-import-mpvi1";
	let mpvi2_import_form = "dv-hpt-import-mpvi2";
	let maintenance_warning = "dv-hpt-planned-maintenance-warning-message";
	let show_mpvi1_form = getCookie( mpvi1_import_form );
	let show_mpvi2_form = getCookie( mpvi2_import_form );
	
	set_element_state( mpvi1_import_form, show_mpvi1_form );
	set_element_state( mpvi2_import_form, show_mpvi2_form );
	setCookieToDefaultIfEmptyThenSetElementState( maintenance_warning, 1, 30 );
	
	//Optimization iframe for Youtube
	optimizeUI();
	checkCarModelByHash();
	
	// L5P 2-22-2021 - HPT-HS
	let defaultOpen = document.getElementById( "defaultOpen" );
	if( defaultOpen ) {
		defaultOpen.click();
	}
};

jQuery(document).on( 'woocommerce_variation_select_change', '.variations_form.cart', function(){
	setTimeout( function() {
		if( jQuery('.reset_variations').css("visibility") !== "hidden" ){
			if( jQuery('.clr-filter-txt').length == 0 ){
				jQuery('.reset_variations').after('<p class="clr-filter-txt">Clear the filter to see all the options.</p>');
			}
		}else{
			jQuery('.clr-filter-txt').remove();
		}
	}, 100 );
})

jQuery( document ).ready(function() { 
	// Function to check for PO Box error conditions and add classes
	function checkAndApplyPoboxClasses() {
		var fields = [
			{ id: '#shipping_address_1', field: '#shipping_address_1_field' },
			{ id: '#shipping_address_2', field: '#shipping_address_2_field' },
			{ id: '#shipping_postcode', field: '#shipping_postcode_field' },
			{ id: '#billing_address_1', field: '#billing_address_1_field' },
			{ id: '#billing_address_2', field: '#billing_address_2_field' },
			{ id: '#billing_postcode', field: '#billing_postcode_field' }
		];
	
		fields.forEach(function(item) {
            var value = jQuery(item.id).val();
            if (value !== undefined && value !== null) {
                value = value.toLowerCase().replace(/[\s.,]/g, '');
                if (value.includes('pobox') || value.includes('p0box')) {
                    jQuery(item.field).addClass('pobox-error');
                } else {
                    jQuery(item.field).removeClass('pobox-error');
                }
            } else {
                jQuery(item.field).removeClass('pobox-error');
            }
        });
	}	

    checkAndApplyPoboxClasses();
    jQuery('form.checkout').on('submit', function() {
        checkAndApplyPoboxClasses();
    });
});
