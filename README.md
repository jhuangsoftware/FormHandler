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
```
