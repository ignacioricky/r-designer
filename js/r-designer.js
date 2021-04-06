$(document).ready(function() {
    (function() {
        window.rdesign = {
            activeCLs: "r-active",
            menuData: [],
            typeData: [],
            fabricData: [],
            menuTitle: "MENU",
            menuSubtitle: "Subtitle",
            menuId: "-r-nav-list-suit",
            hasMenu: !0,
            hasLogo: !1,
            priceSymbol: "$",
            price: 350,
            title: "Men's Suit",
            subTitle: "1 Suit, 1 Pant",
            backView: "",
            data: {},
            activePreview: "suit",
            containerWidth: 900,
            submitBtn: !0,
            submitBtnTxt: "Proceed",
            useEmbroidery: !0,
            init: function(a) {
                this.targetId = a;
                this.initContainer();
                return this
            },
            initMenuEvent: function() {
                var a = this;
                a.initClickEvent("#" +
                    this.menuId + " li",
                    function(b) {
                        var c = this.typeData,
                            d = a.getMenuActive();
                        d && d.removeClass(a.activeCLs);
                        $(b).addClass(a.activeCLs);
                        for (var e in c)
                            if (d = c[e], d.name == this.selectedCategories) {
                                for (var f in d.data) {
                                    if ("embroidery" == b.attr("name")) {
                                        this.reloadData();
                                        this.buildType(this.constructEmbroidery(b.attr("name")), b.attr("name"));
                                        break
                                    }
                                    if (d.data[f].name == b.attr("name")) {
                                        this.reloadData();
                                        this.buildType(this.constructType(d.data[f].data, b.attr("name"), d.name, d.data[f].name), b.attr("name"));
                                        break
                                    }
                                }
                                break
                            }
                    })
            },
            initClickEvent: function(a, b) {
                var c = this;
                $(a).each(function(d, e) {
                    $(e).click(function() {
                        c.onMenuClick(c, e, a, b)
                    })
                })
            },
            initContainer: function() {
                var a = $("#" + this.targetId);
                a.addClass("r-tailor-wrapper");
                a.css("width", this.containerWidth);
                a.append('<div class="r-tailor-container"></div>');
                a = $(".r-tailor-container");
                this.hasLogo && initLogo(a);
                this.initMenu(a).initPreview(a).initSelection(a).initSubmitBtn($("#" + this.targetId))
            },
            initLogo: function(a) {
                a.append('<div class="r-logo"> </div>')
            },
            initMenu: function(a) {
                var b =
                    this.constructList(this.menuData);
                a.append('<div class="r-nav" id="-r-nav"><div class="r-title">' + this.menuTitle + "</div>" + ("" !== this.menuSubtitle ? '<div class="r-subtitle">' + this.menuSubtitle + "</div>" : "") + b + " </div>");
                return this
            },
            addMenuData: function(a) {
                this.menuData = a;
                return this
            },
            constructList: function(a) {
                var b = '<ul class="r-nav-list" id="' + this.menuId + '">',
                    c;
                for (c in a)
                    if (a[c].name == this.selectedCategories) {
                        $("#-r-nav .r-subtitle").html(a[c].text);
                        this.menuSubtitle = a[c].text;
                        $("#-r-preview .r-item > img").attr("src",
                            a[c].img);
                        a = a[c].data;
                        for (var d in a) b += '<li name="' + a[d].name + '" class="' + (a[d].active ? this.activeCLs : "") + '"> ' + (a[d].img ? '<img class="thumbnail" scr="' + a[d].img + '">' : "") + '<span class="type-text">' + a[d].text + "<span></li>";
                        break
                    }
                return b + "</ul>"
            },
            reloadMenu: function() {
                $("#" + this.menuId).remove();
                $("#-r-nav").append(this.constructList(this.menuData));
                this.initMenuEvent()
            },
            initPreview: function(a) {
                var b = this,
                    c = b.constructCategories(b.typeData);

                a.append('<div class="r-preview" id="-r-preview"><div class="r-header"><h2 class="r-title">' +
                    b.title + '</h2><h5 class="r-subtitle">' + b.subTitle + '</h5><div class="r-price">(' + b.priceSymbol + b.price + ')</div><div class="r-view"> <a href="#" id="-r-back-view">' 
                    + (b.backView ? "Back View" : "Back View") + ' </a></div></div><div class="r-item"><img class="preview" id="-r-showcase-view" src="assets/img/suit_front.png"></div><div class="r-categories" id="-r-categories-list"><ul class="r-nav-categories">' + c + "</ul></div> </div>");
               
                b.initClickEvent("#-r-categories-list > ul > li", function(a) {
                    b.buildImgEvent("#-r-categories-list > ul > li", a);
                    b.selectedCategories =
                        a.attr("name");
                    b.reloadMenu()
                });

                b.initClickEvent("#-r-back-view", function(a) {
                	var path = 'assets/img/';
                	if(b.getCurrentView() == 'Suit'){
                		var view = $('#-r-showcase-view');
                		var curview = view.attr('src');

                		var isFront = (path + "suit_front.png") == curview;

                		$('#-r-back-view').html(!isFront ? 'Back View' : 'Front View');
                		view.attr('src', path + (isFront ? "suit_back.png" : "suit_front.png"));
                	}

                	if (b.getCurrentView() == 'Pant'){
                		var view = $('#-r-showcase-view');
                		var curview = view.attr('src');

                		var isFront = (path + "pant_front.png") == curview;

                		$('#-r-back-view').html(!isFront ? 'Back View' : 'Front View');
                		view.attr('src', path + (isFront ? "pant_back.png" : "pant_front.png"));
                	}
                    
                });

                b.reloadMenu();
                return this
            },
            constructCategories: function(a) {
                var b = "",
                    c;
                for (c in a) a[c].checked && (this.selectedCategories = a[c].name), b += '<li name="' + a[c].name + '">' + (a[c].checked ? '<img class="checked" src="assets/checked.png">' : "") + '<img class="thumbnail" src="' + a[c].img + '"></li>';
                return b
            },
            initSelection: function(a) {
                var b = this,
                    c = b.constructFabric(b.fabricData);
                a.append('<div class="r-selection" id="-r-selection"></div>');
                $("#-r-selection").append(c);
                b.initClickEvent("#-r-select-fabric > ul > li",
                    function(a) {
                        b.buildImgEvent("#-r-select-fabric > ul > li", a);
                        b.data.fabric = {
                            value: b.getFabricValue(a.attr("name"))
                        }
                    });
                return b
            },
            initSubmitBtn: function(a) {
                var b = this;
                a.append('<div class="r-footer"><button class="r-button" id="-r-button"><span>' + this.submitBtnTxt + "</span></button></div>");
                b.submitBtn = $("#-r-button");
                a.append('<form action="submission.php" id="-r-button-form" method="post">');
                var c = $("#-r-button-form");
                c.append('<input type="hidden" name="data">');
                b.submitBtn.click(function() {
                    $("#-r-button-form > input").val(JSON.stringify(b.getData()));
                    c.submit()
                })
            },
            buildImgEvent: function(a, b) {
                var c = this.getTypeActive(a),
                    d = c.parent(),
                    e = $(c.find("img")[0]);
                "checked" == $(c.find("img")[0]).attr("class") && e.remove();
                b.prepend('<img class="checked" src="assets/checked.png">');
                d.prevList = b
            },
            prevMenu: "",
            buildType: function(a, b) {
                var c = this,
                    d = $("#-r-selection");
                if (void 0 != b) {
                    var e = $("#-r-" + c.prevMenu);
                    e && e.remove()
                }
                d.append(a);
                c.prevMenu = b;
                "embroidery" == b ? (d = $("#-r-" + b + " :input"), d.each(function(a, b) {
                    $(b).change(function() {
                        var a = $(this);
                        "checkbox" == a.attr("type") ?
                            c.data.suit.embroidery[a.attr("name")] = 1 == a.attr("checked") : c.data.suit.embroidery[a.attr("name")] = a.val();
                        c.reloadData()
                    })
                }), d.each(function() {
                    var a = $(this),
                        b = c.data.suit.embroidery[a.attr("name")];
                    "checkbox" == a.attr("type") ? a.attr("checked", b) : a.attr("value", b)
                })) : c.initClickEvent("#-r-" + c.prevMenu + " > div > ul > li", function(a) {
                    c.buildImgEvent("#-r-" + c.prevMenu + " > div > ul > li", a);
                    a = a.attr("data-value").split(";");
                    3 == a.length && (c.data[a[0]][a[1]] = {
                        value: a[2]
                    })
                })
            },
            constructFabric: function(a) {
                var b =
                    '<div class="r-select-type" ><div class="r-title">Select Fabric:</div><div class="r-select-type fabric overflow-x" id="-r-select-fabric"><ul>';
                for (var c in a) b += '<li title="' + a[c].text + '" name="' + a[c].name + '">  ' + (a[c].checked ? '<img class="checked" src="assets/checked.png">' : "") + " " + (a[c].img ? '<img class="thumbnail" src="' + a[c].img + '">' : "") + "</li>";
                return b + "</ul></div></div>"
            },
            constructType: function(a, b, c, d) {
                b = '<div class="r-select-type type" id="-r-' + b + '"><div class="r-title">Select Type:</div><div class="r-select-type overflow"><ul>';
                for (var e in a) b += '<li data-value="' + c + ";" + d + ";" + a[e].value + '"">  ' + (a[e].checked ? '<img class="checked" src="assets/checked.png">' : "") + " " + (a[e].img ? '<img class="thumbnail" src="' + a[e].img + '">' : "") + '<div class="type-text">' + a[e].text + "</span></div></li>";
                return b + "</ul></div></div>"
            },
            constructEmbroidery: function(a) {
                a = '<div class="r-select-type" id="-r-' + a + '"><div class="r-title">Select Type:</div><div class="r-embroidery">';
                a += '<img class="r-embroidery-img" src="pic/embroid.png">';
                a += "<br/>";
                a += '<label class="r-container">Use Embroidery<input class="r-custom-check" type="checkbox" name="use_embroidery"><span class="checkmark"></span></label>';
                a += "<br/>";
                a += '<label class="r-container"><input type="text" class="r-custom-text" name="embroidery_text" placeholder="Embroidery Text"></label>';
                return a + "</div></div>"
            },
            addFabricData: function(a) {
                this.fabricData = a;
                for (var b in a)
                    if (a[b].checked) {
                        this.data.fabric = {
                            value: a[b].value
                        };
                        break
                    }
            },
            getFabricValue: function(a) {
                var b = this.fabricData,
                    c;
                for (c in b)
                    if (b[c].name == a) return b[c].value
            },
            addType: function(a) {
                this.typeData = a;
                for (var b in a) {
                    var c = a[b].data;
                    this.data[a[b].name] = {};
                    for (var d in c) {
                        var e =
                            c[d].data;
                        this.data[a[b].name][c[d].name] = {};
                        for (var f in e) e[f].checked && (this.data[a[b].name][c[d].name] = {
                            value: e[f].value
                        })
                    }
                }
                this.data.suit.embroidery = {
                    use_embroidery: !1,
                    value: ""
                }
            },
            reloadData: function() {
                var a = this.data;
                if (this.typeData)
                    for (var b in this.typeData) {
                        var c = this.typeData[b].data,
                            d = a[this.typeData[b].name],
                            e;
                        for (e in c) {
                            var f = c[e].data,
                                h = d[c[e].name],
                                g;
                            for (g in f) 1 == f[g].checked && (f[g].checked = !1), f[g].value == h.value && (f[g].checked = !0)
                        }
                    }
            },
            getData: function() {
                this.data.price = this.price;
                return this.data
            },
            getAllList: function(a) {
                var b = [];
                ("string" == typeof a ? $(a) : a).each(function(a, d) {
                    b.push(d)
                });
                return b
            },
            getMenuActive: function() {
                var a = this.getAllList("#" + this.menuId + " li"),
                    b;
                for (b in a) {
                    var c = $(a[b]);
                    if (c.hasClass(this.activeCLs)) return c
                }
            },
            getTypeActive: function(a) {
                a = this.getAllList(a);
                for (var b in a) {
                    var c = $(a[b]);
                    if ($(c.find("img")[0]).hasClass("checked")) return c
                }
            },
            onMenuClick: function(a, b, c, d) {
                d && d.call(a, $(b))
            },
            getCurrentView:function(){
            	return this.menuSubtitle;
            }
        }
    })()
});