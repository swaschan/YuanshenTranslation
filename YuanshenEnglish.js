// ==UserScript==
// @name         Yuanshen English!
// @namespace    http://tampermonkey.net/
// @version      0.01
// @description  A conversion of the amazing yuanshen wiki for Genshin Impact into English.
// @author       swaschan
// @match        https://yuanshen.site/index.html
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant      GM_addStyle
// ==/UserScript==


$(function() {

    //CSS Styling
    function initCSS() {
        const ele = document.createElement('style');
        ele.type = 'text/css';
        ele.innerHTML = `
    * {
      @import url(https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap);li.con-type-label{font-size:1rem;font-family:'Open Sans';text-transform:capitalize}.options-list .map-opts{font-family:'Open Sans';font-size:1.1rem;text-transform:capitalize}p.selector-hint{font-family:'Open Sans';font-size:20px}p.opt-selector{font-family:'Open Sans'}p.opt-selector font{font-family:'Open Sans';font-size:1rem}span.area-text font{font-family:'Open Sans';font-size:1.1rem;font-weight:700}.myPopName{font-family:'Open Sans';font-size:1.21rem;text-transform:uppercase}.myPopComment{font-family:'Open Sans';font-weight:500}.myPopSwitchTodo p{font-family:'Open Sans';letter-spacing:inherit;text-transform:uppercase;font-size:.95rem}.myPopSwitchDone p{font-family:'Open Sans';letter-spacing:inherit;text-transform:uppercase;font-size:.95rem}.person-div font{font-family:'Open Sans';font-size:1.2rem}
    }
  `;
        document.head.appendChild(ele);
    }

    var labelmenu = {
        '特性': 'Collectibles',
        '特产': 'Specialties',
        '矿物': 'Ores',
        '怪物': 'Enemies',
        '食材': 'Food',
        '炼金': 'Alchemy',
        '尚未选择收集要素': 'No items selected.',
        '蒙德': 'Mond',
        '璃月': 'Liyue',
    };
    var bottomlabels = {
        // Mondstadt Collectibles
        '风神瞳': 'Anemoculi',
        '地灵龛-蒙德': 'Shrines of Depths',
        '宝箱-蒙德': 'Treasure Chests',
        // Liyue Collectibles
        '岩神瞳': 'Geoculi',
        '地灵龛-璃月': 'Shrines of Depths',
        '宝箱-璃月': 'Treasure Chests',
        // Mondstadt Specialties
        '钩钩果': 'Wolfhook',
        '嘟嘟莲': 'Calla Lily',
        '落落梅': 'Valberry',
        '塞西莉亚花': 'Cecilia',
        '慕风蘑菇': 'Philanemo Mushroom',
        '风车菊': 'Windwheel Aster',
        '蒲公英籽': 'Dandelion Seeds',
        '小灯草': 'Small Lamp Grass',
        //Liyue Specialties
        '琉璃百合': 'Glaze Lily',
        '夜泊石': 'Noctilucous Jade',
        '石珀': 'Cor Lapis',
        '琉璃袋': 'Violet Grass',
        '清心': 'Qingxin',
        '马尾': 'Horsetail',
        '莲蓬': 'Lotus Seed Heads',
        '星螺': 'Starconch',
        //Mondstadt ores
        '水晶矿-蒙德': 'Crystal Chunks',
        '白铁矿-蒙德': 'White Iron Ore',
        //Liyue ores
        '水晶矿-璃月': 'Crystal Chunks',
        '白铁矿-璃月': 'White Iron Ore',
        //Mondstadt enemies
        '深渊法师-蒙德': 'Abyss Mage',
        '雷莹术士-蒙德': 'Fatui Electro Cicin Mage',
        '先遣队-蒙德': 'Fatui Skirmisher',
        '骗骗花-蒙德': 'Cryo Whopperflower',
        '遗迹守卫-蒙德': 'Ruin Guard',
        '大型丘丘人-蒙德': 'Wooden Shield Mitachurl',
        //Liyue enemies
        '深渊法师-璃月': 'Abyss Mage',
        '雷莹术士-璃月': 'Fatui Electro Cicin Mage',
        '债务处理人-璃月': 'Fatui Pyro Agent',
        '先遣队-璃月': 'Fatui Skirmisher',
        '骗骗花-璃月': 'Cryo Whopperflower',
        '幼岩龙蜥-璃月': 'Geovishap Hatchling',
        '遗迹守卫-璃月': 'Ruin Guard',
        '遗迹猎者-璃月': 'Ruin Hunter',
        '盗宝团-璃月': 'Treasure Troop',
        '大型丘丘人-璃月': 'Rock Shieldwall Mitachurl',
        '史莱姆-璃月': 'Anemo Slime',
        //Mondstadt food
        '螃蟹-蒙德': 'Crab Meat',
        '松茸-蒙德': 'Matsutake Mushrooms',
        '兽肉-蒙德': 'Raw Meat',
        '禽肉-蒙德': 'Raw Fowl',
        //Liyue food
        '螃蟹-璃月': 'Crab Meat',
        '松茸-璃月': 'Matsutake Mushrooms',
        '兽肉-璃月': 'Raw Meat',
        '禽肉-璃月': 'Raw Fowl',
        '鱼肉-璃月': 'Raw Fish',
        //Mondstadt alchemy
        '冰雾花花朵-蒙德': 'Mist Flower Corolla',
        '烈焰花花蕊-蒙德': 'Flaming Flower Stamen',
        '电气水晶-蒙德': 'Electric Crystal',
        //Liyue alchemy
        '冰雾花花朵-璃月': 'Mist Flower Corolla',
        '烈焰花花蕊-璃月': 'Flaming Flower Stamen',
        '电气水晶-璃月': 'Electric Crystal',
    };

    //Before stringReplacement, encapsulate all text elements 

    stringReplacement($('.con-type-label'), labelmenu);
    stringReplacement($('.selector-hint'), labelmenu);
    stringReplacement($('.area-text'), labelmenu);
    stringReplacement($('.map-opts'), bottomlabels);


    function stringReplacement(targetElement, labelArray) {
        targetElement.each(function() {
            // console.log($(this).text().trim());
            var labelcontent = $(this);
            //Check if the translation refers to the map options, in which case duplicate the image to prevent overwriting with .text()
            if (labelcontent.is(".map-opts")) {
                var $imgborder = $(this).find('div');
                stringComparison(labelcontent, labelArray);
                $(this).prepend($imgborder);
            } else {
                stringComparison(labelcontent, labelArray);
            }
        });
    }

    function stringComparison(StringObject, arr) {
        var StringContent = StringObject.text().trim();
        Object.keys(arr).forEach(function(arrayKey) {
            if (StringContent === arrayKey) {
                // setTextContents(StringObject,arr[StringContent]);

                StringObject.text(arr[StringContent]);
            }
        })
    }

    function setTextContents($elem, text) {
        $elem.contents().filter(function() {
            if (this.nodeType == Node.TEXT_NODE) {
                this.nodeValue = text;
            }
        });
    }

});