Блочная модель
--------------

*Строчные элементы* - это все то, что раскладывается друг за другом в строки и переносится на следующие строки, когда не хватает ширины.

*Блочные элементы* - они занимают по ширине все доступное им место и никуда не переносятся.

### Поток
![box flow](img/flow.jpg "box flow")

`float: left, right, none` - обтекание (выбиваем из потока)

![img float](img/float.img.png)
```html
<p>
    <img style="float: left;" src="..." alt="">
    ...
</p>
```

![box flow float](img/float.jpg "box flow float")

`clear: left, right, both` - отменить обтекание

![flow clear](img/clear.both.jpg "flow clear")

Еще один пример, как можно расположить блоки, относительно друг друга

![float flow](img/float.flow.jpg "float flow")

[Подробная статья про обтекания](http://softwaremaniacs.org/blog/2005/12/01/css-layout-float/)

### Видимость элемента

`visibility: hidden, visible`

![visibility: hidden](img/visibility.hidden.jpg "visibility: hidden")

`display: none`

![display: none](img/display.none.jpg "display: none")

`display: inline`

![display: inline](img/display.inline.jpg "display: inline")

---
[Содержание](../../README.md) |
[Задания](../tasks/README.md)
