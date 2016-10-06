function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
    for (var i = 0; i < items.length; i++) {

        switch (items[i].name) {
            case 'Aged Brie':
                agedBrie(i)
                break;
            case 'Backstage passes to a TAFKAL80ETC concert':
                backStage(i)
                break;
            case 'Sulfuras, Hand of Ragnaros':
                break;
            case 'Conjured Mana Cake':
                conjured(i)
                break;
            default:
                standard(i)
        }
    }
}

function standard(i) {
    if (items[i].sell_in > 0 && items[i].quality > 0) items[i].quality -= 1
    if (items[i].sell_in <= 0 && items[i].quality > 0) items[i].quality -= 2
    items[i].sell_in -= 1
}

function agedBrie(i) {
    if (items[i].quality < 50) items[i].quality += 1
    items[i].sell_in -= 1
        //this is the strange line of code
    if (items[i].sell_in <= 0) items[i].quality += 1
}

function backStage(i) {
    if (items[i].quality < 50) items[i].quality += 1
    if (items[i].sell_in < 11 && items[i].quality < 50) items[i].quality += 1
    if (items[i].sell_in < 6 && items[i].quality < 50) items[i].quality += 1
    items[i].sell_in -= 1
    if (items[i].sell_in <= 0) items[i].quality = 0
}

function conjured(i) {
    if (items[i].sell_in > 0 && items[i].quality > 0) items[i].quality -= 2
    if (items[i].sell_in <= 0 && items[i].quality > 0) items[i].quality -= 4
    items[i].sell_in -= 1
    if (items[i].quality < 0) items[i].quality = 0
}
