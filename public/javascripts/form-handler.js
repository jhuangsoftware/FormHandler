$(document).ready(function () {

});

function FormHandler() {
    this.formHandlerCssClass = '.form-handler';
    this.actions = [
        {
            'name': 'email',
            'url': '//localhost:3000/send/email'
        },
        {
            'name': 'database',
            'url': '//localhost:3000/send/database'
        }
    ];

    this.getLabel = function ($element) {
        var label = $element.prop('name');

        if (label) {
            label = $element.prop('data-label');
        }

        if (label) {
            $element.parent('label').each(function () {
                label = $(this).text();
            });
        }

        return label;
    };

    this.getData = function ($element) {
        var data = '';
        var elementType = $element.prop('nodeName');

        switch (elementType) {
            case 'input':
                if ($element.is(':checbox, :radio')) {
                    data = ($element.is(':checked') == true ? 'true' : 'no');
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
}

FormHandler.prototype.init = function (formHandlerCssClass) {

};

FormHandler.prototype.formToJson = function ($form) {
    var ThisClass = this;
    var formJson = {
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

FormHandler.prototype.action = function (action, jsonData, callbackFunc) {
    $.each(this.actions, function () {
        if (this.name === action) {
            $.ajax({
                type: 'POST',
                url: this.url,
                data: jsonData,
                success: callbackFunc,
                dataType: 'json'
            });
        }
    });
};