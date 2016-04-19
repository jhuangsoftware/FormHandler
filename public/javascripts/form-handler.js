function FormHandler($form, $jsonConfig) {
    var ThisClass = this;
    this.$form = $form;
    this.submitCssClass = '.submit';
    this.$jsonConfig = $jsonConfig;

    this.actions = [
        {
            'name': 'email',
            'url': '//localhost:3000/formhandler/send/email'
        },
        {
            'name': 'database',
            'url': '//localhost:3000/formhandler/send/database'
        }
    ];

    this.getCurrentUrl = function () {
        return window.location.href;
    }

    this.getEmail = function () {
        var email = '';

        if(this.$jsonConfig) {
            if (this.$jsonConfig.hasOwnProperty('email')) {
                email = this.$jsonConfig.email;
            }
        }

        return email;
    }

    this.getAction = function () {
        var action = '';

        if(this.$jsonConfig) {
            if (this.$jsonConfig.hasOwnProperty('action')) {
                action = this.$jsonConfig.action;
            }
        }

        return action;
    }

    this.getLabel = function ($element) {
        var label = $element.prop('name');
        var labelData = $element.attr('data-label');
        var labelParent = $element.parent('label').text();

        if (labelData) {
            label = labelData;
        }

        if (labelParent) {
            label = labelParent;
        }

        // nice the label text
        if (label) {
            label = label.replace(/\r?\n|\r/g, '');
            label = $.trim(label);
        }

        return label;
    };

    this.getData = function ($element) {
        var data = '';
        var elementType = $element.prop('nodeName');

        switch (elementType.toLowerCase()) {
            case 'input':
                if ($element.is(':checkbox, :radio')) {
                    data = ($element.is(':checked') == true ? 'true' : 'false');
                } else {
                    data = $element.val();
                }

                break;
            case 'select':
                data = $element.find(':selected').text();

                break;
            case 'textarea':
                data = $element.val();

                break;
        }

        return data;
    };

    this.action = function (action, jsonData, successCallbackFunc, errorCallbackFunc) {
        $.each(this.actions, function () {
            if (this.name === action) {
                $.ajax({
                    type: 'POST',
                    url: this.url,
                    data: jsonData,
                    success: successCallbackFunc,
                    error: errorCallbackFunc,
                    dataType: 'json'
                });
            }
        });
    };

    $(this.$form).on('click', this.submitCssClass, function () {
        var action = ThisClass.getAction();
        var formJsonData = ThisClass.formToJson($form);

        ThisClass.action(
            action,
            {'data': JSON.stringify(formJsonData)},
            function (data) {
                if ($jsonConfig.hasOwnProperty('success')) {
                    $jsonConfig.success(data);
                }
            },
            function () {
                if ($jsonConfig.hasOwnProperty('error')) {
                    $jsonConfig.error();
                }
            }
        )
    });
}

FormHandler.prototype.formToJson = function ($form) {
    var ThisClass = this;
    var formJson = {
        'url': this.getCurrentUrl(),
        'email': this.getEmail(),
        'form': []
    };

    $form.find('input, textarea, select').each(function () {
        var elementObject = {
            'name': ThisClass.getLabel($(this)),
            'data': ThisClass.getData($(this))
        };

        formJson.form.push(elementObject);
    });

    return formJson;
};

$.fn.extend({
    formHandler: function ($jsonConfig) {
        var FormHandlerObject = new FormHandler($(this), $jsonConfig);
    }
});

$(document).ready(function () {
    $('.form-handler').each(function () {
        $(this).formHandler({
            'email': 'Zm9ybWhhbmRsZXIuZGVtb0BnbWFpbC5jb20=',
            'action': 'email',
            'success': function (data) {
                console.log(data);
            },
            'error': function () {
                console.log('error');
            }
        });
    });
});