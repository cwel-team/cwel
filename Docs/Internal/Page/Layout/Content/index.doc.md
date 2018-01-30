{% block body %}

<div class="heading">
    <div class="container container--docs">
        <div class="heading__content">
            <h2 class="heading__content-parent">Guides</h2>
            <h1 class="heading__content-title">{{ title }}</h1>
        </div>
        <ul class="heading__tabs">
            <li class="tabs-item">
                <a href="" class="tabs-item__link">UI Guideline</a>
            </li>
            <li class="tabs-item">
                <a href="" class="tabs-item__link">Usage</a>
            </li>
            <li class="tabs-item">
                <a href="" class="tabs-item__link">Downloads</a>
            </li>
        </ul>
    </div>
</div>

<div class="container container--docs">

    <p>{{ body }}</p>

</div>

{% endblock %}
