## [Twitter Bootstrap](https://getbootstrap.com/docs/3.3/css/)

### 12-ти колоночная сетка
![12 column grid](img/grid.jpg "12 column grid")

### Сетка
| class        | размер | для экрана |
|      ---     |  ---   | --- |
| `.col-xs-xx` | 480px  | phone | 
| `.col-sm-xx` | 768px  | tablet |
| `.col-md-xx` | 1010px | desktop |
| `.col-lg-xx` | 1200px | large desktop |

![bootstrap grid](img/grid.01.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
  <div class="col-md-1">.col-md-1</div>
</div>
```
![bootstrap grid](img/grid.02.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
```

![bootstrap grid](img/grid.03.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4">.col-md-4</div>
</div>
```

![bootstrap grid](img/grid.04.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-6">.col-md-6</div>
  <div class="col-md-6">.col-md-6</div>
</div>
```

### Отступы

![bootstrap grid](img/grid.offset.01.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-4">.col-md-4</div>
  <div class="col-md-4 col-md-offset-4">.col-md-4 .col-md-offset-4</div>
</div>
```

![bootstrap grid](img/grid.offset.02.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
  <div class="col-md-3 col-md-offset-3">.col-md-3 .col-md-offset-3</div>
</div>
```

![bootstrap grid](img/grid.offset.03.jpg "bootstrap grid")
```html
<div class="row">
  <div class="col-md-6 col-md-offset-3">.col-md-6 .col-md-offset-3</div>
</div>
```

### Классы для работы с текстом
* Центрирование
    * `.text-left`
    * `.text-center`
    * `.text-right`
    * `.text-justify`

* Трансформация
    * `.text-lowercase`
    * `.text-uppercase`
    * `.text-capitalize`


* Цвет
    * `.text-muted` - серый 
    * `.text-primary` - основной цвет сайта
    * `.text-success` - зеленый
    * `.text-info` - синий
    * `.text-warning` - желтый
    * `.text-danger` - красный
    
* Цвет фона
    * `.bg-primary`
    * `.bg-success`
    * `.bg-info`
    * `.bg-warning`
    * `.bg-danger`
    
### Список

* `.list-inline` - в одну строчку
* `.list-unstyled` - не маркированный список
    
![не маркированный список](img/list.unstyled.jpg)    

```html
<ul class="list-unstyled">
    <li>Facilisis in pretium nisl aliquet</li>
    <li>
        Nulla volutpat aliquam velit
        <ul>
            <li>Phasellus iaculis neque</li>
            <li>Ac tristique libero volutpat at</li>
        </ul>
    </li>
</ul>
```

### Таблицы

![bootstrap table](img/table.jpg "bootstrap table")
```html
<table class="table">
    ...
</table>
```

![bootstrap table striped"](img/table.striped.jpg "bootstrap table striped")
```html
<table class="table table-striped">
    ...
</table>
```

![bootstrap table bordered](img/table.bordered.jpg "bootstrap table bordered")
```html
<table class="table table-bordered">
    ...
</table>
```

### Ссылки в виде кнопок

![bootstrap button](img/btn.jpg "bootstrap button")
```html
<a class="btn btn-default">Default</a>
<a class="btn btn-primary">Primary</a>
<a class="btn btn-success">Success</a>
<a class="btn btn-info">Info</a>
<a class="btn btn-warning">Warning</a>
<a class="btn btn-danger">Danger</a>
<a class="btn btn-link">Link</a>
```

### Изображения

`.img-responsive` - сделать изображение резиновым

![bootstrap images](img/img.jpg "bootstrap images")
```html
<img src="..." alt="..." class="img-rounded">
<img src="..." alt="..." class="img-circle">
<img src="..." alt="..." class="img-thumbnail">
```
### Лэйбочки

![bootstrap label](img/label.jpg "bootstrap label")
```html
<span class="label label-default">Default</span>
<span class="label label-primary">Primary</span>
<span class="label label-success">Success</span>
<span class="label label-info">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

## [FontAwesome](http://fontawesome.io/icons/)

![font awesome](img/fa.jpg "fontawesome")
```html
Пример <i class="fa fa-info"></i> использования 
```

![font awesome size](img/fa.size.jpg "font awesome size")
```html
<i class="fa fa-heart"></i> 
<i class="fa fa-heart fa-lg"></i> 
<i class="fa fa-heart fa-2x"></i> 
<i class="fa fa-heart fa-3x"></i> 
<i class="fa fa-heart fa-4x"></i> 
<i class="fa fa-heart fa-5x"></i> 
```

![font awesome size](img/fa.btn.jpg "font awesome btn")
```html
<a class="btn btn-default">
    <i class="fa fa-cog fa-lg"></i> Default
</a>

<a class="btn btn-primary">
    Primary <i class="fa fa-thumbs-o-up fa-lg"></i>
</a>

<a class="btn btn-success">
    Success <i class="fa fa-hand-peace-o fa-lg"></i>
</a>

<a class="btn btn-info">
    Info <i class="fa fa-hand-scissors-o fa-lg"></i>
</a>

<a class="btn btn-warning">
    Warning <i class="fa fa fa-hand-pointer-o fa-lg"></i>
</a>

<a class="btn btn-danger">
    Danger <i class="fa fa-thumbs-o-down fa-lg"></i>
</a>

<a class="btn btn-link">
    Link <i class="fa fa-hand-spock-o fa-lg"></i>
</a>
```

![font awesome size](img/fa.list.jpg "font awesome list")
```html
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-check text-primary"></i>as bullets</li>
  <li><i class="fa-li fa fa-check text-danger"></i>in lists</li>
  <li><i class="fa-li fa fa-check text-warning"></i>awesome</li>
</ul>
```

---
[Содержание](../../README.md)
|
[Задания](../tasks/README.md)