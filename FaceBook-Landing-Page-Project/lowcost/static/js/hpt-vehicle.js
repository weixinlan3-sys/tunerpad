let vehicle = {
    date_vehicle: {action: 'get_vehicle_data'},
    ids_array : [],
    submit_form(self) {
        jQuery("#vehicle_button").click(function () {
            jQuery('.vehicle_form_parent').addClass('vehicle_form_parent_dis');

            jQuery.ajax({
                type: 'get',
                url: vehicle_ajax.ajaxurl,
                data: self.date_vehicle,
                success: function (response) {
                    jQuery('.vehicle_form_parent').removeClass('vehicle_form_parent_dis');
                    var data = JSON.parse(response);
                    jQuery('.ecm strong').html(data[0].single_vehicle_credits);
                    jQuery('.tcm strong').html((data[0].unlimited_credits != null) ? data[0].unlimited_credits : 'N/A');
                    jQuery('.vehicle_result_parent').show();
                },
            });
        });
    },
    reset_select(selects) {
        selects.forEach(function (item, index) {
            jQuery('#' + item).empty();
            jQuery('#' + item).prop('disabled', true);
            jQuery('#' + item).trigger("liszt:updated");
            jQuery('#vehicle_button').prop('disabled', true);
        });
        jQuery('.vehicle_result_parent').hide();
    },
    select_options(self) {
        jQuery('.chzn-select').each(function (key, value) {
            self.ids_array.push(value.id);
            self.select_events(value.id, self)
        });
    },
    select_events(value, self) {
        jQuery('#' + value).change(function () {
            if (jQuery(this).val().length > 0) {
                let select_name = jQuery(this).attr('id');
                let select_value = jQuery(this).val();
                self.date_vehicle[select_name] = select_value;
                if (select_name !== 'engine') {
                    jQuery('.vehicle_form_parent').addClass('vehicle_form_parent_dis');
                    let key_array = self.ids_array.indexOf(value);
                    let id = '#' + self.ids_array[key_array + 1];
                    self.reset_select(self.ids_array.slice(key_array + 2));
                    var params = {
                        action: 'get_vehicle_by_' + self.ids_array[key_array + 1],
                        value: select_value,
                    }
                    jQuery.ajax({
                        type: 'get',
                        url: vehicle_ajax.ajaxurl,
                        data: params,

                        success: function (response) {
                            jQuery('.vehicle_form_parent').removeClass('vehicle_form_parent_dis');
                            var data = JSON.parse(response);
                            jQuery(id).empty();
                            if (!jQuery.isEmptyObject(data)) {

                                jQuery(id).append('<option value="">Choose ' + self.ids_array[key_array + 1] + '</option>');
                                for (key in data) {
                                    jQuery(id).append('<option value="' + data[key].id + '">' + data[key].name + '</option>')
                                }
                                jQuery(id).prop('disabled', false);
                                if (value == 'model') {
                                    jQuery('#vehicle_button').attr('disabled', false);
                                }
                            } else {
                                jQuery(id).prop('disabled', true);
                            }
                            jQuery(id).trigger("liszt:updated");
                        },

                    });
                }
            }
        });
    },
    init(self) {
        this.submit_form(self);
        this.select_options(self);
    },

    run() {
        this.init(this)
    }
}


vehicle.run();



