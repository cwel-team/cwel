# Sandbox Pages

To experiment with new ideas in the CWEL code-base, outside the
constraints of our wonderful playground editor, sandbox pages can be made. To
do so, follow the steps below.

## Razor view
Create a new razor view with this path:
`~\Cwel.Docs.Web\Views\Playground\Sandbox\{name}\index.cshtml`, where `{name}`
is the name of the new sandbox page.

## Scripts
Any scripts should go into the following directory:
`~\Cwel.Docs.Web\Assets\es\sandbox\{name}`, where `{name}` is
the name of the new sandbox page. The filename, however, mustn't follow any
convention, as long as it ends in `.es`.

## Styles
Any scripts should go into the following directory:
`~\Cwel.Docs.Web\Assets\scss\sandbox\{name}`, where `{name}` is
the name of the new sandbox page. The filename, however, mustn't follow any
convention, as long as it ends in `.scss`.

## Include scripts and styles

To include scripts and files, add the necessary `script` and `link` tags to the
razor view as shown below:

```
@{
    Layout = "~/Views/Shared/_SandboxLayout.cshtml";
    ViewBag.Controller = "{name}";
}

@section styles
{
    <link href="~/Assets/css/sandbox/{name}/style.css" rel="stylesheet" />
}

@section scripts
{
    <script src="~/Assets/js/sandbox/{name}/script.js"></script>
}
```

where `{name}` is the name of the new sandbox page.
