dialogs.js
==========

A drop-in replacement for JavaScript alert, console, input functions

Install
-------
Just include the JavaScript file `dialogs.js` in your [Bootsrap](http://twitter.github.com/bootstrap/index.html) powered webpage.

```HTML
<script src="jquery-1.8.3.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="vendors/dialogs.js"></script>
```

APIs
-----
`dialogs.alert([message] [, callback])`

`dialogs.confirm([message] [, callback(true|false)])`

`dialogs.prompt([message] [, value] [, callback(value|null)])`