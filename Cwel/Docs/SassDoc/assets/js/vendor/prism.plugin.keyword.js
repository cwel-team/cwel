! function() {
    "undefined" != typeof self && !self.Prism || "undefined" != typeof global && !global.Prism || Prism.hooks.add("wrap", function(e) {
        console.log("keyword", e.content);
        "keyword" === e.type && e.classes.push("keyword-" + e.content)
    })
}();
