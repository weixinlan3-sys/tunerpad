//Header/Nav responsive re-arrange
jQuery(function() {
	function reArrangeNav() {
		if (jQuery(window).width() < 1290) {
			jQuery("header .site-search").insertAfter("header .site-branding");
			jQuery("header .site-header-cart").insertAfter("header .site-branding");
			jQuery("header .secondary-navigation").insertAfter("header .site-branding");
			jQuery("header .site-search").show();
		} else {
			jQuery("header .site-search").insertAfter("header #site-navigation");
			jQuery("header .site-header-cart").insertAfter("header #site-navigation");
			jQuery("header .secondary-navigation").insertAfter("header #site-navigation");
			jQuery("header .site-search").show();
		}
    if (jQuery(window).width() < 768) {
			jQuery("header .site-search").hide();
		}
    var maintenanceBox = jQuery('#dv-hpt-planned-maintenance-warning-message');
    if(maintenanceBox){
      if (jQuery(window).width() < 1290) {
        jQuery('#dv-hpt-planned-maintenance-warning-message').prependTo('#masthead');
      } else {
        jQuery('#dv-hpt-planned-maintenance-warning-message').prependTo('#masthead > .col-full');
      }
    }
	} reArrangeNav();
  // Tooltip disable link click
  jQuery('.css-tooltip').click(function(e) {
      e.preventDefault();
  });
  // Resize
	jQuery(window).resize(function() {
		reArrangeNav();
	});
});

// Klaviyo Flyout Form Trigger
var newsletterSignUp = document.querySelector('a[href*="newsletter-signup"]')
if(newsletterSignUp){
    newsletterSignUp.addEventListener('click', function (){
        event.preventDefault();
        var _klOnsite = window._klOnsite || []; _klOnsite.push(['openForm', 'T3rDE5']);
    });
}
if (window.location.href.indexOf("newsletter-signup") > -1) {
  var _klOnsite = window._klOnsite || []; _klOnsite.push(['openForm', 'T3rDE5']);
}

//Sticky nav + fix padding/margin to compensate for sticky nav
const nav = document.querySelector('#masthead');
let navTop = nav.offsetTop;

function scrolledNav() {
  if (window.scrollY > navTop) {    
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', scrolledNav);

let prevScrollpos = window.pageYOffset;
let headerHeight = document.querySelector('#masthead').offsetHeight;
let headerHeightNegPX = (- headerHeight + "px");
let headerHeightPX = (headerHeight + "px");
let headerHeightInitialPX = (headerHeight + "px");
const breadcrumbs = document.querySelector('.storefront-breadcrumb');
const contentID = document.querySelector('#content');

function setPadMargForStickyMenu() {
  if(breadcrumbs) { breadcrumbs.style.marginTop = headerHeightPX; }
  if(!breadcrumbs || document.body.classList.contains('page-template-page-mpvi3')) { contentID.style.paddingTop = headerHeightPX; }
  if(breadcrumbs) { if(jQuery(window).width() < 567) { breadcrumbs.style.marginTop = headerHeightInitialPX; } }
} setPadMargForStickyMenu();


window.addEventListener('scroll',(e) => {
    let currentScrollPos = window.pageYOffset;
    setPadMargForStickyMenu();

    if (prevScrollpos > currentScrollPos) {
        document.getElementById("masthead").style.top = "0";
    } else {
        // document.getElementById("masthead").style.top = headerHeightNegPX;
        document.getElementById("masthead").style.top = "0";
    }
    prevScrollpos = currentScrollPos;
});
window.addEventListener("resize", function(){
    headerHeight = document.querySelector('#masthead').offsetHeight;
    headerHeightNegPX = (- headerHeight + "px");
    headerHeightPX = (headerHeight + "px");
    setPadMargForStickyMenu();
});
jQuery(window).on("load", function() {
  headerHeight = document.querySelector('#masthead').offsetHeight;
  headerHeightNegPX = (- headerHeight + "px");
  headerHeightPX = (headerHeight + "px");
  setPadMargForStickyMenu();
});
//Scroll to top
document.addEventListener("scroll", handleScroll);

var scrollToTopBtn = document.querySelector(".scrollTop");

function handleScroll() {
  var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var GOLDEN_RATIO = 0.25;

  if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
}
window.addEventListener('scroll',(e) => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    scrollToTopBtn.classList.add('bottom');
  } else {
    scrollToTopBtn.classList.remove('bottom');
  }
});

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

//maintenance blue bar close/fix adjust main nav
var maintenanceBlueBarXout = document.getElementById("xCloseMaintenanceWarning");
if(maintenanceBlueBarXout){
  maintenanceBlueBarXout.addEventListener('click', function (){
    headerHeight = document.querySelector('#masthead').offsetHeight;
    headerHeightNegPX = (- headerHeight + "px");
    headerHeightPX = (headerHeight + "px");
    setPadMargForStickyMenu();
  });
}

//homepage partners - above footer
if (document.body.classList.contains('home')) {
  var templateUrl = object_name.templateUrl;

  function displayPics() {
    imagesArray = [
      "amw4x4.svg", "icon.svg", "k-and-n.svg", "magnuson.svg", "pri.svg", "procharger.svg", "roadster-shop.svg", "sema.svg", "skip-barber.svg", "speedkore.svg", "uti.svg", "whipple.svg", "vcm-logo.png", "speed-society.svg", "ripp-superchargers.svg"
    ],
    linksArray = [
      "https://www.amw4x4.com/", "https://www.icon4x4.com/", "https://www.knfilters.com/", "https://magnusonsuperchargers.com/", "https://www.performanceracing.com/", "https://www.procharger.com/", "https://roadstershop.com/", "https://www.semashow.com/", "https://www.skipbarber.com/", "https://speedkore.com/", "https://www.uti.edu/", "https://whipplesuperchargers.com/", "https://vcmperformance.com.au/", "https://speedsociety.com/" , "https://rippmods.com/"
    ],
    altArray = [
      "America's Most Wanted 4x4", "ICON", "K&N", "Magnuson Superchargers", "Performance Racing Industry", "ProCharger Superchargers", "Roadster Shop", "SEMA Specialty Equipment Marketing Association", "Skip Barber Racing School", "SpeedKore Performance Group", "UTI Universal Technical Institute", "Whipple Superchargers", "VCM Performance", "Speed Society", "RIPP Superchargers"
    ]
    shuffle = function(o) {
      for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };
    var randorder = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]);

    jQuery('.featured-partners .logos > div > a').each(function(i) {
      var randNumber = randorder[i];
      jQuery(this).append('<img height="65" alt="' + altArray[randNumber] +'" src="' + templateUrl + '/images/partners/' + imagesArray[randNumber] + '"/>');
      jQuery(this).attr("href", linksArray[randNumber]);
    });
    
  }
  displayPics();
}

//Shipping accordion trigger
jQuery('.shipAccordTrigger').click(function(e){
  e.preventDefault();
  jQuery('.shippingButton').trigger('click');
});

//Offset error notices cause fixed header
jQuery( function( $ ) {
  $.scroll_to_notices = function( scrollElement ) {
    if ( scrollElement.length ) {
      $( 'html, body' ).animate( { scrollTop: ( scrollElement.offset().top - 300 ) }, 700 );
    }
  };
});