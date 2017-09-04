### Блочная модель
![box model](img/box.model.jpg "box model")

|         |            |     |
|   ---   |    ---     | --- |
| content | содержимое | здесь располагается содержимое бокса: текст и другие вложенные в него боксы|
| padding | отступы    | отступ от невидимых границ содержимого до рамки, на него, кстати, распространяется фон бокса, если он есть|
| border  | рамка      | рамка вокруг содержимого, которая, помимо декоративного эффекта, тоже влияет на размер всего бокса из-за своей толщины |
| margin  | границы    | отступы от рамки до других, внешних боксов|

width = content + (padding-left + padding-right) + (border-left + border-right) + (margin-left + margin-right)

### Поток
![box flow](img/flow.jpg "box flow")

`float: left, right, none` - обтекание (выбиваем из потока)

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
[Содержание](../../README.md)
|
[Задания](../tasks/README.md)
