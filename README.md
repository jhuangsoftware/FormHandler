# FormHandler
A client side JavaScript utility class, combined with a node.js server side handler, to process and store form data in emails or databases.

# Getting Started

## Include Client Side JavaScript
```sh
<script src="javascripts/form-handler.js"></script>
```

## Assign .submit to action button in &lt;Form&gt;
```sh
<form class="form-horizontal form-handler">
  ...
  <div class="btn btn-primary submit">Submit</div>
  ...
</form>
```

## Initialize &lt;Form&gt; using .formHandler()
```sh
$('.form-handler').each(function () {
    $(this).formHandler({
        'action': 'email',
        'email': 'Zm9ybWhhbmRsZXIuZGVtb0BnbWFpbC5jb20=',
        'success': function (data) {
            console.log(data);
        },
        'error': function () {
            console.log('error');
        }
    });
});
```

## JSON Configuration

### action
- **email** configures the form data to be sent via email user defined email
- **database** configures the form data to saved to a backend database

### email
Populate this field when **email** action is configured.
Use https://www.base64encode.org/ to encode email address to avoid spam crawler.

### success
A user defined function to process server response in event of successful form submission.

### error
A user defined function to process server response in event of failed form submission.
