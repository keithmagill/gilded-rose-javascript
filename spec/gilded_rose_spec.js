describe("Gilded Rose", function() {

    it("If we add an item the item name, sell in and quality should be returned", function() {
        var gildedRose = new Item('Test Item', 1, 2)
        expect(gildedRose.name).toEqual('Test Item')
        expect(gildedRose.sell_in).toEqual(1)
        expect(gildedRose.quality).toEqual(2)
    });

    describe("Adding a test item to the array", () => {
        items = []
        items.push(new Item('Test Item', 1, 10))
        it("Add a standard item and expect array length to increase by one", () => {
            expect(items.length).toEqual(1)
        })
        it("Expect standard item quality to decrease by 1", () => {
            update_quality()
            expect(items[0].quality).toEqual(9)
            expect(items[0].sell_in).toEqual(0)
        })
        it("Expect standard item sell_in value to decrease by 1", () => {
            update_quality()
            expect(items[0].sell_in).toEqual(-1)
        })
        it("Expect standard item qualiy to be decreased by two as sell_in days is less than zero", () => {
            update_quality()
            expect(items[0].quality).toEqual(5)
        })
        it("Ensure quality does not go below 0 for a standard item", () => {
            items = []
            items.push(new Item('Standard Item', 5, 0))
            update_quality()
            expect(items[0].quality).toEqual(0)
        })
    })
    describe("Test more complex rules - Aged Brie", () => {
        it("Aged Brie increases in quality as sell_in decreases", () => {
            items = []
            items.push(new Item('Aged Brie', 2, 0))
            update_quality()
            expect(items[0].sell_in).toEqual(1)
            expect(items[0].quality).toEqual(1)
        })
        it("Aged Brie quality should not increase above 50", () => {
            items = []
            items.push(new Item("Aged Brie", 2, 50))
            update_quality()
            expect(items[0].quality).not.toEqual(51)
        })
        it('When Aged brie is less than 0 days quality will increase by 2', () => {
            items = []
            items.push(new Item("Aged Brie", 0, 10))
            update_quality()
            expect(items[0].quality).toEqual(11)
        })
    })
    describe("Test more complex rules - Sulfuras", () => {
        it("Test no change in sell in days or quality of Sulfuras", () => {
            items = []
            items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80))
            expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros")
            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(80)
        })
    })
    describe("Test more complex rules - Backstage Pass", () => {
        it("When sell in days is 10 or less but above 5 quality shold increase by 2", () => {
            items = []
            items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10))
            update_quality()
            expect(items[0].sell_in).toEqual(5)
            expect(items[0].quality).toEqual(12)
        })
        it("When sell in days is 5 or less and above 0 quality should increase by 3", () => {
            update_quality()
            expect(items[0].sell_in).toEqual(4)
            expect(items[0].quality).toEqual(15)
        })
        it("When sell in days is greater than 10 then qaulity should increase by 1", () => {
            items = []
            items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 25, 49))
            update_quality()
            expect(items[0].sell_in).toEqual(24)
            expect(items[0].quality).toEqual(50)
        })
        it("Test that quality does not increase above 50", () => {
            update_quality()
            expect(items[0].sell_in).toEqual(23)
            expect(items[0].quality).toEqual(50)
        })
        it("When sell in days is 0 or below then quality should be set to 0", () => {
            items = []
            items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30))
            update_quality()
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        })

    })
    describe("Multipe array items", () => {
        it('Tests that sell_in days and quality is updated if multiple items are provided', () => {
            items = []
            items.push(new Item('Test Item', 1, 10))
            items.push(new Item("Aged Brie", 2, 30))
            update_quality()
            expect(items[0].sell_in).toEqual(0)
            expect(items[0].quality).toEqual(9)
            expect(items[1].sell_in).toEqual(1)
            expect(items[1].quality).toEqual(31)
        })
        it('Tests that item 0 will not go below quality of 0, item 1 Brie will not go above 50 quality', () => {
            items = []
            items.push(new Item('Test Item', 5, 0))
            items.push(new Item('Aged Brie', 6, 50))
            update_quality()
            expect(items[0].sell_in).toEqual(4)
            expect(items[0].quality).toEqual(0)
            expect(items[1].sell_in).toEqual(5)
            expect(items[1].quality).toEqual(50)

        })
    })
    describe("Test more complex rules - Conjured ", () => {
        it('At the end of each day the quality of Conjured decreases by 2', () => {
            items = []
            items.push(new Item("Conjured Mana Cake", 10, 20))
            update_quality()
            expect(items[0].name).toEqual("Conjured Mana Cake")
            expect(items[0].sell_in).toEqual(9)
            expect(items[0].quality).toEqual(18)
        })
        it('For Conjured quality will not decrese below 0', () => {
            items = []
            items.push(new Item("Conjured Mana Cake", 10, 1))
            update_quality()
            expect(items[0].name).toEqual("Conjured Mana Cake")
            expect(items[0].sell_in).toEqual(9)
            expect(items[0].quality).toEqual(0)
        })
        it('When sell in days is less than 0 then quality of Conjured should decrease by 4', () => {
            items = []
            items.push(new Item("Conjured Mana Cake", -1, 15))
            update_quality()
            expect(items[0].name).toEqual("Conjured Mana Cake")
            expect(items[0].sell_in).toEqual(-2)
            expect(items[0].quality).toEqual(11)
        })
        it("When sell in days is less than 0 then quality will be set to 0", () => {
            items = []
            items.push(new Item("Conjured Mana Cake", 0, 3))
            update_quality()
            expect(items[0].name).toEqual("Conjured Mana Cake")
            expect(items[0].sell_in).toEqual(-1)
            expect(items[0].quality).toEqual(0)
        })

    })
});
