jQuery(document).ready(function(){


    jQuery('body').on('click', '#trigger_file', function () {
        jQuery('#hpt-upload_button').trigger('click');

    });
    jQuery('#hpt-upload_button').change(function () {
        var x = document.getElementById("hpt-upload_button");
        var txt = "";
        var allowed_extensions = ['hpt','rtd'];
        var file_name_change = '';
        if ('files' in x) {
            txt += "<div id='upload_view_html'>";
            var file_extension = x.files[0]['name'].split('.').pop().toLowerCase();
            var file_name = x.files[0]['name'].split('.').shift().toLowerCase();
            var file_size = x.files[0]['size'];
            for (var i = 0; i < file_name.length; i++) {
                if (i < 10) {
                    file_name_change += file_name[i];
                } else {
                    file_name_change += '...';
                    break;
                }
            }
            var file = x.files[0];
            if (!allowed_extensions.includes(file_extension)) {
                txt += '<p class="error_file_valid">you can upload only .hpt or .rtd files</p>';
                document.getElementById("hpt-upload_button").name = '';
                document.getElementById("uploads_view").style.backgroundColor = '#bd1919';
                jQuery(':input[type="submit"]').prop('disabled', true);
            } else {
                var one_mb = 3145728;
                if (file_size <= one_mb) {
                    document.getElementById("hpt-upload_button").name = 'file_hpt';
                    if ('name' in file) {
                        txt += "<p class='file_name'>" + file_name_change + '.' + file_extension + "</p>";
                    }
                    if ('size' in file) {
                        txt += "<span>size: " + file.size + " bytes </span><br>";
                    }
                    document.getElementById("uploads_view").style.backgroundColor = '#ededed';
                    jQuery(':input[type="submit"]').prop('disabled', false);
                } else {
                    document.getElementById("hpt-upload_button").name = '';
                    document.getElementById("uploads_view").style.backgroundColor = '#bd1919';
                    jQuery(':input[type="submit"]').prop('disabled', true);
                    txt += '<p class="error_file_valid">The file size can not be more than 3MB</p>';
                }
            }

            txt += '</div>';
        }
        document.getElementById("uploads_view").style.visibility = "visible";
        document.getElementById("uploads_view").style.marginTop = "5px";
        document.getElementById("uploads_view").innerHTML = txt;
    });
});